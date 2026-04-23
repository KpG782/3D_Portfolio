# SEO Plan

Pre-launch SEO execution plan for `kenbuilds.tech`.

This document is split into two phases:
- `Observe First`: verify what exists, establish baselines, and avoid blind changes.
- `Improve Next`: implement the highest-impact fixes for technical SEO, AI search visibility, and portfolio conversion.

## 1. Goals

- Increase visibility for searches related to:
  - `AI full stack engineer portfolio`
  - `React developer portfolio`
  - `Flutter developer portfolio`
  - `Three.js portfolio`
  - `Ken Garcia`
  - `Ken Patrick Garcia`
- Make the site easy to crawl, index, and understand.
- Improve recruiter and client conversion from portfolio traffic.
- Make content easier for AI search systems and LLM retrieval to parse.

## 2. Observe First

Do these before making more SEO changes.

### 2.1 Launch Baseline

- Confirm production domain resolves correctly:
  - `https://kenbuilds.tech`
  - `https://www.kenbuilds.tech`
- Force one canonical version only.
- Confirm HTTPS is valid and there are no mixed-content requests.
- Verify `robots.txt`, `sitemap.xml`, `llms.txt`, and canonical tags are live on production.

### 2.2 Crawl Verification

- Check:
  - `https://kenbuilds.tech/robots.txt`
  - `https://kenbuilds.tech/sitemap.xml`
  - `https://kenbuilds.tech/llms.txt`
- Confirm homepage returns `200`.
- Confirm no accidental `noindex` or blocked assets.
- Validate that main sections are discoverable in rendered HTML.

### 2.3 Search Console + Bing Setup

- Add domain property in Google Search Console.
- Add site to Bing Webmaster Tools.
- Submit sitemap in both platforms.
- Monitor:
  - indexed pages
  - crawl errors
  - mobile usability
  - Core Web Vitals

### 2.4 Performance Baseline

Run these on production after launch:
- Google PageSpeed Insights
- Lighthouse mobile + desktop
- WebPageTest

Track:
- LCP
- CLS
- INP
- TTFB
- total JS payload

Current known risk:
- large 3D bundle and client-rendered rendering path may limit SEO and performance ceiling.

### 2.5 SERP Baseline

Search and record results for:
- `Ken Garcia`
- `Ken Patrick Garcia`
- `kenbuilds`
- `AI full stack engineer portfolio`
- `React Flutter AI engineer portfolio`

Track:
- whether the site appears
- title shown by Google
- meta description shown by Google
- favicon presence
- social preview quality when shared

## 3. Current State Summary

Already implemented in this repo:
- canonical tag
- meta description
- robots directives
- Open Graph tags
- Twitter tags
- JSON-LD structured data
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `site.webmanifest`
- compressed WebP image assets
- improved hero and showcase performance path

Still likely missing or weak:
- production verification in search engines
- portfolio-specific case study pages
- FAQ content for AI retrieval
- stronger keyword-targeted copy
- server-side rendering or prerendering
- dedicated OG image PNG fallback for maximum social compatibility

## 4. Improve Next

Prioritize these in order.

### 4.1 Critical Technical Improvements

#### A. Add prerendering or SSR for the homepage

Why:
- current Vite SPA setup limits crawl quality and content extraction compared to prerendered HTML.

Recommended options:
- add a prerender build step for `/`
- migrate to a framework with prerendering/SSR if portfolio growth becomes important

Success criteria:
- homepage content is visible in raw HTML, not only after client JS executes.

#### B. Add OG PNG fallback

Why:
- some platforms handle PNG more reliably than SVG for social previews.

Action:
- create `public/og-image.png`
- point `og:image` and `twitter:image` to PNG
- keep SVG only if needed internally

#### C. Ensure single canonical host

Action:
- redirect all of these to one version:
  - `http://kenbuilds.tech`
  - `http://www.kenbuilds.tech`
  - `https://www.kenbuilds.tech`
- canonical target should be:
  - `https://kenbuilds.tech/`

### 4.2 On-Page Improvements

#### A. Strengthen title and description targeting

Current title is decent, but can be more search-targeted.

Recommended homepage title:
- `Ken Garcia | AI Full Stack Engineer Portfolio`

Recommended meta description:
- `Portfolio of Ken Patrick Garcia, an AI Full Stack Engineer building award-winning React, Flutter, Three.js, and AI-powered products for web and mobile.`

#### B. Tighten heading hierarchy

Action:
- ensure there is exactly one clear `H1`
- use descriptive `H2`s for:
  - Featured Projects
  - Experience
  - Tech Stack
  - Certifications
  - Testimonials
  - Contact

#### C. Add keyword-relevant supporting copy

Action:
- include plain-English keyword phrases naturally in visible text:
  - AI full stack engineer
  - React developer
  - Flutter developer
  - portfolio
  - web and mobile applications
  - AI systems / RAG / automation

Avoid stuffing. Use concise, high-signal copy.

