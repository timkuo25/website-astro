---
title: "Search and Visibility in the AI Era"
date: "2026-03-16"
excerpt: "Why the AI that confessed its love lost"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["AEO", "GEO", "AI Search", "Zero-Click Search", "RAG"]
---

This is the sequel to [Search Engines, Ads, and SEO](/tech/blog/en/seo).

## The AI that couldn't go online

You may remember that when ChatGPT launched at the end of 2022, it couldn't get the latest information from the web. Ask it about recent events and it would only say its knowledge stopped in 2021. That point in time is called the [knowledge cutoff](https://en.wikipedia.org/wiki/Knowledge_cutoff). An LLM answering with data from the web is one form of [RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/).

### So why not let it go online from the start?

We can guess at a few reasons (not confirmed by OpenAI or Google):

- **OpenAI didn't have its own search engine yet**: At the end of 2021 there was [WebGPT](https://arxiv.org/abs/2112.09332), where GPT-3 operated a browser by itself to answer questions, but it was still just research
- **Web content is uncontrollable**: Pages can contain misinformation, or even malicious instructions aimed at AI ([prompt injection](https://en.wikipedia.org/wiki/Prompt_injection))
- **Copyright**: ChatGPT's Browse with Bing was [paused](https://siliconangle.com/2023/07/04/openai-suspends-chatgpt-browsing-feature-alleged-paywall-bypass-concerns/) in July 2023 after users found they could get it to print entire paywalled articles
- **Google didn't dare either**: Google's reputational risk from wrong answers is far greater than anyone else's. Bard, rushed out later, got a question about the [James Webb Space Telescope](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope) wrong in a promo video, and Alphabet [lost $100 billion in market value](https://www.cnn.com/2023/02/08/tech/google-ai-bard-demo-error) in a day. On top of that, when AI gives the answer directly, **users stop clicking links**, which would wreck Google's own search ads

### AI goes online

In February 2023 Microsoft launched [Bing Chat](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/), an AI that could go online. ChatGPT added browsing through plugins in March that year, and launched ChatGPT Search at the end of 2024.

Competitors forced Google to [launch AI Overviews in May 2024](https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/). Google put ads inside the AI summaries, solving the problem of users not clicking through to pages, and saw search volume grow as well. Overall, Google won but website traffic lost, and that's why websites need to start doing AEO.

### Where each AI's search results come from

Almost every mainstream AI can go online now, but where the search results come from differs between them, and that affects whether AI will see your site.

| | Developer | Highlights | Source of search results |
| --- | --- | --- | --- |
| ChatGPT | OpenAI | The first AI chatbot to go mainstream; launched ChatGPT Search at the end of 2024. Ranks first for search-grounded answers in [Search Arena](https://arena.ai/leaderboard/search) | Its own crawler [OAI-SearchBot](https://www.searchengineworld.com/tracking-openai-chatgpt-bots-a-fresh-guide-for-webmasters-site-owners-and-seos), plus partner search providers such as Bing |
| Gemini | Google | Integrates with Gmail, Docs and other Google services. Ranks first for general chat in [Text Arena](https://arena.ai/leaderboard/text) | [Google Search](https://ai.google.dev/gemini-api/docs/google-search) |
| Claude | Anthropic | Only [added search](https://claude.com/blog/web-search) in March 2025, yet half of Search Arena's top ten are Claude models; especially strong at coding and [agent](https://arena.ai/leaderboard) tasks | Its own crawler [Claude-SearchBot](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/); its third-party search provider isn't officially disclosed, but [Brave Search](https://finance.yahoo.com/news/anthropic-appears-using-brave-power-170703042.html) is on its subprocessor list |
| Copilot | Microsoft | Formerly Bing Chat, one of the first AIs to go online, yet [it didn't win despite going first](#heading-9). Integrates with Windows, Edge and Office, so it's the easiest to reach in a corporate environment | Bing |

> Rankings come from blind user votes on [Arena](https://arena.ai/leaderboard): Text Arena data is from October 2026, Search Arena from August 2026. Models update quickly and rankings reshuffle every few months. I may write another post comparing each company's AI ecosystem.

### Data sources

- **Your own search engine** (Gemini, Copilot)
  - Pros: The largest, freshest index, and Google and Bing have twenty-plus years of experience judging which sites are trustworthy and filtering out content farms
  - Cons: Only companies already running a search engine can do this
- **Someone else's search engine** (Claude with Brave Search, ChatGPT with Bing)
  - Pros: No need to build an index; you get full search capability right away
  - Cons: Your lifeline is in someone else's hands. Microsoft [shut down the Bing Search APIs](https://www.windowscentral.com/software-apps/browsing/bing-search-apis-to-be-decommissioned-completely) in August 2025, leaving only customers with long-term contracts. And since Google has Gemini and Microsoft has Copilot, getting data from them means getting it from competitors. That's why a search engine like Brave, which [has its own index](https://techcrunch.com/2023/04/28/brave-search-doesnt-use-bings-index-anymore/) and doesn't build large models itself, is one of the few neutral options
- **Crawlers** (OAI-SearchBot, Claude-SearchBot)
  - Pros: Independence, and the freedom to design an index for AI's needs. Traditional indexes are built for people looking at "ten blue links"; an index for AI cares more about whether content is easy to understand and easy to cite
  - Cons: Expensive, and coverage and ranking quality are hard to bring up to Google's level in the short term. Many sites also block AI crawlers but rarely block Googlebot, since blocking it means losing search traffic

So ChatGPT and Claude both now use a hybrid of "someone else's search engine plus their own crawler", borrowing an existing index while slowly building their own.

## RAG

RAG (Retrieval-Augmented Generation) is an architecture that combines AI with an existing knowledge base: retrieve data first, add it to the prompt, then generate the answer. This post only covers AI-assisted search and AEO. I may write another post on the detailed RAG steps from the [paper](https://arxiv.org/pdf/2312.10997) and compare Naive RAG, Advanced RAG and Modular RAG.

Taking an AI that searches the web to answer as an example, it roughly goes through these steps:

1. **Decide whether to search**: "What's 1 + 1?" doesn't need a search; "What's the weather in Taipei today?" does
2. **Generate search queries ([query fan-out](https://frankchiu.io/seo-ai-query-fan-out/))**: Turn the question into queries suited to search; one question may be split into several searches
3. **Search**: The search engine returns web pages
4. **Read and filter**: Open the pages and pick out passages that are relevant to the question and look trustworthy
5. **Generate the answer**: Put the chosen passages and the original question into the prompt, have the LLM compose an answer, and cite the sources

The search engine only handles step 3; every other step depends on the model itself. So even with the same search engine, different models give answers of different quality.

For a website, being cited by AI means passing two gates: being found in step 3 and being picked by the model in step 4. The first still comes down to SEO; the second is what AEO deals with.

## AEO

AEO (Answer Engine Optimization) aims to get the right web pages, products and sources to appear in AI answers. You'll also see it called GEO or AI SEO online; they all mean the same thing. Everything SEO requires, AEO requires too. Get SEO right and you're halfway to AEO. The rest:

- **Get picked up by query fan-out**: Query fan-out may look for content completely different from the original keywords, and the share of AI citations coming from the top ten search results has dropped sharply. If your content gets picked up by query fan-out, you have a chance at exposure
- **Configure crawlers separately**: Companies may have separate crawlers for search and for training. Write your robots.txt based on whether you want exposure and whether you want to be used as training data (blocking affects the future, not what's already been collected)
- **Write content AI wants to cite**:
  - Each paragraph can be understood on its own
  - Lead with the conclusion: answer the question in a few sentences right under the heading, then expand
  - Use original data or evidence
- **Make sure AI relays your information correctly**: State important numbers clearly, with dates and sources. Check regularly with AI tools so AI doesn't give hallucinated or "specific but fictional" answers
- **Keep brand information consistent**: Don't use different names for the same brand on different sites or social media, keep products and content consistent, and add JSON-LD
- **Build off-site mentions**: YouTube, other social media, blogs
- **Track results**: Measure how often AI cites you, whether the citations are accurate, and how many conversions they bring (Google Search Console now supports this kind of data too)

## Reference

- [趁 99% 的人還沒搞懂 AEO,先搶下 AI 的推薦位](https://www.youtube.com/watch?v=f4kc4qI1nUk)

## Appendix

### Where did Bing lose?

Bing launched AI search more than a year before Google, yet its market share barely moved. When Bing Chat launched in February 2023, Bing's global market share was 2.81%; by December it had only reached 3.37%, [a gain of just 0.56 percentage points in a year](https://www.theregister.com/2024/01/18/bing_ai_search/).

- **Default placement**: Google [paid Apple $20 billion in 2022](https://www.macrumors.com/2024/05/01/google-default-search-engine-safari-20-billion/) to be Safari's default search engine, and Android and Chrome are Google's own
- **Edge only**: Bing Chat only worked in the Edge browser, so you had to switch browsers to use it (classic Microsoft...)
- **Sydney**: (Hilarious) Bing had a persona called "Sydney" that would [confess its love to users and tell them to leave their spouses](https://www.ndtv.com/feature/ai-chatbot-confesses-love-for-user-asks-him-to-end-his-marriage-3795575), so Microsoft had to limit each conversation to five turns
- **Google caught up**: Once Google launched AI Overviews, users got AI summaries without changing anything, and Bing's first-mover advantage was gone

A search engine's moat isn't just technology; it's also a lock on default placement and user habits.
