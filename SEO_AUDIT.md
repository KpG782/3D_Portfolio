# SEO Audit

Pre-launch audit for `kenbuilds.tech` based on the current codebase and local build.

This version updates the audit framework to reflect three distinct search surfaces:
- `SEO`: traditional search engine visibility
- `AEO`: answer engine visibility
- `GEO`: generative engine / AI assistant citation visibility

Important limitation:
- this is still a pre-launch audit
- live indexing, real field Core Web Vitals, backlinks, and SERP behavior cannot be fully validated until `kenbuilds.tech` is deployed

---

## Search Model Framing

### SEO — Search Engine Optimization

Goal:
- rank in Google and Bing results
- win clicks from traditional search

This is driven by:
- crawlability
- indexability
- content quality
- internal linking
- authority
- page performance

### AEO — Answer Engine Optimization

Goal:
- get extracted into featured snippets, direct answers, and AI Overviews
- become the answer source, not just another ranking page

This is driven by:
- direct-answer formatting
- FAQ content
- heading clarity
- semantic structure
- concise factual copy
- schema markup

### GEO — Generative Engine Optimization

Goal:
- get cited or recommended in AI-generated responses from ChatGPT, Claude, Perplexity, Google AI experiences, and similar systems

This is driven by:
- clear entity identity
- authoritative public content
- chunkable information architecture
- repeated expertise signals
- strong project proof
- citation-worthy content across multiple surfaces

### What This Means for `kenbuilds.tech`

Current positioning:
- `SEO`: decent baseline
- `AEO`: underdeveloped
- `GEO`: early-stage only

The site now has technical groundwork, but it still does not have enough answer-oriented or citation-oriented content depth to compete strongly beyond standard branded discovery.

---

## 1. Executive Summary

### Overall Score

- `Overall: 74 / 100`

### Score by Search Layer

- `SEO: 76 / 100`
- `AEO: 60 / 100`
- `GEO: 56 / 100`

### Key Strengths

- metadata baseline is now in place:
  - title
  - meta description
  - canonical
  - Open Graph
  - Twitter cards
- crawl files are present:
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
- structured data exists for:
  - `Person`
  - `WebSite`
  - `WebPage`
- image payload has been materially reduced after WebP conversion
- hero and showcase performance were improved
- the portfolio has strong visual differentiation and decent conversion potential

### Top 5 Critical Issues Blocking Growth

1. the site is still a client-rendered SPA, which limits crawl efficiency and semantic extraction compared with prerendered HTML
2. there are no dedicated case study pages, so almost all ranking, answer, and AI-citation value is trapped on one URL
3. the content is still too visual and too thin for strong AEO and GEO performance
4. the site lacks direct-answer sections such as FAQ, definitions, and structured problem/solution blocks
5. authority signals exist in the work itself, but there is not yet enough crawlable proof content for AI systems and search engines to repeatedly cite

---

## 2. Technical SEO Audit

### Indexability

#### Status

Good baseline, but not best-in-class.

Present:
- canonical tag
- `robots.txt`
- `sitemap.xml`
- crawl-allow directives for standard search bots and AI bots

#### Findings

`Critical`
- homepage content still depends on client rendering

Why it matters:
- Google can render JS, but prerendered HTML is still more reliable
- AEO and GEO both benefit when core content is visible without waiting for client execution

Fix:
1. prerender the homepage at build time
2. ensure core text content is visible in raw HTML
3. keep canonical fixed to `https://kenbuilds.tech/`

Impact:
- SEO: high
- AEO: high
- GEO: high

### Crawlability

#### Status

Acceptable for a one-page portfolio, but structurally limited.

#### Findings

`High`
- internal linking depth is minimal because the site is effectively a single landing page with section anchors

Why it matters:
- search engines have fewer crawlable assets
- AI systems have fewer stable public sources to cite

Fix:
1. keep homepage as the central hub
2. add separate URLs for:
   - project case studies
   - specialty pages
   - content articles
3. link those pages from the homepage and footer

Impact:
- SEO: high
- AEO: medium
- GEO: high

`Low`
- no obvious broken static image references remain in the core audited source

### Page Speed & Core Web Vitals

#### Status

Improved, but still performance-sensitive.

#### Positive changes already made

- WebP image conversion
- showcase optimization
- hero runtime optimization
- deferred below-the-fold sections

#### Findings

`High`
- the 3D payload remains the largest technical performance risk

Evidence:
- build output still shows a very large 3D-related chunk

