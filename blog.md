---
layout: page
title: Blog
permalink: /blog/
---

<div class="post-list">
  {% assign all_blog = site.blog | sort: "date" | reverse %}
  {% for post in all_blog %}
    <a class="post-item" href="{{ post.url | relative_url }}" style="text-decoration:none">
      <div class="thumb">
        {% if post.thumbnail and post.thumbnail != "" %}
          <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title | escape }}">
        {% else %}
          <span class="meta">{{ post.date | date: "%-d %b %Y" }}</span>
        {% endif %}
      </div>
      <div>
        <h3>{{ post.title }}</h3>
        <div class="meta">{{ post.date | date: "%-d %b %Y" }}</div>
        {% if post.excerpt %}
          <div class="meta" style="margin-top:6px;">{{ post.excerpt | strip_html | truncate: 120 }}</div>
        {% endif %}
      </div>
    </a>
  {% endfor %}
</div>