# Cabinet Av. Maria Popescu — Static Website

A polished, SEO-optimized static website for a Romanian female lawyer's practice, hosted on **GitHub Pages**. Plain HTML/CSS/JS — no build step, no framework, no dependencies. Loads fast, ranks well, ages gracefully.

**Highlights**

- Fully **bilingual** (Romanian + English) with proper `hreflang` tags so Google serves the right version to each user
- **SEO-ready out of the box**: meta descriptions, Open Graph, Twitter Cards, JSON-LD structured data (LegalService + LocalBusiness + Attorney + Person schemas), sitemap, robots, custom 404
- **Editorial design**: Cormorant Garamond serif + Manrope sans, deep forest green palette with brass accents — distinctive without being eccentric
- **Responsive** from 320px to 4K, with mobile menu
- **Accessibility**: semantic HTML, ARIA labels, keyboard navigation, `prefers-reduced-motion` support
- Lighthouse 95+ achievable on all four scores (Performance, Accessibility, Best Practices, SEO)
- A working contact form via Formspree (free tier, 50 submissions/month)

---

## File structure

```
website/
├── index.html              ← Romanian home (default)
├── despre.html             ← Romanian about
├── servicii.html           ← Romanian services
├── contact.html            ← Romanian contact (with form)
├── en/
│   ├── index.html         ← English home
│   ├── about.html         ← English about
│   ├── services.html      ← English services
│   └── contact.html       ← English contact (with form)
├── assets/
│   ├── styles.css         ← all styles, design system
│   └── script.js          ← mobile menu + scroll reveals
├── 404.html               ← custom not-found page
├── sitemap.xml            ← XML sitemap with hreflang
├── robots.txt             ← search engine instructions
├── CNAME                  ← custom domain config (GitHub Pages)
└── README.md              ← this file
```

---

## 1. Customization — replace the placeholders

The site is fully populated with realistic placeholders so it looks complete out of the box. To make it yours, **search and replace** these strings across **all `.html`, `.xml`, and `CNAME` files**:

| Find | Replace with | Notes |
|---|---|---|
| `Maria Popescu` | The lawyer's full name | Used in body, footer, schema |
| `Av. Maria Popescu` | `Av. <FullName>` | Romanian title prefix |
| `București` | Her actual city | Romanian pages |
| `Bucharest` | Same city in English | English pages |
| `Sector 1` | Actual district / sector | If applicable |
| `Str. Exemplu nr. 1` | Actual street address | |
| `010001` | Actual postal code | |
| `+40 712 345 678` | Actual phone (display format) | With spaces |
| `+40712345678` | Same phone (clean format) | In `tel:` links + schema |
| `contact@avocat-popescu.ro` | Actual email | |
| `avocat-popescu.ro` | Actual domain | In URLs, sitemap, CNAME |
| `Baroul București` | Her actual bar | E.g. Baroul Cluj |
| `Bucharest Bar Association` | Same in English | |
| `2015` | Year admitted to the bar | Update across pages |
| `2014` | Year of LL.B. graduation | |
| `2017` | Year of master's | |
| `2019` | Year of mediator certification | |
| `2021` | Year of specialized training | |
| `2024` | Year of association membership | |
| `RO00000000` | Actual CUI (tax ID) | Footer |
| `10+` | Actual years of experience | Hero stats |
| `350+` | Actual cases handled (estimate) | Hero stats |
| `44.4268` | Actual latitude | JSON-LD geo |
| `26.1025` | Actual longitude | JSON-LD geo |

**Tip:** Open the folder in VS Code and use **Search → Replace in Files** (`Ctrl/Cmd + Shift + H`) — it's the fastest way to swap everything in one pass. Always tick "Match Case" so you don't change "Sector" to "sector" accidentally.

After replacing, also **check these pages for content that may not apply** and edit/remove as needed:

- `despre.html` & `en/about.html` → the four bio paragraphs are templated and need to match her real story
- `servicii.html` & `en/services.html` → if she doesn't practice one of the six areas, **delete that entire `<article>` block** (and update the home page's services preview to match)

---

## 2. Set up the contact form (Formspree)

The contact forms (`contact.html` and `en/contact.html`) submit to Formspree, which forwards submissions to the lawyer's email — no backend or server required.

