/**
 * Opzionale: salva assets/channel-stats.json con KPI (iscritti/viste/video).
 * Richiede YT_API_KEY e YT_CHANNEL_ID nei secrets.
 *
 * YouTube Data API v3: https://developers.google.com/youtube/v3
 */
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const apiKey = process.env.YT_API_KEY;
const channelId = process.env.YT_CHANNEL_ID;

if (!apiKey || !channelId) {
  console.error("❌ Missing YT_API_KEY or YT_CHANNEL_ID. Add them as GitHub secrets.");
  process.exit(1);
}

const url = new URL("https://www.googleapis.com/youtube/v3/channels");
url.searchParams.set("part", "statistics");
url.searchParams.set("id", channelId);
url.searchParams.set("key", apiKey);

const res = await fetch(url);
if (!res.ok) throw new Error(`API failed: ${res.status}`);
const data = await res.json();

const stats = data?.items?.[0]?.statistics;
if (!stats) throw new Error("No statistics returned. Check channel ID / API key.");

const out = {
  subscribers: Number(stats.subscriberCount),
  views: Number(stats.viewCount),
  videos: Number(stats.videoCount),
  updatedAt: new Date().toISOString()
};

const outPath = path.join(process.cwd(), "assets", "channel-stats.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");

console.log("✅ Wrote", outPath);
