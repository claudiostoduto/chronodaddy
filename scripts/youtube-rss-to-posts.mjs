import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";
import fs from "fs";
import path from "path";

const channelId = process.env.YT_CHANNEL_ID;
if (!channelId) {
  console.error("❌ Missing YT_CHANNEL_ID. Add it as a GitHub secret: Settings → Secrets and variables → Actions.");
  process.exit(1);
}

const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const res = await fetch(feedUrl);
if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
const xml = await res.text();

const parser = new XMLParser({ ignoreAttributes: false });
const data = parser.parse(xml);

const entries = data?.feed?.entry
  ? (Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry])
  : [];

const outDir = path.join(process.cwd(), "_posts");
fs.mkdirSync(outDir, { recursive: true });

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function postAlreadyExists(videoId) {
  const files = fs.readdirSync(outDir).filter(f => f.endsWith(".md"));
  for (const f of files) {
    const txt = fs.readFileSync(path.join(outDir, f), "utf8");
    if (txt.includes(`videoId: "${videoId}"`)) return true;
  }
  return false;
}

let created = 0;

for (const e of entries) {
  const videoId = e["yt:videoId"];
  const titleRaw = (e.title || "").replace(/\s+/g, " ").trim();
  const published = (e.published || "").slice(0, 10); // YYYY-MM-DD
  if (!videoId || !published || !titleRaw) continue;

  if (postAlreadyExists(videoId)) continue;

  const slug = slugify(titleRaw) || videoId;
  const filename = `${published}-${slug}.md`;
  const filepath = path.join(outDir, filename);

  const url = e.link?.["@_href"] || `https://www.youtube.com/watch?v=${videoId}`;
  const thumb = e["media:group"]?.["media:thumbnail"]?.["@_url"] || "";

  // excerpt: prendiamo una versione corta del titolo (puoi cambiarla manualmente dopo)
  const excerpt = titleRaw.length > 120 ? titleRaw.slice(0, 117) + "..." : titleRaw;

  const md = `---
title: "${titleRaw.replace(/"/g, '\"')}"
date: ${published}
videoId: "${videoId}"
youtubeUrl: "${url}"
thumbnail: "${thumb}"
tags: [youtube]
excerpt: "${excerpt.replace(/"/g, '\"')}"
---

<!--
Questo post è stato generato automaticamente.
Puoi aggiungere tag più specifici (brand/modello/format) e una descrizione/contesto per renderlo un vero case study.
-->

`;

  fs.writeFileSync(filepath, md, "utf8");
  created++;
  console.log("✅ Created:", filepath);
}

console.log(`Done. New posts: ${created}`);
