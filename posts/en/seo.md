---
title: "Search Engines, Ads, and SEO"
date: "2026-03-15"
excerpt: "The boss says our product needs SEO"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["SEO", "SEM", "Keyword Research", "Customer Acquisition", "Influencer Marketing"]
---

In [What Data Should a Product Track](/tech/blog/en/product_analytics#heading-5), I mentioned that SEO belongs to Acquisition, the first step of the [AARRR framework](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026): the stage where you win new customers. That stage also covers running ads, managing social media and other marketing tactics. So why does SEO matter? This post looks at where SEO came from: the business model of search engines, who does and doesn't need SEO, and AEO, which is becoming more important in the AI era. I hope it gives some ideas to startups unsure whether to invest in SEO/AEO, and to the marketers and engineers staring blankly at a boss shouting "Our product needs SEO!"

This is part one of a series. Part two is [Search and Visibility in the AI Era](/tech/blog/en/aeo).

![Acquisition includes SEO](https://res.cloudinary.com/dazoegq66/image/upload/v1791365046/seo/aarrr_acquisition_seo.png)

## SEO and AEO

For search engine makers like Google, [SEO (Search Engine Optimization)](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) is about getting the search engine to show what users actually need. For a website or product, getting found by search engines and ranking near the top means more people see you. It's effectively long-term free advertising.

In recent years, though, the first thing you see after typing a query is no longer the top-ranked pages but an AI-generated summary. Since that feature arrived, [click-through rates on search results have dropped sharply](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/), which points to the next battleground: getting AI to see and favor you. That's what AEO (Answer Engine Optimization) is for.

![Google AI Overview](https://res.cloudinary.com/dazoegq66/image/upload/v1791365178/seo/google_ai_overview_aeo_search.png)

## Search engines

The software industry has largely been driven by big tech companies. Decades ago that meant IBM, Oracle and Microsoft; more recently Facebook, Apple, Amazon and Google. Now OpenAI, Anthropic and others have opened the era of LLMs and AI agents, Google has launched [its own models](https://blog.google/technology/ai/google-gemini-ai/), and Microsoft has [invested in OpenAI](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/) and joined the fight with [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/).

Early search engines weren't very user-friendly. Unless a page paid for ads or passed [human review](https://en.wikipedia.org/wiki/Yahoo!_Directory), users could hardly find what they needed. Google's search engine used **[PageRank](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/)** to rank pages by how they link to each other, so users could find resources that were genuinely useful. Google then launched Google AdWords (later Google Ads), tying ads to search: users see ads as they type their keywords. That became Google's main business model. Its success built Google's software empire and sparked years of Information Retrieval research by competitors and academia. Google is still the king of search today; Yahoo!, Bing and DuckDuckGo come nowhere near its scale (Baidu plays its own game, so it doesn't count...). When we talk about SEO, we're almost always following Google's framework and rules.

| | Google | Bing | Yahoo! |
| --- | --- | --- | --- |
| Global market share (Sep 2026) | [About 90%](https://gs.statcounter.com/search-engine-market-share) | About 5% | About 1.4% |
| Source of results | Own index | Own index, also supplied to Yahoo!, DuckDuckGo and other search engines | Its own crawler Slurp plus [Bing's crawler](https://uk.help.yahoo.com/kb/SLN2213.html) |
| Business model | Search ads targeted by user behavior; ads make up most of parent company Alphabet's revenue | Search ads (Microsoft Advertising), a [side business](https://www.microsoft.com/investor/reports/ar25/index.html) for Microsoft next to Azure and Office | Ads across its portal (news, finance, mail); search ads [in partnership with Microsoft](https://techcrunch.com/2009/07/29/microsoft-yahoo-search-deal-the-official-press-release/) since 2009 |
| AI integration | [AI Overviews and AI Mode](https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/) (Gemini) | [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/) (OpenAI models) | [Yahoo Scout](https://techxplore.com/news/2026-03-yahoo-ai-powered-scout-roots.html) (Anthropic's Claude) |

## Who does and doesn't need SEO

Advertising is a commercial activity that, at scale, **delivers information**, **shapes perception** and **prompts action** among a target audience. If you want to sell something, you'll almost always need it, unless you already have a strong reputation or are famous, or you're a monopoly that doesn't need promotion (like a state-owned utility). So the question usually isn't "should we advertise?" but "which kind of advertising?", and the answer depends on **how your customers usually discover new things**.

### SEO

Users find you through organic rankings when they actively search. The cost is time and content, with almost no direct spending, but results are slow; it usually takes months to see them.

### SEM (Search Engine Marketing)

You pay for keywords. The most common form is PPC (Pay-Per-Click) ads, such as Google Ads. You pay per click and get exposure as soon as you spend, but it stops the moment you stop paying.

### Social media

You build content and a following on platforms like Instagram, Threads and Facebook. The cost is again time and content, and you can buy social ads to speed things up. Results come faster than SEO but slower than SEM.

### Endorsements, influencers, and your own fame

You borrow trust that someone else (or you yourself) has built up. The cost may be an endorsement fee or years of your own work, and if you're well known, it works very fast. Live-stream selling, sponsored content, and celebrities opening their own fashion brands, restaurants or instant noodle lines all fall into this category.

Taiwanese YouTubers 壹加壹 (Lean & ILLY) built their own Traditional Chinese subtitle tool, [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI). They announced it with a single video on their channel, and over a thousand people subscribed within a week. They didn't need SEO; their audience was the acquisition channel. And after more than a decade of making videos, they deeply understood the industry's pain points, which was a key reason the product succeeded.

This path assumes that **you or someone else is already famous**, which usually takes a decade or more to build and isn't something just anyone can copy. Strong personal influence and insight into real pain points often work better than blindly pouring money into SEO.

### Do you need SEO?

The test: will your customers find you through search?

| Case | Need SEO? | Why |
| --- | --- | --- |
| Content sites, blogs, media | Absolutely | Traffic is their lifeblood |
| Regular businesses | Worth doing | Users search directly when they have a problem; local businesses should also maintain a Google Business Profile |
| E-commerce | Yes, usually together with SEM | Product pages need to be found; use ads to fill in when popular keywords are highly competitive |
| Products in a brand-new category | Limited effect | Users don't even know what to search for, so you first need social media and influencers to educate the market |
| Startups | Depends on the stage | While still looking for PMF, the product can change direction at any time and SEO takes months to pay off, so it's better to validate demand with SEM, social media or talking to users directly. Once people are searching for it and the product has stabilized, SEO becomes a worthwhile long-term investment |
| Established brands or creators | Not much special effort needed | The brand name itself is the keyword and naturally ranks first |
| B2B enterprise software | Partly | Decision makers compare options online, but deals mostly close through sales, trade shows and word of mouth |
| SaaS dashboards or in-app pages behind a login | No | Search engines can't crawl them anyway |
| Short-term campaigns and pop-ups | Too slow | SEO takes months to work; SEM or social media is more practical |

## What SEO involves

### Building links

Get external sites to link to you, link your own pages to each other, and [submit a sitemap](https://www.yesharris.com/seo-basic/sitemap-seo/).

### Keyword research

Work out from your site and product positioning what keywords users will use. You can also analyze the market with tools:

- [Ahrefs](https://ahrefs.com/)
- [OpenSEO](https://openseo.so/)

Look at metrics like search volume, competition and search intent (informational, navigational, transactional, commercial investigation). Startups and small sites can start with [long-tail keywords](https://ranking.works/knowledge/%E9%95%B7%E5%B0%BE%E9%97%9C%E9%8D%B5%E5%AD%97/) (for example, "hands-on frontend performance optimization tutorial"), where it's easier to beat big sites.

![](https://res.cloudinary.com/dazoegq66/image/upload/v1791429846/seo/search_demand_curve_long_tail_keywords.png)

### Make sure crawlers understand your site

- Write good page metadata (title, meta)
- Use the right HTML tags (h1, h2, h3, nav, header, footer...)
- Add [JSON-LD](https://seo.lucas-futures.com/glossary/json-ld/)
- Configure [robots.txt](https://frankchiu.io/seo-robots-txt/), and don't block pages you want found
- If you have a lot of duplicate content, set [canonical tags](https://frankchiu.io/seo-canonical-tags/)
- If your site is [CSR](/tech/blog/en/rendering#heading-4), Google's crawler still can't reliably get the full content. If you run a pure content site like a blog or news site, consider [other rendering methods](/tech/blog/en/rendering#heading-10)

### Site performance and Core Web Vitals

Poor site performance also hurts SEO rankings. Core Web Vitals are three metrics for evaluating site performance:

- Largest Contentful Paint (LCP), which measures loading speed
- First Input Delay (FID), which measures interactivity
- Cumulative Layout Shift (CLS), which measures visual stability

Use [PageSpeed Insights](https://pagespeed.web.dev/) to check your site's performance and find what to optimize.

### Make sure content is high quality and solves users' problems

- [E-E-A-T principles](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Don't write articles or stuff odd keywords just to rank
- Don't mass-produce junk content with AI

![iQIYI: The Rap of China ("If it's good, it will stay")](https://res.cloudinary.com/dazoegq66/image/upload/v1791430396/seo/rap_of_china_good_will_stay_meme.png)

### Use AI to fix technical issues

- [claude-seo](https://github.com/AgricIDaniel/claude-seo)
- [seo-skills](https://github.com/seranking/seo-skills)

## Reference

- [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI)
- [從 0 到被 Google 看見:AI 時代的 SEO 生存指南](https://www.youtube.com/watch?v=iE8Byp-mMsc)
- [What are Core Web Vitals (CWV)?](https://www.cloudflare.com/learning/performance/what-are-core-web-vitals/)
