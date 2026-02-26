---
layout: default
---

<div class="grid cols-2">
  <section class="card">
    <h1 class="h1">Chronodaddy</h1>
    <p class="subtitle">
    </p>

    <div class="kpi">
      <div class="k">
        <div class="n" id="kpi-subs">—</div>
        <div class="l">Iscritti</div>
      </div>
      <div class="k">
        <div class="n" id="kpi-views">—</div>
        <div class="l">Visualizzazioni totali</div>
      </div>
      <div class="k">
        <div class="n" id="kpi-videos">—</div>
        <div class="l">Video</div>
      </div>
    </div>

    <hr/>

    <p>
      <a class="btn" href="https://www.youtube.com/@{{ site.youtube_handle }}" target="_blank" rel="noopener">Vai al canale YouTube</a>
      &nbsp; <a class="btn" href="{{ '/media-kit/' | relative_url }}">Media kit</a>
    </p>

    <hr/>

    <h2 style="margin:0 0 10px;">Ultimi video</h2>

    <div class="post-list">
      {% assign recent = site.posts | slice: 0, 8 %}
      {% for post in recent %}
        <a class="post-item" href="{{ post.url | relative_url }}" style="text-decoration:none">
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
  </section>

  <aside class="card">
    <img class="sidebar-logo" src="{{ site.logo_image | relative_url }}" alt="Chronodaddy">
    <h2 style="margin:0 0 6px;">Chi sono</h2>
    <p class="subtitle" style="margin-bottom:12px;">
    </p>
    Un papà appassionato di orologi. Qui trovi tutti i video pubblicati sul canale.

    <hr/>
    <p style="margin:0;">
      <a class="btn" href="{{ '/contatti/' | relative_url }}">Contattami</a>
    </p>

    {%- comment -%} ✅ QUI SOTTO: annunci mercatino disponibili {%- endcomment -%}
    {% assign available = site.mercatino
      | where_exp: "i", "i.status != 'venduto'"
      | sort: "date_added"
      | reverse
    %}

    {% if available.size > 0 %}
      <hr/>
      <h2 style="margin:0 0 10px;">Mercatino (disponibili)</h2>

      <div class="post-list">
        {% for item in available limit: 3 %}
          <a class="post-item" href="{{ item.url | relative_url }}" style="text-decoration:none">
            <div class="thumb">
              {% if item.cover and item.cover != "" %}
                <img src="{{ item.cover | relative_url }}" alt="{{ item.title | escape }}">
              {% elsif item.images and item.images.size > 0 %}
                <img src="{{ item.images[0] | relative_url }}" alt="{{ item.title | escape }}">
              {% else %}
                <span class="meta">Disponibile</span>
              {% endif %}
            </div>
            <div>
              <h3>{{ item.title }}</h3>
              <div class="meta">
                {% if item.price %}<strong>{{ item.price }}</strong>{% endif %}
                {% if item.condition %} · {{ item.condition }}{% endif %}
                {% if item.year %} · {{ item.year }}{% endif %}
              </div>
            </div>
          </a>
        {% endfor %}
      </div>

      <p style="margin:10px 0 0;">
        <a class="btn" href="{{ '/mercatino/' | relative_url }}">Vedi tutti</a>
      </p>
    {% endif %}

    {%- comment -%} Blog: ultimi 5 articoli dalla collection _blog {%- endcomment -%}
{% assign latest_blog = site.blog | sort: "date" | reverse | slice: 0, 5 %}

{% if latest_blog.size > 0 %}
  <hr/>
  <h2 style="margin:0 0 10px;">Ultimi articoli</h2>

  <div class="post-list">
    {% for post in latest_blog %}
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
          <div class="meta">
            {{ post.date | date: "%-d %b %Y" }}
            {% if post.tags and post.tags.size > 0 %}
              · {% for t in post.tags limit:3 %}#{{ t }} {% endfor %}
            {% endif %}
          </div>
          {% if post.excerpt %}
            <div class="meta" style="margin-top:6px;">{{ post.excerpt | strip_html | truncate: 95 }}</div>
          {% endif %}
        </div>
      </a>
    {% endfor %}
  </div>

  <p style="margin:10px 0 0;">
    <a class="btn" href="{{ '/blog/' | relative_url }}">Vedi tutti</a>
  </p>
{% endif %}

  </aside>
</div>

<script>
(async function(){
  // KPI opzionali: se assets/channel-stats.json esiste, lo mostra.
  try{
    const res = await fetch("{{ '/assets/channel-stats.json' | relative_url }}", {cache:"no-store"});
    if(!res.ok) return;
    const s = await res.json();
    const fmt = (n)=> (typeof n==="number" ? n.toLocaleString("it-IT") : "—");
    document.getElementById("kpi-subs").textContent = fmt(s.subscribers);
    document.getElementById("kpi-views").textContent = fmt(s.views);
    document.getElementById("kpi-videos").textContent = fmt(s.videos);
  }catch(e){}
})();
</script>