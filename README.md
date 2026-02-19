# Chronodaddy · Static site (Jekyll + GitHub Pages) con import automatico YouTube

Questo repository contiene un sito statico Jekyll pensato come **portfolio per aziende**: ogni nuovo video YouTube viene trasformato automaticamente in un **post**.

## 1) Pubblicazione su GitHub Pages (2 minuti)

1. Crea un repository:
   - consigliato: `chronodaddy.github.io` (User/Org Pages)
   - oppure un repo qualsiasi (Project Pages)
2. Carica dentro *tutti* questi file.
3. Vai su **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` (o `master`) / folder: `/ (root)`
4. Attendi la prima build.

> Jekyll viene buildato automaticamente da GitHub Pages (senza plugin custom).

## 2) Automazione: nuovi video → nuovi post

Per generare i post dai video usiamo l’RSS ufficiale di YouTube (richiede il Channel ID).

### A) Recupera il tuo Channel ID (UC…)
Metodo ufficiale (YouTube): **Settings → Advanced settings** e copia “Channel ID”.
Guida: https://support.google.com/youtube/answer/3250431

### B) Imposta il secret su GitHub
Vai su **Settings → Secrets and variables → Actions → New repository secret**:

- Name: `YT_CHANNEL_ID`
- Value: `UCxxxxxxxxxxxxxxxxxxxxxx`

Da questo momento, il workflow:
- gira **ogni ora**
- crea un file in `_posts/` per ogni video nuovo
- committa e pusha i cambiamenti

## 3) KPI nel Media Kit (opzionale)
Il sito è già pronto per leggere `assets/channel-stats.json` e mostrare:
- iscritti
- visualizzazioni
- numero video

Se vuoi aggiornare questi numeri automaticamente:
1. crea una API key per **YouTube Data API v3**
2. aggiungi anche il secret:
   - `YT_API_KEY`
3. abilita lo step “Update channel stats” nel workflow `.github/workflows/youtube-to-posts.yml`

Documentazione API: https://developers.google.com/youtube/v3

## 4) Aggiungere “valore” per aziende (consigliato)
I post generati hanno di default `tags: [youtube]`.
Per trasformare il sito in portfolio:
- modifica i post aggiungendo tag tipo: `seiko`, `tudor`, `review`, `macro`, `shorts`
- aggiungi 3–5 righe di contesto (brief, cosa hai fatto, risultato)

## Sviluppo locale (opzionale)
Serve Ruby + Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Apri http://localhost:4000
