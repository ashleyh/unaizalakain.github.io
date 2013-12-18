---
layout: page
title: Yammy
---

[Yammy](https://bitbucket.org/quasinerd/yammy) is not a template engine.
Instead, it strips unnecessary parts of HTML and opts for an indentation based
nesting.

I found this project when it was already quite mature. I worked on Python 3
compatibility, documentation improvement, better Django loaders support and a
better CLI.

This is Yammy:

    Yammy                             Translates to
    --------------------------------- -----------------------------------------------------------
    div Some Text                     <div>Some text</div>

    div                               <div>Some text</div>
        | Some text

    div.class#id Inner Text           <div class="class" id="id">Inner Text</div>

    div                               <div class="class" id="id">Inner Text</div>
        - class class
        - id id
        | Inner Text

    div.class1.class2#id              <div class="class1 class2" id="id">Inner Text</div>

    input[type="submit"]              <input type="submit"/>

    input[type=submit]                <input type="submit"/>

    div.outer                         <div class="outer"><div class="inner">Some text</div></div>
        div.inner
            | Some text

    <!doctype html>                   <!doctype html><html><body></body></html>
    html
        body

    {% if target.hit %}               {% if target.hit %}<div class="hit">Hit!</div>{% endif %}
        div.hit Hit!
    {% endif %}

    html                              <html><body><div>            <p>Hi!</p>
        body                          <p>                How are you?
            div                                       Good!
                !HTML                 </p></div></body></html>
                <p>Hi!</p>
                !YAMMY
                p
                    !TEXT
                    How are you?
                    !PLAIN
                    Good!

    script                            <script>
        $(function(){                 $(function(){
            $('.button').click(       $('.button').click(
                function(e){          function(e){
                   console.log(e);    console.log(e);
                }                     }
            );                        );
        });                           });
                                      </script>

    div                               <div class="class" id="id">Inner Text</div>
        # let's define a class
        - class class
        # let's specify the id
        - id id
        # let's add the inner text
        | Inner Text

