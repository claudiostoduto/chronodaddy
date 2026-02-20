---
layout: default
---

<div class="grid cols-2">
  <section class="card">
    <h1 class="h1">Chronodaddy</h1>
    <p class="subtitle">
      Un papà appassionato di orologi. Qui trovi tutti i video pubblicati sul canale, in formato “post” condivisibili con aziende e brand.
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
    <h2 style="margin:0 0 6px;">Per aziende</h2>
    <p class="subtitle" style="margin-bottom:12px;">
      Se vuoi valutare una collaborazione, qui trovi una vista ordinata di contenuti e numeri.
    </p>
    <ul style="margin:0;padding-left:18px;color:var(--muted)">
      <li>Post automatici per ogni nuovo video</li>
      <li>Pagina portfolio con filtri per tag</li>
      <li>Media kit con KPI aggiornabili</li>
      <li>Contatti rapidi</li>
    </ul>
    <hr/>
    <p style="margin:0;">
      <a class="btn" href="{{ '/contatti/' | relative_url }}">Contattami</a>
    </p>
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
