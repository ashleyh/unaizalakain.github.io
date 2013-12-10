---
layout: page
title: Django
---

[Django](https://djangoproject.com)

I began contributing to Django recently. First picking up old tickets and
updating their patches, then trying to resolve some long running tickets,
submitting my own solutions to more recent tickets afterwards and finally
reviewing the pull requests from other.

Contributing to Django is definitively an interesting challenge. The best part
of it are the reviews by other developers of the patches I submit.

Here are some tickets that, for one reason or another, sounded interesting to
me. This is also a personal list to help me keeping track of them.


Owned tickets
=============

You can get an updated list
[here](https://code.djangoproject.com/query?owner=unaizalakain).

Working on
:[#15053](https://code.djangoproject.com/ticket/15053/)
    Make templates more reusable by Improving template loading algorithm to avoid extending infinite recursion


Pending for review
:[#5418](https://code.djangoproject.com/ticket/5418/)
    Add assertNoBrokenLinks() to test system
:[#10190](https://code.djangoproject.com/ticket/10190/)
    Charset should be customizable with HttpResponse
:[#12571](https://code.djangoproject.com/ticket/12571/)
    Test client doesn't set WSGIRequest instance on response
:[#16245](https://code.djangoproject.com/ticket/16245/)
    send_robust should include traceback in response when Exception occurs
:[#18314](https://code.djangoproject.com/ticket/18314/)
    request.build_absolute_uri() functions incorrectly when the path starts with //
:[#18456](https://code.djangoproject.com/ticket/18456/)
    HttpRequest.get_full_path does not escape # sign in the url
:[#19869](https://code.djangoproject.com/ticket/19869/)
    Make changing the active language inside `LiveTestServerCase` possible


Made it into master
:[#7261](https://code.djangoproject.com/ticket/7261/)
     Support for __html__ for Library interoperability
:[#7603](https://code.djangoproject.com/ticket/7603/)
     Add HttpRequest.scheme property
:[#8116](https://code.djangoproject.com/ticket/8116/)
     django.template.loader.select_template should not silently skip a template which includes another template that does not exist
:[#8261](https://code.djangoproject.com/ticket/8261/)
     ModelAdmin hook for customising the "show on site" button
:[#9722](https://code.djangoproject.com/ticket/9722/)
     Use pyinotify (where available) instead of polling filesystem every second to detect changes
:[#13725](https://code.djangoproject.com/ticket/13725/)
    assertRedirects not taking url scheme into account
:[#17529](https://code.djangoproject.com/ticket/17529/)
    get_template_from_string default arguments break assertTemplateUsed
:[#21172](https://code.djangoproject.com/ticket/21172/)
    have LiveServerThread follow the semantics of threading.Thread.join()
:[#21213](https://code.djangoproject.com/ticket/21213/)
    Document how to subscribe to mailing lists without a Google account
:[#21230](https://code.djangoproject.com/ticket/21230/)
    Remove usage of direct settings manipulation in Django's tests
:[#21341](https://code.djangoproject.com/ticket/21341/)
    Clean way of making https requests with test client
:[#21476](https://code.djangoproject.com/ticket/21476/)
    Cache tests make an incorrect use of `HttpRequest`


Tickets I am planning to work on
================================


Easy
:[#12098](https://code.djangoproject.com/ticket/12098/)
    HttpRequest __repr__ too verbose
:[#18523](https://code.djangoproject.com/ticket/18523/)
    Add getvalue to HttpResponse


Not too difficult
:[#8122](https://code.djangoproject.com/ticket/8122/)
     Better way of testing for cookies
:[#15091](https://code.djangoproject.com/ticket/15091/)
    Serializer docs contain nothing on how to use a custom encoder
:[#21242](https://code.djangoproject.com/ticket/21242/)
    Allow more IANA schemes in URLValidator


Hard
:[#11331](https://code.djangoproject.com/ticket/11331/)
    Memcached backend closes connection after every request
:[#17102](https://code.djangoproject.com/ticket/17102/)
    Add SSL-redirect middleware to better support all-SSL sites
:[#17103](https://code.djangoproject.com/ticket/17103/)
    Add HTTP Strict Transport Security support, to improve support for all-SSL sites


Learn about
:[#10554](https://code.djangoproject.com/ticket/10554/)
    Response.set_cookie should allow setting two cookies of the same name.
:[#19508](https://code.djangoproject.com/ticket/19508/)
    Implement URL decoding according to RFC 3987
:[#20916](https://code.djangoproject.com/ticket/20916/)
    Provide a "simple_login" feature for the test client
:[#21250](https://code.djangoproject.com/ticket/21250/)
    Make Remote User tests more flexible
:[#21459](https://code.djangoproject.com/ticket/21459/)
    Allow easy reload of appcache.

Investigate
:[#12432](https://code.djangoproject.com/ticket/12432/)
    After setting encoding in view, request.REQUEST is not deleted
:[#18707](https://code.djangoproject.com/ticket/18707/)
    Test client doesn't allow testing 500 responses content
:[#20461](https://code.djangoproject.com/ticket/20461/)
    Support for running Django tests in parallel


Tickets to review
=================


Working
:[#18855](https://code.djangoproject.com/ticket/18855/)
    persist a socket across reloads of the dev server

Waiting
:[#20346](https://code.djangoproject.com/ticket/20346/)
    cache middleware should vary on full URL
:[#20495](https://code.djangoproject.com/ticket/20495/)
    add login failure events to django.security logger
:[#21495](https://code.djangoproject.com/ticket/21495/)
    Add a setting for CSRF Header name

Pending
:[#21281](https://code.djangoproject.com/ticket/21281/)
    trying to override settings in test case setUpClass
:[#21357](https://code.djangoproject.com/ticket/21357/)
    Test client session does not behave as stated in the django documentation.
:[#21448](https://code.djangoproject.com/ticket/21448/)
    Test Client logout does not work with cookie-based sessions
:[#21451](https://code.djangoproject.com/ticket/21451/)
    LiveServerTestCase returns a 404 on all URLs when MEDIA_URL = '' and DEBUG = True
:[#21483](https://code.djangoproject.com/ticket/21483/)
    [RFE] Add WSGI environ to request_started signal emission
