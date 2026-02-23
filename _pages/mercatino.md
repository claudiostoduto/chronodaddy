---
title: Mercatino
subtitle: Orologi dalla mia collezione personale.
permalink: /mercatino/
---

<div class="card trust-card" style="margin-bottom:14px;">
  <div class="section-head">
    <h2 class="h2">Perché acquisti da me</h2>
    <p class="subtitle" style="margin:0;">
      Vendita tra privati, con trasparenza e materiale completo.
    </p>
  </div>

  <ul class="bullets" style="margin:0;">
    <li>Foto reali ad alta qualità (macro + dettagli)</li>
    <li>Scheda tecnica completa + condizioni dichiarate</li>
    <li>Video sul canale Chronodaddy come prova/contesto (quando disponibile)</li>
    <li>Contatto diretto WhatsApp + email</li>
    <li>Certificato PDF scaricabile per ogni inserzione</li>
  </ul>
</div>

<div class="card" style="margin-bottom:14px;">
  <div class="filters">
    <button class="filter-btn is-active" data-filter="all">Tutti</button>
    <button class="filter-btn" data-filter="disponibile">Disponibili</button>
    <button class="filter-btn" data-filter="venduto">Venduti</button>
  </div>
</div>

<div class="merc-grid" id="mercGrid">
  {% assign items = site.mercatino | sort: 'date_added' | reverse %}
  {% for item in items %}
    <a class="merc-card" href="{{ item.url | relative_url }}" data-status="{{ item.status | downcase }}">
      <div class="merc-thumb">
        <img src="{{ item.cover | relative_url }}" alt="">

        {% comment %} Badge VENDUTO {% endcomment %}
        {% if item.status == "venduto" %}
          <span class="badge sold">VENDUTO</span>
        {% endif %}

        {% comment %} Badge NUOVO: ultimi 14 giorni {% endcomment %}
        {% if item.date_added %}
          {% assign now_s = 'now' | date: '%s' %}
          {% assign add_s = item.date_added | date: '%s' %}
          {% assign diff = now_s | minus: add_s %}
          {% assign days = diff | divided_by: 86400 %}
          {% if days <= 14 %}
            <span class="badge new">NUOVO</span>
          {% endif %}
        {% endif %}
      </div>

      <div class="merc-body">
        <h3>{{ item.title }}</h3>
        <div class="price">{{ item.price }}</div>
        <div class="meta">
          {{ item.condition }}{% if item.year %} · {{ item.year }}{% endif %}
        </div>
      </div>
    </a>
  {% endfor %}
</div>

<script>
(function(){
  const grid = document.getElementById("mercGrid");
  const cards = Array.from(grid.querySelectorAll(".merc-card"));
  const buttons = Array.from(document.querySelectorAll(".filter-btn"));

  function setActive(btn){
    buttons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function apply(filter){
    cards.forEach(c => {
      const s = (c.dataset.status || "").toLowerCase();
      c.style.display = (filter === "all" || s === filter) ? "" : "none";
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      setActive(btn);
      apply(f);
    });
  });
})();
</script>