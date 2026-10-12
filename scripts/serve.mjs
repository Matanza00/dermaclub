// Local preview of dist/ with the same clean URLs Vercel uses. Run `npm run dev`.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.PORT) || 3000;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".xml": "application/xml", ".txt": "text/plain" };

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/";
  const tries = clean === "/" ? ["index.html"] : [clean.slice(1), clean.slice(1) + ".html", path.join(clean.slice(1), "index.html")];
  for (const t of tries) {
    const f = path.join(DIST, t);
    if (f.startsWith(DIST) && fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

http.createServer((req, res) => {
  const f = resolve(req.url);
  const file = f || path.join(DIST, "404.html");
  res.writeHead(f ? 200 : 404, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
