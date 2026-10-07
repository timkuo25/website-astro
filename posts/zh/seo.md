---
title: "淺談搜尋引擎、廣告，到 SEO 與 AEO"
date: "2026-03-15"
excerpt: "老闆說我們產品要做 SEO"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["SEO", "AEO", "RAG"]
---

在[產品該追蹤什麼數據]()中有提到 SEO 屬於 [AARRR 框架](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026) 中的第一步 Acquisition，也就是獲取新客戶的環節。這步還包含了投放廣告、經營社群網站等其他行銷手法。那麼 SEO 重要在哪？這篇文章會討論 SEO 誕生的背景：搜尋引擎的商業模式、誰需要/不需要做 SEO，以及 AI 時代日漸重要的 AEO，希望能對不知道該不該做 SEO/AEO 的新創、看著老闆喊「我們產品要做 SEO！」而一臉懵的 marketing / RD 們一點想法

![Acquisition 包含 SEO](https://res.cloudinary.com/dazoegq66/image/upload/v1791365046/seo/aarrr_acquisition_seo.png)

## SEO 與 AEO

對 Google 等搜尋引擎開發商來說，[SEO（Search Engine Optimization）](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) 是為了讓搜尋引擎顯示使用者真正需要的東西。對網站 / 產品來說，想辦法讓自己的網站 / 產品可以被搜尋引擎找到，並且排名在前面，就更容易被使用者看到，等於是長期的免費廣告

而近年來，從搜尋引擎輸入關鍵字最先映入眼簾的已不是排名前幾的頁面，而是 AI 彙整的訊息。從這功能出來後，搜尋引擎找到的頁面[點擊率大幅下滑](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)，也揭示著下一個戰場：如何讓 AI 看到與青睞自己，而這正是 AEO（Answer Engine Optimization） 要做的事

![Google AI Overview](https://res.cloudinary.com/dazoegq66/image/upload/v1791365178/seo/google_ai_overview_aeo_search.png)


## 搜尋引擎

軟體產業與技術的迭代與演進，往往都是由科技大廠所主導、推動的。幾十年前應該就是 IBM、Oracle、Microsoft，到近一點的 Facebook、Apple、Amazon、Google 這些公司。到現在 OpenAI、Anthropic 等公司開啟 LLM 與 AI Agent 時代，Google 推出[自家的模型](https://blog.google/technology/ai/google-gemini-ai/)，Microsoft 也[投資 OpenAI](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/) 推出 [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/) 加入戰局

早期的搜尋引擎對使用者較不友善，如果沒有投廣告或經過[人工審核](https://en.wikipedia.org/wiki/Yahoo!_Directory)，使用者幾乎找不到自己需要的頁面。Google 推出的搜尋引擎用 **[PageRank](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/)** 找出網頁間的引用關係進行排名，使使用者能找搜尋到對自己真正有用的資源。隨後他們推出 Google AdWords（後來的 Google Ads）綁定搜尋引擎，再使用者下關鍵字的同時推給他們廣告，也成了 Google 主要的商業模式。這套方法的成功，催生了 Google 如今的軟體帝國，以及當年各大競爭者與學術單位對 Information Retrieval 的研究。時至今日，Google 仍是搜尋引擎的王者，舉凡 Yahoo!、Bing、DuckDuckGo（百度有它自己的玩法不算...）都沒有它的規模，當我們談 SEO 時，幾乎也都是按著 Google 的框架與規則來


| | Google | Bing | Yahoo! |
| --- | --- | --- | --- |
| 全球市占率（2026/9） | [約 90%](https://gs.statcounter.com/search-engine-market-share) | 約 5% | 約 1.4% |
| 搜尋結果來源 | 自家索引 | 自家索引，也提供給 Yahoo!、DuckDuckGo 等搜尋引擎使用 | 自家爬蟲 Slurp 加上 [Bing 的爬蟲](https://uk.help.yahoo.com/kb/SLN2213.html) |
| 商業模式 | 依使用者行為投放的搜尋廣告，廣告佔母公司 Alphabet 營收大部分 | 搜尋廣告（Microsoft Advertising），對 Microsoft 來說是 Azure、Office 之外的[副業](https://www.microsoft.com/investor/reports/ar25/index.html) | 新聞、財經、信箱等入口網站的廣告；搜尋廣告自 2009 年起[與 Microsoft 合作](https://techcrunch.com/2009/07/29/microsoft-yahoo-search-deal-the-official-press-release/) |
| AI 整合 | [AI Overviews 與 AI Mode](https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/)（Gemini） | [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/)（OpenAI 模型） | [Yahoo Scout](https://techxplore.com/news/2026-03-yahoo-ai-powered-scout-roots.html)（Anthropic 的 Claude） |

## 誰需要 / 不需要 SEO

廣告是一種用規模化的方式，向特定對象**傳遞資訊**、**塑造認知**、**引發行動**的商業活動。只要你想賣東西幾乎都會需要廣告。除非你自己已經很有口碑或很有名、或是你是不需要宣傳的獨佔事業（台電、中油）。所以問題通常不是「要不要廣告」，而是「要哪一種廣告」，而答案取決於**客戶平常是怎麼發現新東西的**

### SEO

使用者主動搜尋時靠自然排名找到你。成本為時間與內容，幾乎不用直接花錢，見效較慢，通常要好幾個月才看得到成果

### SEM（Search Engine Marketing，搜尋廣告）

付錢買關鍵字，最常見的形式即為 PPC（Pay-Per-Click，點擊付費廣告），例如 Google Ads。按點擊付費，投下去就有曝光，但停投就沒了

### 社群經營

在 IG、Threads、Facebook 等平台經營內容與粉絲，成本也是時間與內容，也可以另外買社群廣告加速。見效速度介於 SEO 與 SEM 之間

### 代言、網紅合作、自身名氣

借用別人（或自己）累積的信任。成本可能是代言費，或是本身多年的累積，有名氣的話效果非常快。直播帶貨、業配、藝人自己開潮牌店、餐廳、推出拌麵就屬於這種

壹加壹自己做繁中字幕工具 [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI)，只用自己頻道的一支影片宣布上線，一週就有上千人付費訂閱。他們不需要 SEO，頻道觀眾本身就是獲客管道。並且他們創作了十幾年，對業界痛點有深刻的理解，是產品成功的重要原因

這條路的前提是**你或別人已經有名氣**，而這往往是十幾年累積出來的，不是一般人想複製就能複製的

### 需不需要 SEO

判斷標準：你的客戶會不會用搜尋找到你？

| Case | 需要 SEO 嗎 | 原因 |
| --- | --- | --- |
| 內容網站、部落格、媒體 | 非常需要 | 搜尋流量就是命脈 |
| 一般商家 | 可以做 | 使用者遇到問題會直接搜尋，在地商家也要經營 Google 商家檔案 |
| 電商 | 需要，通常搭配 SEM | 商品頁要能被搜到，熱門關鍵字競爭激烈時再用廣告補 |
| 全新品類的產品 | 效果有限 | 使用者根本不知道要搜什麼關鍵字，得先靠社群、網紅教育市場 |
| 新創 | 看階段 | 還在找 PMF 時產品方向隨時會變，SEO 又要好幾個月才見效，不如先用 SEM、社群或直接找使用者驗證需求。確定有人會搜尋、產品也穩定下來後，SEO 才是划算的長期投資 |
| 已經有名氣的品牌或創作者 | 不太需要特別做 | 品牌名稱本身就是關鍵字，自然會排第一 |
| B2B 企業軟體 | 部分需要 | 決策者會上網比較方案，但成交主要靠業務、展會與口碑 |
| 要登入才看得到的 SaaS 後台、App 內頁 | 不需要 | 搜尋引擎本來就爬不到 |
| 短期活動、快閃 | 來不及 | SEO 要好幾個月才有效，用 SEM 或社群比較實際 |



## Reference

- [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI)
- [從 0 到被 Google 看見:AI 時代的 SEO 生存指南](https://www.youtube.com/watch?v=iE8Byp-mMsc)