Why it matters:
- can hurt LCP and INP on mobile and slower devices

Fix:
1. defer non-critical 3D code until after first paint
2. isolate heavy 3D modules from the initial route where possible
3. verify production Lighthouse mobile before launch

Impact:
- SEO: high
- AEO: low
- GEO: low

`High`
- homepage semantic content still relies too heavily on the client-side app shell

Fix:
1. prerender hero/about/projects summary content
2. keep visual effects progressive, not content-blocking

Impact:
- SEO: high
- AEO: high
- GEO: high

`Medium`
- hero canvas animation is lighter now, but still adds runtime cost

Fix:
1. keep current optimizations
2. validate low-end mobile behavior
3. reduce particle density further if Lighthouse mobile remains weak

### Mobile Responsiveness

#### Status

Code suggests good responsiveness.

#### Findings

`Low`
- the layout appears thoughtfully responsive across hero and showcase sections

Required validation after launch:
1. Lighthouse mobile
2. real-device manual check
3. modal and CTA interaction testing

### HTTPS / Security

#### Status

No direct issue in source, but production verification is still required.

#### Findings

`Medium`
- live canonical host redirects are not yet validated

Fix:
1. redirect all traffic to `https://kenbuilds.tech/`
2. eliminate duplicate host access from:
   - `http://kenbuilds.tech`
   - `http://www.kenbuilds.tech`
   - `https://www.kenbuilds.tech`

### Structured Data

#### Status

Good baseline, not full coverage.

Present:
- `Person`
- `WebSite`
- `WebPage`

#### Findings

`Medium`
- schema exists, but it is still homepage-level only

Fix:
1. keep current schema
2. add:
   - FAQ schema if FAQ is added
   - project/case-study structured data on future detail pages

Impact:
- SEO: medium
- AEO: high
- GEO: medium

### URL Structure and Routing

#### Status

Clean but too thin.

#### Findings

`High`
- one-page routing means low keyword surface area

Fix:
1. create clean standalone URLs like:
   - `/projects/lexinsight`
   - `/projects/flowfit`
   - `/projects/ars`
   - `/ai-full-stack-engineer`
   - `/react-developer`
   - `/flutter-developer`

Impact:
- SEO: high
- AEO: medium
- GEO: high

---

## 3. On-Page SEO Audit

### Title Tag

#### Current

- `Ken Garcia | AI Full Stack Engineer`

#### Assessment

Good. Slightly stronger with explicit portfolio intent.

#### Recommended Rewrite

- `Ken Garcia | AI Full Stack Engineer Portfolio`

### Meta Description

#### Assessment

Decent baseline, but it can be more click-oriented and more query-aligned.

#### Recommended Rewrite

`Portfolio of Ken Patrick Garcia, an AI Full Stack Engineer building award-winning React, Flutter, Three.js, and AI-powered products for web and mobile.`

### Heading Structure

#### Assessment

Likely adequate visually, but still needs strict semantic discipline.

#### Findings

`Medium`
- hero messaging is strong, but heading hierarchy should be normalized for snippet extraction and AI parsing

Fix:
1. ensure exactly one `H1`
2. ensure all major sections use clear `H2`s
3. use descriptive subheads where useful

Recommended section headings:
- Featured Projects
- Experience
- Tech Stack
- Certifications
- Testimonials
- Contact

### Keyword Usage and Semantic Relevance

#### Current implied targets

- Ken Garcia
- Ken Patrick Garcia
- AI Full Stack Engineer
- React developer
- Flutter developer
- portfolio
- AI-powered products

#### Findings

`Medium`
- visible text is strong for branding, but still weak for query-specific phrasing and answer extraction

Fix:
1. add one explicit entity summary near the hero
2. add one explicit `What I Build` block
3. use natural search language in visible copy

Suggested line:
- `Ken Patrick Garcia is an AI Full Stack Engineer specializing in React, Flutter, AI systems, automation, and interactive web experiences.`

Why this matters:
- SEO needs clearer relevance
- AEO needs direct quotable language
- GEO needs clean entity resolution

### Content Quality

#### Assessment

High design quality, moderate search quality.

#### Findings

`High`
- content is not yet deep enough for competitive global search visibility

Why:
- one-page content is not enough for broad SEO
- answer-ready blocks are missing
- case studies are embedded, not independent assets

Fix:
1. create long-form case study pages
2. add technical breakdowns
3. add measurable outcomes
4. add proof-oriented summaries

