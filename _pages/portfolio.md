---
title: Portfolio
subtitle: Tutti i video, in formato “post” per condivisione e presentazioni.
permalink: /portfolio/
---

<p class="subtitle">
  Suggerimento: puoi aggiungere <code>tags</code> ai post per brand/modello/format e poi filtrare qui.
</p>

<div class="card" style="margin-top:14px;">
  <input class="input" id="tagFilter" placeholder="Filtra per tag (es. seiko, tudor, macro, shorts)..." />
</div>

<div class="post-list" id="postList" style="margin-top:14px;">
  {% for post in site.posts %}
    <a class="post-item" href="{{ post.url | relative_url }}" data-tags="{% for t in post.tags %}{{ t | downcase }} {% endfor %}" style="text-decoration:none">
      <div class="thumb">
        {% if post.thumbnail and post.thumbnail != "" %}
          <img src="{{ post.thumbnail }}" alt="thumbnail">
        {% else %}
          <span class="meta">No thumb</span>
        {% endif %}
      </div>
      <div>
        <h3>{{ post.title }}</h3>
        <div class="meta">
          {{ post.date | date: "%-d %b %Y" }}
          {% if post.tags and post.tags.size > 0 %}
            · {% for t in post.tags %}#{{ t }} {% endfor %}
          {% endif %}
        </div>
        {% if post.excerpt %}
          <div class="meta" style="margin-top:6px;">{{ post.excerpt | strip_html | truncate: 110 }}</div>
        {% endif %}
      </div>
    </a>
  {% endfor %}
</div>

<script>
(function(){
  const input = document.getElementById("tagFilter");
  const list = document.getElementById("postList");
  const items = Array.from(list.querySelectorAll("a[data-tags]"));

  const qs = new URLSearchParams(location.search);
  const initial = qs.get("tag");
  if(initial){ input.value = decodeURIComponent(initial); }

  function apply(){
    const q = input.value.trim().toLowerCase();
    items.forEach(a=>{
      const tags = (a.getAttribute("data-tags")||"").toLowerCase();
      a.style.display = (!q || tags.includes(q)) ? "" : "none";
    });
  }
  input.addEventListener("input", apply);
  apply();
})();
</script>
