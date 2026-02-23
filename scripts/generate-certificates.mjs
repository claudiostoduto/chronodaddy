import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { chromium } from "playwright";
import QRCode from "qrcode";

const SITE_URL = process.env.SITE_URL || "https://chronodaddy.it";
const PHONE_E164 = "393534883914"; // WhatsApp
const EMAIL = "chronodaddy@mrclaus.xyz";

function readFrontMatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const m = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!m) return null;
  const data = yaml.load(m[1]) || {};
  return { data };
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

async function main() {
  const dir = path.join(process.cwd(), "_mercatino");
  if (!fs.existsSync(dir)) {
    console.error("❌ Missing _mercatino/ folder");
    process.exit(1);
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
  if (!files.length) {
    console.log("No items found in _mercatino/");
    return;
  }

  const outDir = path.join(process.cwd(), "assets", "certificati");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } }); // A4-ish

  let count = 0;

  for (const f of files) {
    const slug = path.basename(f, ".md");
    const fp = path.join(dir, f);
    const parsed = readFrontMatter(fp);
    if (!parsed) continue;

    const d = parsed.data;

    // Link inserzione: coerente con permalink /mercatino/:name/
    const listingUrl = new URL(`/mercatino/${slug}/`, SITE_URL).toString();

    const qrDataUrl = await QRCode.toDataURL(listingUrl, { margin: 1, width: 240 });

    const title = d.title || slug;
    const price = d.price || "";
    const year = d.year || "";
    const condition = d.condition || "";
    const movement = d.movement || "";
    const diameter = d.diameter || "";
    const box_papers = d.box_papers || "";
    const location = d.location || "";
    const status = (d.status || "disponibile").toLowerCase();
    const serial = d.serial || ""; // opzionale se vuoi inserirlo

    const today = new Date().toISOString().slice(0, 10);

    const html = `
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title>Certificato - ${esc(title)}</title>
<style>
  *{box-sizing:border-box}
  body{font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; margin:0; padding:26px; color:#111}
  .wrap{border:2px solid #111; border-radius:14px; padding:22px}
  .top{display:flex; justify-content:space-between; gap:18px; align-items:flex-start}
  .brand{font-weight:900; letter-spacing:.12em; text-transform:uppercase; font-size:12px}
  h1{margin:8px 0 0; font-size:26px; line-height:1.1}
  .meta{color:#444; margin-top:6px; font-size:13px}
  .grid{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:18px}
  .box{border:1px solid #ddd; border-radius:12px; padding:12px}
  .k{font-size:12px; color:#666; text-transform:uppercase; letter-spacing:.08em}
  .v{margin-top:6px; font-size:14px}
  .price{font-size:22px; font-weight:900}
  .pill{display:inline-block; padding:6px 10px; border-radius:999px; font-weight:800; font-size:12px; border:1px solid #ddd}
  .sold{background:#111;color:#fff;border-color:#111}
  .foot{display:flex; justify-content:space-between; gap:18px; margin-top:18px; align-items:flex-end}
  .qr{border:1px solid #ddd; border-radius:12px; padding:10px; width:180px}
  .small{font-size:12px; color:#444; line-height:1.35}
  .line{height:1px;background:#ddd;margin:16px 0}
  a{color:#111}
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div>
        <div class="brand">CHRONODADDY · CERTIFICATO</div>
        <h1>${esc(title)}</h1>
        <div class="meta">
          Data emissione: <strong>${esc(today)}</strong> ·
          Stato: <span class="pill ${status === "venduto" ? "sold" : ""}">${esc(status.toUpperCase())}</span>
        </div>
      </div>
      <div style="text-align:right">
        <div class="price">${esc(price)}</div>
        <div class="meta">Link inserzione:</div>
        <div class="meta"><a href="${esc(listingUrl)}">${esc(listingUrl)}</a></div>
      </div>
    </div>

    <div class="grid">
      <div class="box"><div class="k">Anno</div><div class="v">${esc(year)}</div></div>
      <div class="box"><div class="k">Condizioni</div><div class="v">${esc(condition)}</div></div>
      <div class="box"><div class="k">Movimento</div><div class="v">${esc(movement)}</div></div>
      <div class="box"><div class="k">Diametro</div><div class="v">${esc(diameter)}</div></div>
      <div class="box"><div class="k">Dotazione</div><div class="v">${esc(box_papers)}</div></div>
      <div class="box"><div class="k">Posizione</div><div class="v">${esc(location)}</div></div>
      ${serial ? `<div class="box" style="grid-column:1 / -1;"><div class="k">Seriale (se dichiarato)</div><div class="v">${esc(serial)}</div></div>` : ""}
    </div>

    <div class="line"></div>

    <div class="foot">
      <div class="small">
        <strong>Venditore:</strong> Chronodaddy (privato)<br/>
        <strong>Email:</strong> ${esc(EMAIL)}<br/>
        <strong>WhatsApp:</strong> +39 353 488 3914<br/>
        <br/>
        Il presente documento descrive l’inserzione e le caratteristiche dichiarate dal venditore.<br/>
        Vendita tra privati: pagamento e spedizione da concordare.
      </div>
      <div class="qr">
        <div class="k">QR inserzione</div>
        <img src="${qrDataUrl}" alt="QR" style="width:100%;height:auto;margin-top:8px;border-radius:10px"/>
      </div>
    </div>
  </div>
</body>
</html>
`;

    await page.setContent(html, { waitUntil: "load" });

    const outPath = path.join(outDir, `${slug}.pdf`);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    count++;
    console.log("✅ PDF:", outPath);
  }

  await browser.close();
  console.log(`Done. Generated PDFs: ${count}`);
}

main().catch((e) => {
  console.error("❌", e);
  process.exit(1);
});