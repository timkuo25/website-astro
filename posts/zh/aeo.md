---
title: "AI 時代的搜尋與曝光"
date: "2026-03-16"
excerpt: "會跟你告白的 AI 輸在哪"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["AEO", "GEO", "AI Search", "Zero-Click Search", "RAG"]
---

這篇是[淺談搜尋引擎、廣告到 SEO](/tech/blog/zh/seo)的續篇

## 不會上網的 AI

不知道你記不記得，ChatGPT 在 2022 年底剛推出時是沒辦法拿到網路上最新資料的，問它最近發生的事，它只會說自己的知識只到 2021 年。這個時間點叫做 [knowledge cutoff](https://en.wikipedia.org/wiki/Knowledge_cutoff)。LLM 能用網路上的資料回答，這件事就屬於 [RAG](https://aws.amazon.com/tw/what-is/retrieval-augmented-generation/) 的一種

### 那幹嘛不一開始就讓它能上網？

可以推測幾個原因（但 OpenAI 與 Google 未證實）：

- **OpenAI 當時還沒有自己的搜尋引擎**：2021 年底其實有 GPT-3 自己操作瀏覽器回答問題的 [WebGPT](https://arxiv.org/abs/2112.09332)，但當時還只是研究
- **網路上的內容不受控**：網頁可能有錯誤資訊，甚至針對 AI 的惡意指令（[prompt injection](https://en.wikipedia.org/wiki/Prompt_injection)）
- **內容版權**：ChatGPT 的 Browse with Bing 在 2023 年 7 月就曾經[暫停](https://siliconangle.com/2023/07/04/openai-suspends-chatgpt-browsing-feature-alleged-paywall-bypass-concerns/)，因為使用者發現可以叫它把付費牆後面的文章整篇印出來
- **Google 也不敢**：Google 答錯的 reputational risk 比其他人大得多。後來趕著推出的 Bard 在宣傳影片答錯一個跟 [James Webb 望遠鏡](https://zh.wikipedia.org/zh-tw/%E8%A9%B9%E5%A7%86%E6%96%AF%C2%B7%E9%9F%A6%E4%BC%AF%E5%A4%AA%E7%A9%BA%E6%9C%9B%E8%BF%9C%E9%95%9C) 有關的問題，Alphabet 市值一天就[蒸發 1,000 億美元](https://www.cnn.com/2023/02/08/tech/google-ai-bard-demo-error)。而且 AI 直接給答案，**使用者就不點連結了**，等於直接毀掉自己的搜尋廣告

### AI 開始上網

2023 年 2 月 Microsoft 推出 [Bing Chat](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/)，一個能上網的 AI，ChatGPT 則是同年 3 月透過 plugins 加入瀏覽功能，到 2024 年底推出 ChatGPT Search

競爭對手逼得 Google 不得不[於 2024 年 5 月推出 AI Overviews](https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/)。他們把廣告放進 AI 摘要裡，解決使用者不會點進頁面的廣告問題，並且也得到了搜尋量的成長。總體而言 Google 贏了，但網站流量輸了，這就是為何網站要開始做 AEO

### 各家 AI 的搜尋結果從哪來

現在主流的 AI 幾乎都能上網了，但搜尋結果從哪裡來各家不太一樣，這也會影響你的網站會不會被 AI 看到

| | 開發商 | 特色 | 搜尋結果來源 |
| --- | --- | --- | --- |
| ChatGPT | OpenAI | 最早普及的 AI 聊天機器人，2024 年底推出 ChatGPT Search。帶搜尋的回答在 [Search Arena](https://arena.ai/leaderboard/search) 排名第一 | 自家爬蟲 [OAI-SearchBot](https://www.searchengineworld.com/tracking-openai-chatgpt-bots-a-fresh-guide-for-webmasters-site-owners-and-seos)，也會搭配 Bing 等合作搜尋業者 |
| Gemini | Google | 整合 Gmail、Docs 等 Google 服務。一般對話在 [Text Arena](https://arena.ai/leaderboard/text) 排名第一 | [Google 搜尋](https://ai.google.dev/gemini-api/docs/google-search) |
| Claude | Anthropic | 2025 年 3 月才[加入搜尋](https://claude.com/blog/web-search)，但 Search Arena 前十有一半是 Claude，寫程式與 [Agent](https://arena.ai/leaderboard) 任務尤其強 | 自家爬蟲 [Claude-SearchBot](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/)，第三方搜尋官方未公開，但服務供應商名單裡列了 [Brave Search](https://finance.yahoo.com/news/anthropic-appears-using-brave-power-170703042.html) |
| Copilot | Microsoft | 前身是 Bing Chat，最早能上網的 AI 之一，[先發卻沒贏](#heading-9)。整合 Windows、Edge、Office，在公司環境最容易用到 | Bing |

> 排名來自 [Arena](https://arena.ai/leaderboard) 使用者盲測投票，Text Arena 為 2026 年 10 月、Search Arena 為 2026 年 8 月的資料。各家模型更新很快，排名幾個月就會洗牌一次，之後有機會再寫一篇文章比較各家 AI 的生態系

### 資料來源

- **用自家的搜尋引擎**（Gemini、Copilot）
  - 優點：索引最大、最即時，Google 與 Bing 累積了二十幾年判斷網站可不可信、擋內容農場的經驗
  - 缺點：只有本來就在做搜尋引擎的公司做得到
- **用別人的搜尋引擎**（Claude 的 Brave Search、ChatGPT 的 Bing）
  - 優點：不用自己建索引，馬上就有完整的搜尋能力
  - 缺點：命脈握在別人手上。Microsoft 在 2025 年 8 月就[停掉了 Bing Search API](https://www.windowscentral.com/software-apps/browsing/bing-search-apis-to-be-decommissioned-completely)，只剩簽了長期合約的客戶能繼續用。而且 Google 有 Gemini、Microsoft 有 Copilot，跟他們拿資料等於跟競爭對手拿。這也是為什麼 Brave 這種[有自己索引](https://techcrunch.com/2023/04/28/brave-search-doesnt-use-bings-index-anymore/)、自己又沒在做大型模型的搜尋引擎，會成為少數中立的選擇
- **爬蟲**（OAI-SearchBot、Claude-SearchBot）
  - 優點：不受制於人，可以照 AI 的需求設計索引。傳統索引是做給人看「十個藍色連結」的，給 AI 用的索引更在意內容好不好讀懂、好不好引用
  - 缺點：燒錢、涵蓋範圍與排序能力短時間內很難追上 Google。而且很多網站會擋 AI 爬蟲，卻不太會擋 Googlebot，因為擋了就沒有搜尋流量

所以 ChatGPT 與 Claude 現在都是「別人的搜尋引擎加上自家爬蟲」的混合模式，一邊借用現成的索引，一邊慢慢建立自己的

## RAG

RAG（Retrieval-Augmented Generation）是一個混合 AI 與現有知識庫的架構。先檢索資料，把資料補進 prompt 再生成答案。本篇僅討論以 AI 輔助搜尋、AEO 的例子，未來有機會再寫一篇文章介紹[論文](https://arxiv.org/pdf/2312.10997)中 RAG 的詳細步驟、比較 Naive RAG、Advanced RAG、Modular RAG 的不同

以 AI 上網查資料回答為例，大概會經過這幾步：

1. **判斷要不要搜尋**：問「1 + 1 等於多少」不用查，問「今天台北天氣」就得查
2. **產生搜尋關鍵字（[Query fan-out](https://frankchiu.io/seo-ai-query-fan-out/)）**：把問題改成適合搜尋的關鍵字，一個問題可能會拆成好幾次搜尋
3. **搜尋**：搜尋引擎拿回網頁
4. **讀取與篩選**：打開網頁內容，挑出跟問題有關、看起來可信的段落
5. **生成答案**：把挑出來的段落和原本的問題一起放進 prompt，讓 LLM 整理成答案，並標上引用來源

搜尋引擎只負責第 3 步，其他步驟都看模型本身的能力。所以就算用的是同一個搜尋引擎，不同模型回答的品質也會不一樣

對網站來說，想被 AI 引用得先過兩關：第 3 步要被搜得到，第 4 步要被模型挑中。前者靠的還是 SEO，後者就是 AEO 要處理的事

## AEO

AEO（Answer Engine Optimization），目標是讓對的網頁 / 產品 / 資料來源出現在 AI 回答的結果裡。網路上有人會稱 GEO、AI SEO，講的是同一件事。SEO 要做的事，AEO 也都要做，SEO 做好 AEO 就完成了一半，剩下的還有：

- **被 Query fan-out 收錄**：Query fan-out 找的有可能是跟原本的關鍵字完全不一樣的內容，且 AI 引用來自搜尋前十名的比例大幅的下降。若能被 Query fan-out 收錄進去就有曝光的機會
- **分開設定爬蟲**：各家公司可能會有搜尋用的爬蟲跟訓練用的爬蟲，可以根據想不想被曝光、想不想被當訓練資料來寫 robots.txt（擋未來不回收過去）
- **寫出 AI 願意引用的內容**：
  - 段落能被單獨讀懂
  - 先講結論：在標題底下用幾句話回答問題，再展開說明
  - 使用原創的數據或證據
- **確保 AI 正確轉述**：重要的數字寫清楚、附日期、給來源。定期用 AI 工具檢測，避免 AI 回答一些幻覺或「具體但虛構」的答案
- **統一品牌資訊**：如果是同一個品牌，就不要在不同網站或社群用不同名字，產品或內容也要統一，並且寫 JSON-LD
- **經營站外的提及**：YouTube、其他社群網站、blog
- **追蹤成效**：測量被 AI 引用的次數、引用的正不正確、帶來多少轉換率（現在 Google Search Console 也有支援此類數據）

## Reference

- [趁 99% 的人還沒搞懂 AEO,先搶下 AI 的推薦位](https://www.youtube.com/watch?v=f4kc4qI1nUk)

## Appendix

### Bing 輸在哪？

Bing 比 Google 早了一年多推出 AI 搜尋，市占率卻幾乎沒動。Bing Chat 在 2023 年 2 月推出時 Bing 的全球市占率是 2.81%，到同年 12 月只到 3.37%，[一年只多了 0.56 個百分點](https://www.theregister.com/2024/01/18/bing_ai_search/)

- **預設位置**：Google 為了當 Safari 的預設搜尋引擎，[2022 年付給 Apple 200 億美元](https://www.macrumors.com/2024/05/01/google-default-search-engine-safari-20-billion/)，Android 和 Chrome 更是自己家的
- **只能用 Edge**：Bing Chat 只能在 Edge 瀏覽器用，要用的人要先換瀏覽器（一如既往的 MS Style...）
- **Sydney**：（超級好笑）Bing 有一個叫「Sydney」的人格，[會跟使用者告白、勸人離婚](https://www.ndtv.com/feature/ai-chatbot-confesses-love-for-user-asks-him-to-end-his-marriage-3795575)，Microsoft 只好限制每次對話最多 5 輪
- **Google 跟上了**：等 Google 推出 AI Overviews，使用者不用換任何東西就有 AI 摘要，Bing 的先發優勢也就沒了

搜尋引擎的護城河除了技術，還有壟斷預設位置與使用習慣
