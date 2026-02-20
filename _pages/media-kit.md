---
title: Media kit
subtitle: Dati, formati e contatti per collaborazioni.
permalink: /media-kit/
---

<div class="card">
  <h2 style="margin:0 0 6px;">Numeri del canale</h2>
  <p class="subtitle">
    Questa sezione può essere aggiornata automaticamente (opzionale) tramite workflow GitHub Actions che salva <code>assets/channel-stats.json</code>.
  </p>

  <div class="kpi">
    <div class="k">
      <div class="n" id="mk-subs">—</div>
      <div class="l">Iscritti</div>
    </div>
    <div class="k">
      <div class="n" id="mk-views">—</div>
      <div class="l">Visualizzazioni totali</div>
    </div>
    <div class="k">
      <div class="n" id="mk-videos">—</div>
      <div class="l">Video</div>
    </div>
  </div>

  <hr/>

  <h2 style="margin:0 0 6px;">Formati disponibili</h2>
  <ul style="margin:0;padding-left:18px;color:var(--muted)">
    <li>Review / hands-on (long form)</li>
    <li>On-wrist / macro / b-roll</li>
    <li>Shorts</li>
    <li>Integrazioni brand / menzioni / unboxing</li>
  </ul>

  <hr/>

  <h2 style="margin:0 0 6px;">Link</h2>
  <p style="margin:0;color:var(--muted)">
    Canale: <a href="https://www.youtube.com/@{{ site.youtube_handle }}" target="_blank" rel="noopener">youtube.com/@{{ site.youtube_handle }}</a><br/>
    Email: <a href="mailto:{{ site.contact_email }}">{{ site.contact_email }}</a>
  </p>
</div>

<p style="margin-top:12px;">
  <a class="btn" href="{{ '/assets/media-kit.pdf' | relative_url }}" target="_blank" rel="noopener">
    Scarica Media Kit (PDF)
  </a>
</p>

<script>
(async function(){
  try{
    const res = await fetch("{{ '/assets/channel-stats.json' | relative_url }}", {cache:"no-store"});
    if(!res.ok) return;
    const s = await res.json();
    const fmt = (n)=> (typeof n==="number" ? n.toLocaleString("it-IT") : "—");
    document.getElementById("mk-subs").textContent = fmt(s.subscribers);
    document.getElementById("mk-views").textContent = fmt(s.views);
    document.getElementById("mk-videos").textContent = fmt(s.videos);
  }catch(e){}
})();
</script>
