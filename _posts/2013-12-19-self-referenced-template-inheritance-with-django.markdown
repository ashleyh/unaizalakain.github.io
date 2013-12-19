---
layout: post
title: About self-referenced template inheritance with Django
---

This article is an attempt to summarize the motivations behind the support of
self-referenced template inheritance in Django and an effort to try to clarify
the possible ways of achieving it. It is ultimately an exercise for myself, so
that I can order and make sense of all the ideas and problems I found through
these last weeks of trying to work on this feature.

Motivation
----------

The motivation behind SRTI is simple: we want the users to be able to overwrite
certain blocks of other templates without the need of copy-pasting the original
template all over again. This would also make software updates smoother.

The most likely candidate templates to be overridden are Django's builtin admin
(this would make its ad-hoc overriding system useless) and third-party apps which
come with default templates. Both could be overridden from a template residing
in one of the ``TEMPLATE_DIRS`` or from within another application.

Resources
---------

- [Django ticket](https://code.djangoproject.com/ticket/15053)
- [Mailing-list discussion](https://groups.google.com/forum/#!topic/django-developers/0kFgCCMXnpY)

To the point
============

Goals
-----

- Allow SRTI inside loaders.
- Allow SRTI across loaders.
- Get a consistent way of handling and describing SRTI.
- Avoid recursion.

Description
-----------

When wanting to render a template in Django, we must pass its name to the
render function. Django then decides what template to render. One way or
another, all the functions that get a path and return a template rely on
``django.template.loader.find_template``. Exactly the same happens when a
template is extended from within another template.

This ``find_template`` function is responsible for iterating over the
configured loaders, asking for a particular template. It returns the first template
it comes across, or raises a ``TemplateNotFound`` exception if there are none.

Each of those default loaders (leaving the cache loader aside for the moment)
has a list of places to look for a particular template. In the case of the
app loader, those places will be the different apps specified in
``INSTALLED_APPS`` and, in the case of the filesystem loader, those places will
be the system directories specified in the ``TEMPLATE_DIRS`` setting.

So we have a function with a list of loaders which, in turn, have a list of
places to look for a particular template. I will try to put in a slightly
more mathematical notation:

    # Let n be the name of the template to display
    # Let f be the find_template function and λ the TEMPLATE_LOADERS
    f(n) = ⟨ l(n) | l ∈ λ ⟩(0)

    # Let Γ be the particular sequence of places for the loader to look for
    ∀ l ∈ λ ∃ l(n) = ⟨ g(n) | g ∈ Γ ⟩(0)

Now, for what we want to achieve: suppose each of the following loaders has
some templates with the same name:

    λ = ⟨ α, β ⟩
    α = ⟨ A, B, C ⟩
    β = ⟨ D, E ⟩

Currently, the A template would always be the returned one. Our desired goal is
to return templates consecutively: in this case, A → B → C → D → E.

Problems and solutions
----------------------

We need a way of knowing what templates have been returned until now so that we
know what template to return next. That could be done by:

- Passing on all the templates rendered until now.

- Passing on the current template that makes the extension.

When extending a template, the call to ``find_template`` is made by the
extension tag itself. This extension tag has no means of knowing which templates
have been rendered until now so we can't. The only possible way around this is
to store the already rendered templates in some kind of global variable and
that doesn't seem a good idea.

So we are left with the second option. We could pass on the origin template to
``find_template``. That would mean passing on, among other things, the
originating template ``display_name`` and ``loader``. The ``display_name``
would be the actual unique string that identifies a template. In the case of
the default app and filesystem loaders, that would be the template path. A
better name would be probably a good idea.

Lets step back a bit and imagine our two loaders:

    α = ⟨ A, B, C ⟩
    β = ⟨ D, E ⟩

If we pass *A* on, we know we want to get *B* back, if we pass *B*, *C*, and so
on. Lets make an algorithm out of it:

    # We get the current template as input
    skip all the templates until we get to the current template
    skip that one too
    return the next one

What would happen if we pass *C* on? All of the templates would be skipped in
the attempt of finding *C* so we would jump to the next loader:

    # We get the current template as input
    skip all the templates until we get to the current template
    if templates are left:
        skip the current template
        try:
            return the next one
        except there is no next one:
            raise no such a template, next loader
    else:
        raise no such a template, next loader

Unfortunately, that would suppose going through all the loaders every time. To
avoid that, we could ignore all the loaders previous to the current one
(defined by the ``loader`` attribute of the template to skip).

So ``find_template`` would be something like:

    get the loaders
    if there is some template to skip, get its loader
    skip all the loaders until we get to the current loader
    iterate over the remaining loaders and ask them for a template

### Edge cases

#### Previous loader's template

So we had:

    α = ⟨ A, B, C ⟩
    β = ⟨ D, E ⟩

After the templates of α are rendered, it's β's turn. So we pass it the
previous *C* template. Now, β doesn't have such a template so *skipping all the
templates until we get to the current template* would leave us with no
template.

This could easily be solved by passing the previous template **only to the same
loader**. That's it, we wouldn't pass *C* to β, we would only pass it to α.
This would also add an extra level of consistency: it doesn't make sense for
loaders to try to skip a template by it's ``display_name`` if that
``display_name`` is set by another loader.

#### Different loaders, same templates

What would happen if the same templates where used in more than one loader?

    α = ⟨ A, B, C ⟩
    β = ⟨ A, B, D, E ⟩

A true horror story. We would go through all the α loader. So far, so good. The
*A* template from within the β loader would be rendered next. The *A* template
would be provided to ``find_template`` as the next template to skip.  But
beware! The *A* template is also present in the α loader! So the *B* template
of the α loader would be rendered, entering in an infinite loop.

Fortunately, the slight optimization we talked about before solves this edge
case. If all the loaders are skipped until arriving to the current loader,
there is no risk of loading the *B* template from α. It would be loaded by β
instead, continuing with the normal curse.

Of course, this edge case is a bit silly: there isn't any normal situation in
where exactly the same path is loaded by the app and the filesystem loaders.
This unlikely situation isn't specific to them though. The same would happen
every time two different loaders found a match of the same template to be
skipped. So it's a nice thing to have it covered.

Conclusion
==========

Summarizing, the required changes would be:

- accept an argument denoting the template to skip in ``find_template`` (and
  other functions in ``django.template.loader``) and in every loader.

- if a template to skip is provided to ``find_template``, skip all the loaders
  before the loader of the template to skip.

- pass on the template to skip to the loader only if the loader is the same as
  the loader of the template to skip.

- skip all the templates until the template to skip is reached, skip that one
  too and return the next one in every loader.

- get a better name for the ``display_name`` attribute of the origins.

- modify the cache loader so that all this changes are supported.

Progress
========

I have taken some time off to think with calm about all this SRTI stuff so that
I can order my thoughts. I will be back when I have enough energy to deal with
it.

**Work in progress...**

*[SRTI]: self-referenced template inheritance