1. Go to **[formspree.io](https://formspree.io)** and create a free account using the lawyer's email address.
2. Create a new form (free plan allows 50 submissions/month — plenty for a lawyer's site).
3. Formspree gives you a form endpoint URL that looks like `https://formspree.io/f/abcd1234`.
4. In **both** `contact.html` and `en/contact.html`, find this line:
   ```html
   <form class="form-card" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
   Replace `YOUR_FORM_ID` with the actual form ID (e.g. `abcd1234`).
5. The first submission will be sent to Formspree to verify the email — the lawyer needs to click a confirmation link. After that, submissions arrive in her inbox automatically.

The form already has a **honeypot field** (`_gotcha`) for spam protection — Formspree's default convention. No extra setup needed.

---

## 3. Add the lawyer's photo

There are two places in the site where a portrait photo appears — currently shown as a green placeholder card. To add a real photo:

1. Crop a **professional photo** to a vertical aspect ratio (3:4 or 4:5 works best). Recommended size: 800×1000 pixels, saved as `portrait.jpg` (or `.webp` for better performance).
2. Copy the file into the `assets/` folder.
3. In `index.html` (Romanian home), find this block in the hero:
   ```html
   <div class="hero-portrait-placeholder" aria-hidden="true">
     ... (svg icon + text) ...
   </div>
   ```
   Replace it with:
   ```html
   <img src="assets/portrait.jpg" alt="Av. Maria Popescu, avocat în Baroul București" />
   ```
4. Do the same in `en/index.html` (the `src` path stays the same because the CSS handles positioning).
5. In `despre.html`, the placeholder is inside `<div class="about-image">` — replace it the same way:
   ```html
   <img src="assets/portrait.jpg" alt="Av. Maria Popescu" />
   ```
6. Same in `en/about.html`.

**The CSS already handles** image positioning (`object-fit: cover`) so any reasonable photo will look good.

---

## 4. Add a social-share image (Open Graph)

When someone shares a link to the site on Facebook, LinkedIn, WhatsApp, etc., a preview card appears. Right now the meta tags reference `assets/og-image.jpg` — that file doesn't exist yet.

1. Create a **1200×630 pixel image** (the exact ratio social platforms expect). Recommended content: the lawyer's name in elegant serif type + a tagline, on the forest-green brand color. Free tools: [Canva](https://canva.com), [Figma](https://figma.com).
2. Save as `assets/og-image.jpg` (under 200 KB if possible).
3. No code changes needed — the meta tags in every page already point to it.

Test how it looks using [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) after the site is live.

---

## 5. Deploy to GitHub Pages

This is the **simplest deployment path** — free, secure (HTTPS), fast (Fastly CDN), and zero ongoing maintenance.

### Step-by-step

1. **Create a free GitHub account** at [github.com](https://github.com) if she doesn't have one. Pick a professional username (it shows up in the default URL).
2. Click the **+ icon → New repository**.
   - Name: anything (e.g. `website` or `maria-popescu-law`)
   - Visibility: **Public** (required for free GitHub Pages)
   - Don't add a README, .gitignore, or license — leave it empty.
3. Upload the website files:
   - Click **uploading an existing file** on the new empty repo page
   - Drag the **contents** of the `website/` folder (not the folder itself) into the upload area
   - Commit with a message like "initial site"
4. Go to **Settings → Pages** (left sidebar).
5. Under **Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
6. Wait 1–2 minutes. The site will be live at `https://<username>.github.io/<repo-name>/`.

> ⚠️ **Important about paths.** All the links in the site use **absolute paths** like `/despre.html` and `/assets/styles.css`. These work perfectly when the site is on a **custom domain** at the root (e.g. `avocat-popescu.ro/despre.html`). They will **break** on `username.github.io/reponame/` because everything lives one folder deep.
>
> **The fix:** use a custom domain (see step 6 below). This is the recommended path anyway — it's more professional than `username.github.io/...` for a lawyer's business.

---

## 6. Connect a custom domain (.ro)

A `.ro` domain costs around 10–25 EUR/year and makes the site look professional.

### a) Buy the domain

Use any RoTLD-accredited Romanian registrar:
- [Hostico](https://hostico.ro)
- [ROMARG](https://www.romarg.ro)
- [Pavel.ro](https://www.pavel.ro)
- Or any international registrar that sells `.ro` (Namecheap, Porkbun — slightly cheaper, but the Romanian ones may have better local support)

### b) Edit the CNAME file

Open `CNAME` in your repo and replace `avocat-popescu.ro` with the actual domain (no `https://`, no `www.`, just `domain.ro`). Commit the change.

### c) Configure DNS at the registrar

In the registrar's DNS panel, add these records:

**A records** (for the root domain, e.g. `avocat-popescu.ro`):
| Type | Name | Value |
|---|---|---|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

**CNAME record** (for `www`):
| Type | Name | Value |
|---|---|---|
| CNAME | www | `<username>.github.io` |

DNS propagation can take up to a few hours (sometimes 24h).

### d) Configure in GitHub

1. Back in **Settings → Pages**, type the custom domain in the **Custom domain** field and click **Save**.
2. Wait for the DNS check to pass (green checkmark — usually a few minutes).
3. **Tick "Enforce HTTPS"** once it becomes available. This forces all traffic over secure connections.

The site will now be live at `https://avocat-popescu.ro` (or whatever the actual domain is).

---

## 7. SEO — first 30 days after launch

Doing these things will dramatically accelerate Google rankings for local searches like *"avocat București"* or *"divorce lawyer Bucharest"*:

### Mandatory

1. **Google Search Console** — go to [search.google.com/search-console](https://search.google.com/search-console), add the domain, verify ownership (DNS TXT record is easiest), then submit `https://avocat-popescu.ro/sitemap.xml` under **Sitemaps**. Google will start indexing within days.

2. **Google Business Profile** (the single biggest local SEO lever for a lawyer) — go to [google.com/business](https://www.google.com/business), claim the practice, fill in **everything**: name, address, phone, hours, photos, description, services. Google will verify the address by sending a postcard (1–2 weeks). Once verified, the practice appears in **Google Maps** and the "local pack" at the top of search results.

3. **Bing Webmaster Tools** — same as Search Console, for Bing/Yahoo: [bing.com/webmasters](https://www.bing.com/webmasters). Small audience but still worth it for legal queries.

### High-value backlinks

These count more than dozens of low-quality ones:

- **Baroul București / her local bar's website** — many bars have a public lawyer directory. Ask them to link to her site.
- **avocatura.com** — Romania's leading legal directory. Free listing.
- **juridice.ro** — legal news + directory.
- **Pagini Aurii** (Yellow Pages Romania) — free listing.

### Optional but recommended

- **Schema validation** — run the site through [search.google.com/test/rich-results](https://search.google.com/test/rich-results) to confirm the JSON-LD schemas are parsed correctly.
- **PageSpeed** — test at [pagespeed.web.dev](https://pagespeed.web.dev) and aim for 90+ on mobile (the portrait image is the most likely culprit if scores drop).

---

## 8. Performance tips

The site is already very fast (no JS framework, minimal CSS, fonts loaded asynchronously). To squeeze out more speed:

- **Optimize the portrait photo** before uploading — convert to **WebP** at 800px wide, target under 80 KB. Use [squoosh.app](https://squoosh.app) (free, browser-based).
- **Same for the OG image** — JPEG at 80% quality, under 200 KB.
- **Cloudflare in front of GitHub Pages** (optional, free): add the domain to a free Cloudflare account, change the nameservers, and you get an extra CDN layer + caching + bot protection. Usually overkill for a lawyer's site but a nice-to-have.

---

## 9. Editing in the future

The site has no build step. To make changes:

- **Text edits** → open the relevant `.html` file in any text editor, edit, save, push to GitHub. The site updates within seconds.
- **Design tweaks** → all colors, fonts, and spacing live as CSS variables at the top of `assets/styles.css`. Change one value, everything updates.
- **New page** → duplicate an existing page (e.g. `despre.html`), edit the content and the `<title>`/`<meta description>`/`<link rel="canonical">` tags, then add it to `sitemap.xml`.
- **New language** → duplicate the whole site into a new folder (e.g. `/de/` for German), translate, add `hreflang` tags pointing to it from every page, add to sitemap.

---

## 10. What only she can verify

Before going live, the lawyer should read through and confirm/edit:

- **The four bio paragraphs** in `despre.html` and `en/about.html` — they're written in her voice but should reflect her actual journey and philosophy.
- **The "Education & Career" timeline** — years and labels need to match her real CV.
- **The six practice areas** — she may not practice all six, or may want different ones (e.g. criminal law, tax law). Remove or replace as needed, and update the home page services preview to match.
- **Office hours, address, phone, email, CUI** — these need to be exact.
- **The lat/long coordinates** in the JSON-LD schema — useful for Google Maps. Get them by right-clicking her office on Google Maps and copying the first number pair.

---

## Questions?

This site is a static HTML/CSS/JS package. If something breaks, validate the HTML at [validator.w3.org](https://validator.w3.org/) — most issues are unclosed tags or typos.

For Formspree issues, see [help.formspree.io](https://help.formspree.io).

For GitHub Pages issues, see [docs.github.com/en/pages](https://docs.github.com/en/pages).

Good luck with the launch.
