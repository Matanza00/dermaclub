// Builds the static site into dist/: one prerendered HTML file per route, hashed CSS/JS,
// sitemap.xml and robots.txt. No dependencies; run with `npm run build`.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const PUB = path.join(ROOT, "public");
const OUT = path.join(ROOT, "dist");

// Production URL used for canonical links, Open Graph and the sitemap.
const SITE_URL = (process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://thedermaclub.ca")
).replace(/\/+$/, "");
// Search engines are kept out until the clinic approves the redesign. Set SITE_INDEXABLE=true to go live.
const LIVE = process.env.SITE_INDEXABLE === "true";

const read = (f) => fs.readFileSync(f, "utf8");
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// ---------- load the shared templates (src/app.js) in a sandbox ----------
const appJs = read(path.join(SRC, "app.js"));
const ctx = vm.createContext({ __PRERENDER: true, console });
vm.runInContext(appJs, ctx, { filename: "app.js" });
const SITE = ctx.SITE;
if (!SITE) throw new Error("src/app.js did not expose SITE");

// ---------- assets ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(PUB, OUT, { recursive: true });
const css = read(path.join(SRC, "styles.css"));
const cssFile = `/assets/styles.${hash(css)}.css`;
const jsFile = `/assets/app.${hash(appJs)}.js`;
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
fs.writeFileSync(path.join(OUT, cssFile), css);
fs.writeFileSync(path.join(OUT, jsFile), appJs);

const shell = read(path.join(SRC, "shell.html"));
const PROTO = `<a class="proto" href="/rebrand-notes"><svg aria-hidden="true"><use href="#i-layers"/></svg>Rebrand notes</a>`;

const CLINIC = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: "The Derma Club & Women's Wellness Centre",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og/og-default.jpg`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  telephone: "+1-905-812-8526",
  email: "info@thedermaclub.ca",
  address: { "@type": "PostalAddress", streetAddress: "6005 Erinmills Parkway, Unit 106", addressLocality: "Mississauga", addressRegion: "ON", addressCountry: "CA" },
  areaServed: ["Mississauga", "Oakville", "Brampton"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Thursday"], opens: "10:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Friday"], opens: "10:00", closes: "15:00" }
  ],
  medicalSpecialty: "Dermatology",
  sameAs: ["https://www.instagram.com/thedermacluberinmills", "https://www.facebook.com/thedermacluberinmills"]
};

function faqLd(list) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } }))
  };
}
function crumbsLd(items) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE_URL + url }))
  };
}

const NAV_NAMES = { treatments: "Treatments", about: "About", team: "Our Team", financing: "Financing", shop: "Shop", faq: "FAQ", contact: "Contact", brand: "Rebrand notes" };

function page(key, urlPath) {
  const r = SITE.renderRoute(key);
  const lds = [CLINIC];
  if (key.startsWith("t-")) {
    const t = SITE.bySlug[key.slice(2)];
    lds.push(crumbsLd([["Home", "/"], ["Treatments", "/treatments"], [t.n, urlPath]]));
    lds.push({ "@context": "https://schema.org", "@type": "MedicalProcedure", name: t.n, description: t.b, url: SITE_URL + urlPath });
    lds.push(faqLd(SITE.treatFaqs(t)));
  } else if (key !== "home" && key !== "404") {
    lds.push(crumbsLd([["Home", "/"], [NAV_NAMES[key], urlPath]]));
    if (key === "faq") lds.push(faqLd(SITE.FAQS));
  }
  const noindex = !LIVE || key === "brand" || key === "404";
  const canonical = SITE_URL + (urlPath === "/" ? "/" : urlPath);
  const head = `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${attr(r.title)}</title>
<meta name="description" content="${attr(r.desc)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ""}<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#6B2550">
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Derma Club">
<meta property="og:locale" content="en_CA">
<meta property="og:title" content="${attr(r.title)}">
<meta property="og:description" content="${attr(r.desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE_URL}/og/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600&family=Instrument+Sans:wght@400..700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${cssFile}">
${key === "home" ? '<link rel="preload" as="image" href="/media/photo-hydro.webp">\n' : ""}${lds.map((o) => `<script type="application/ld+json">${json(o)}</script>`).join("\n")}
<script>try{var t=localStorage.getItem("dc-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","ywq79twcsv");</script>
</head>
<body>
`;
  let body = shell
    .replace("{{MAIN}}", () => r.html)
    .replace("{{MEGA}}", () => SITE.megaHTML())
    .replace("{{FOOT_T}}", () => SITE.footHTML())
    .replace("{{PROTO}}", () => (LIVE ? "" : PROTO));
  if (r.nav) body = body.replace(`data-nav="${r.nav}"`, `data-nav="${r.nav}" class="on"`);
  return `${head}${body}<script src="${jsFile}" defer></script>\n</body>\n</html>\n`;
}

function write(urlPath, html) {
  const rel = urlPath === "/" ? "index.html" : urlPath === "/404" ? "404.html" : urlPath.slice(1) + ".html";
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ---------- pages ----------
const routes = Object.entries(SITE.ROUTES).filter(([p, k]) => !(LIVE && k === "brand"));
for (const t of SITE.T) routes.push([`/treatments/${t.s}`, `t-${t.s}`]);
for (const [p, k] of routes) write(p, page(k, p));
write("/404", page("404", "/404"));

// ---------- sitemap + robots ----------
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter(([, k]) => k !== "brand");
fs.writeFileSync(path.join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexable.map(([p]) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, "robots.txt"), LIVE
  ? `User-agent: *\nAllow: /\nDisallow: /rebrand-notes\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  : `# Preview build: search engines are blocked until SITE_INDEXABLE=true\nUser-agent: *\nDisallow: /\n`);

console.log(`Built ${routes.length + 1} pages into dist/ (${LIVE ? "live, indexable" : "preview, noindex"}) for ${SITE_URL}`);