This is the highest-value content improvement across:
- SEO
- AEO
- GEO

### Image SEO

#### Positives

- image assets now use WebP
- loading hints improved in key areas

#### Findings

`Low`
- image SEO is not a major weakness now, but OG compatibility should improve further

Fix:
1. keep descriptive alt text
2. add PNG OG image fallback for maximum social compatibility
3. keep project thumbnails descriptive and relevant

---

## 4. Content Strategy Evaluation

### Primary Keywords the Site Is Currently Targeting

- Ken Garcia
- Ken Patrick Garcia
- AI Full Stack Engineer
- React developer portfolio
- Flutter developer portfolio
- Three.js portfolio

### Keyword Gaps vs Competitors

Likely missing:
- `AI engineer portfolio`
- `full stack engineer portfolio`
- `React portfolio case study`
- `Flutter developer portfolio`
- `RAG engineer portfolio`
- `AI automation engineer`
- `software engineer Philippines portfolio`

Answer-style and generative search gaps:
- `who is Ken Garcia`
- `what does Ken Garcia build`
- `Ken Garcia tech stack`
- `Ken Garcia portfolio projects`
- `best AI full stack engineer portfolio`
- `award-winning developer portfolio`

### Top 10 Content Opportunities Ranked by ROI

1. `LexInSight` case study page
2. `FlowFit` case study page
3. `ARS` case study page
4. `Pacebeats` case study page
5. `/ai-full-stack-engineer` specialty page
6. `/react-developer` specialty page
7. `/flutter-developer` specialty page
8. article: `How I build AI-powered full-stack applications`
9. article: `How I optimized a 3D React portfolio for performance`
10. article: `What recruiters should look for in an AI full-stack engineer`

---

## 5. AI Search / LLM Optimization

### Current State

Baseline exists, but it is not enough yet.

Present:
- structured data
- clear identity in metadata
- `llms.txt`

Important note:
- `llms.txt` helps with discoverability and clarity, but it does not replace authoritative public content

### Findings

`High`
- content is still not chunk-rich enough for AI retrieval

Why:
- AI systems prefer self-contained sections
- current portfolio is still optimized more for visual impression than for answer extraction

### Improvements Needed

#### A. Add FAQ Section

Recommended questions:
- Who is Ken Patrick Garcia?
- What technologies does Ken Garcia specialize in?
- What kind of AI and full-stack products has he built?
- Is Ken Garcia available for freelance or full-time work?
- What awards or recognitions has he received?

Primary effect:
- AEO improvement
- GEO improvement

#### B. Improve Entity Clarity

Make sure the homepage explicitly states:
- full name
- role
- location
- specialties
- industries/project categories

This is necessary because AI systems perform better when they can resolve:
- person
- capabilities
- proof
- domains of expertise

#### C. Improve Chunkability

For each featured project, use a repeatable structure:
- Problem
- Solution
- Stack
- Role
- Outcome

Do not rely on visual cards alone for important meaning.

#### D. Add Recruiter-Oriented Summaries

Recommended format:
- `Best for: AI web apps, mobile apps, React interfaces, Flutter products, RAG systems, and performance-focused frontends.`

This helps both:
- traditional search
- AI assistants answering recommendation queries

### AEO Assessment

- `AEO Score: 60 / 100`

Strengths:
- metadata baseline
- schema baseline
- sectioned homepage

Weaknesses:
- no FAQ
- little direct-answer copy
- limited snippet-targeted formatting
- weak definition-style content

### GEO Assessment

- `GEO Score: 56 / 100`

Strengths:
- real projects
- awards and proof signals
- entity metadata
- `llms.txt`

Weaknesses:
- no content moat
- no standalone case studies
- limited public citation surface
- not enough reusable technical writing

### Best Improvements for AI Search Systems

- add FAQ block
- add explicit entity paragraph
- create case study pages
- publish technical explainers
- use short, answer-ready blocks
- make outcomes and specialties explicit

---

## 6. Backlink & Authority Analysis

### Domain Authority Estimate

Pre-launch estimate:
- `Low`

Reason:
- authority comes from live mentions, backlinks, brand demand, and repeated citations

### Backlink Profile Quality

Not auditable from the codebase alone pre-launch.

### Best Authority Building Moves

- publish GitHub-linked case studies
- write technical posts on DEV and Medium
- document award-winning projects publicly
- get mentions from:
  - hackathons
  - academic showcases
  - project communities
  - collaborators
  - product/demo listings

