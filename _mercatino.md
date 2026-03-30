---
layout: page
title: Mercatino
subtitle: Orologi dalla mia collezione personale.
permalink: /mercatino/
---

<div class="merc-grid">
  {% assign items = site.mercatino | sort: 'date_added' | reverse %}
  {% for item in items %}
    <a class="merc-card" href="{{ item.url | relative_url }}" data-status="{{ item.status | downcase }}">
      <div class="merc-thumb">
        <img src="{{ item.cover | relative_url }}" alt="">
        {% if item.status == "venduto" %}<span class="badge sold">VENDUTO</span>{% endif %}
      </div>
      <div class="merc-body">
        <h3>{{ item.title }}</h3>
        <div class="price">{{ item.price }}</div>
        <div class="meta">{{ item.condition }}{% if item.year %} · {{ item.year }}{% endif %}</div>
      </div>
    </a>
  {% endfor %}
</div>