### 4.3 AI Search / LLM Optimization

#### A. Add FAQ section

Add a short FAQ block near the bottom of the homepage with questions like:
- Who is Ken Garcia?
- What technologies does Ken Garcia specialize in?
- What kind of projects has Ken Garcia built?
- Is Ken Garcia available for freelance or full-time work?
- What is Ken Garcia’s experience in AI and full-stack development?

Why:
- helps AI Overviews, assistants, and retrieval systems extract direct answers.

#### B. Add clearer entity statements

Action:
- make sure the homepage explicitly states:
  - full name
  - role
  - location
  - specialties
  - industries/projects worked on

Suggested sentence:
- `Ken Patrick Garcia is an AI Full Stack Engineer from the Philippines specializing in React, Flutter, AI systems, automation, and interactive web experiences.`

#### C. Create chunk-friendly sections

Action:
- keep each section semantically clean
- use short headings
- use short paragraphs
- add project summaries with:
  - problem
  - solution
  - stack
  - impact

### 4.4 Content Expansion

Highest ROI additions:

#### A. Dedicated project case study pages

Create separate pages for:
- ARS
- FlowFit
- Pacebeats
- LexInSight

Each page should include:
- problem
- role
- stack
- architecture
- outcome
- screenshots
- lessons learned

This is one of the strongest SEO and conversion upgrades available.

#### B. Add experience / services pages

Potential pages:
- `/ai-full-stack-engineer`
- `/react-developer`
- `/flutter-developer`
- `/projects`

These create keyword-targeted landing surfaces beyond the homepage.

#### C. Start technical writing

Best blog topics:
- building AI-powered full-stack apps
- React performance optimization
- Flutter architecture decisions
- RAG systems for real products
- lessons from award-winning hackathon projects

## 5. Conversion Improvements

SEO traffic is not enough. This portfolio must convert.

### 5.1 CTA Improvements

Current CTA set is usable, but strengthen recruiter intent.

Recommended CTA labels:
- `View Case Studies`
- `Hire Me`
- `Book a Call`
- `Download Resume`

### 5.2 Trust Signals

Add more concrete proof:
- project metrics
- awards with dates
- responsibilities per project
- outcome-focused summaries
- logos where relevant

Good examples:
- `Top 10 finalist out of 53 entries`
- `Hackathon champion in 5 days`
- `Built with React, Flutter, and AI integrations`

### 5.3 Contact Friction

Action:
- make sure contact section is easy to reach
- include email, LinkedIn, and direct recruiter CTA
- consider adding:
  - `Available for freelance and full-time roles`

## 6. Quick Wins

Implement in less than one day:

- Verify production domain in Search Console and Bing Webmaster Tools
- Submit sitemap
- add OG PNG
- confirm canonical host redirects
- add FAQ section to homepage
- strengthen homepage title and description
- add explicit entity statement in hero/about copy
- test social preview in:
  - LinkedIn Post Inspector
  - Facebook Sharing Debugger
  - X Card Validator alternatives

## 7. Mid-Term Improvements

Implement in one to two weeks:

- prerender homepage
- create first 2 case study pages
- add FAQ schema if FAQ section is added
- add project schema or creative-work schema where appropriate
- improve internal linking from homepage to case studies
- add analytics events for CTA tracking

## 8. Long-Term Strategy

Implement over month 2+:

- publish technical blog content consistently
- build backlinks through:
  - GitHub projects
  - DEV / Medium posts
  - guest posts
  - conference / hackathon / award mentions
  - product community showcases
- build branded search demand around `Ken Garcia` and `kenbuilds`

## 9. Metrics To Track

Track weekly:

- impressions
- clicks
- average CTR
- branded keyword ranking
- non-branded keyword ranking
- indexed pages
- LCP / CLS / INP
- contact submissions
- resume requests
- outbound clicks to LinkedIn / GitHub / project demos

## 10. Recommended Tooling

- Google Search Console
- Bing Webmaster Tools
- Google Analytics 4
- Microsoft Clarity
- PageSpeed Insights
- Lighthouse
- WebPageTest
- Ahrefs or Semrush
- Rich Results Test
- Schema Markup Validator

## 11. Launch Checklist

- [ ] Domain resolves at `https://kenbuilds.tech/`
- [ ] One canonical host only
- [ ] `robots.txt` live
- [ ] `sitemap.xml` live
- [ ] `llms.txt` live
- [ ] canonical tag correct
- [ ] OG image loads correctly
- [ ] homepage title + meta verified
- [ ] Search Console property verified
- [ ] Bing Webmaster Tools property verified
- [ ] PageSpeed tested on production
- [ ] social previews tested

## 12. Suggested Next Implementation Order

1. Launch on canonical domain and verify crawl files.
2. Add OG PNG fallback.
3. Add FAQ section and stronger entity copy.
4. Prerender homepage.
5. Build case study pages for top projects.
6. Start publishing technical content and earning backlinks.
