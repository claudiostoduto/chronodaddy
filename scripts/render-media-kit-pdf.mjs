import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const siteUrl =
  process.env.SITE_URL || "https://YOUR_DOMAIN_HERE"; // <-- metti il tuo dominio

const target = new URL("/media-kit/", siteUrl).toString();
const outPath = path.join(process.cwd(), "assets", "media-kit.pdf");
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

await page.goto(target, { waitUntil: "networkidle" });

// Piccola “pulizia stampa”: nascondi header/footer nav e fai padding
await page.addStyleTag({
  content: `
    .site-head, .site-foot { display:none !important; }
    main.container { padding-top: 0 !important; }
    body { background: #fff !important; color:#111 !important; }
    .card { box-shadow:none !important; }
  `
});

await page.pdf({
  path: outPath,
  format: "A4",
  printBackground: true,
  margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
});

await browser.close();
console.log("Wrote:", outPath);