Best GEO authority moves:
- publish referenceable technical content
- create pages others can cite
- ensure your name repeatedly appears next to your specialties across the public web

---

## 7. Conversion Optimization

### CTA Clarity

Current direction is decent but still mixed.

#### Findings

`Medium`
- CTAs balance exploration and branding, but recruiter/client intent could be stronger

Fix:
- add stronger action paths such as:
  - `Hire Me`
  - `View Case Studies`
  - `Book a Call`
  - `Download Resume`

### UX Flow

#### Assessment

Strong visual experience. Scroll flow is improved.

#### Risk

- visual flair can still overshadow qualification clarity for high-intent visitors

Fix:
1. keep visual identity
2. strengthen proof summaries
3. reduce ambiguity in who you help and what you build

### Trust Signals

#### Positives

- awards
- testimonials
- technical range
- project breadth

#### Improvements

- show more measurable outcomes
- clarify ownership on each project
- add dates and context to awards

This also helps AEO and GEO because AI systems quote proof more reliably than generic claims.

### Case Study Strength

#### Current

Weak from both SEO and conversion perspectives because case studies are not standalone.

#### Fix

- create dedicated pages for top projects
- include:
  - challenge
  - constraints
  - architecture
  - role
  - outcome
  - screenshots

---

## 8. Performance & Scaling Recommendations

### A. Quick Wins

Can implement in less than one day:

- add PNG OG image fallback
- tighten title and meta description
- add FAQ section
- add explicit entity paragraph in hero/about
- add `What I Build` summary section
- verify `kenbuilds.tech` in Search Console and Bing
- submit sitemap
- confirm canonical host redirects

### B. Mid-Term Improvements

Can implement in one to two weeks:

- prerender homepage
- create first two case study pages
- add FAQ schema if FAQ is added
- improve internal linking structure
- track CTA events in analytics
- build reusable case study template:
  - challenge
  - stack
  - architecture
  - results
  - lessons learned

### C. Long-Term Strategy

- build project-specific landing pages
- publish technical content regularly
- build backlinks through GitHub, DEV, Medium, and award/project mentions
- create a durable content moat around:
  - AI engineering
  - React performance
  - Flutter architecture
  - real-world product building

Long-term GEO strategy:
- publish enough public expertise that AI systems repeatedly encounter your name and specialties together

---

## 9. Monitoring & Tooling

### Recommended Tools

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

### Metrics To Track

- organic impressions
- branded clicks
- non-branded clicks
- CTR
- indexed pages
- LCP
- CLS
- INP
- contact submissions
- resume requests
- clicks to GitHub / LinkedIn / project demos

Also track by search layer:

- SEO:
  - impressions
  - rankings
  - CTR
- AEO:
  - snippet capture
  - AI Overview visibility where measurable
- GEO:
  - assistant citations
  - mentions in AI-generated responses
  - branded mention frequency over time

---

## 10. Final Action Plan

### Week 1

- launch on canonical `https://kenbuilds.tech/`
- verify domain in Search Console and Bing
- submit sitemap
- confirm robots, sitemap, llms, and canonical are live
- add PNG OG image fallback
- add explicit entity statement
- add FAQ block
- add `What I Build` summary block

### Week 2–4

- build first 2 case study pages
- improve heading hierarchy and internal links
- rewrite key sections to answer:
  - who you are
  - what you build
  - who you help
  - which stack you use
  - what outcomes you deliver
- run PageSpeed and Lighthouse on production
- validate social previews and resolve any cache issues

### Month 2+

- prerender or SSR the homepage
- expand into project and specialty pages
- publish technical content
- build backlinks and brand mentions
- track search performance and refine based on Search Console data
- evolve from one strong homepage into a true content/entity graph

---

## Priority Summary

Highest priority:

1. prerender homepage
2. create case study pages
3. add FAQ + entity clarity
4. verify live indexing and canonical behavior
5. strengthen branded and non-branded content coverage

### Final Strategic Note

For this portfolio, the correct strategy is not:
- `SEO or AEO or GEO`

It is:
- `SEO first for discoverability`
- `AEO next for answer extraction`
- `GEO as the long-term authority moat`

If `kenbuilds.tech` remains a visually impressive one-page portfolio only, it can still underperform in AEO and GEO.

If it evolves into:
- a crawlable homepage
- case study pages
- answer-oriented sections
- technical thought leadership

then it can compete meaningfully across all three search layers.
