---
layout: page
title: Articles
---

<ul>
    {% for post in site.posts %}
        <li class="article">
            <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
            <p>{{ post.excerpt }}</p>
        </li>
    {% endfor %}
</ul>
