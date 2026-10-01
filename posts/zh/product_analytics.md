---
title: "產品該追蹤什麼數據"
date: "2025-04-21"
excerpt: "Sell me this pen"
sections: ["tech"]
categories: ["martech"]
tags: ["Analytics", "GA4", "GTM", "Mixpanel", "CDP"]
---

如果你是老闆，手上有一個軟體，你會關心使用者的哪些行為？或是哪些頁面被怎麼使用？

可以想想以下例子再往下看

- 電商網站
  - 熱門產品類別
  - 使用者在哪些頁面停留？停留多久？
  - 
- 外送平台
- 串流平台
- 線上旅遊與票務平台

## 誰需要追蹤數據

如果你手上的軟體是一個練手用的 project、一個分享用的 blog、一個功能單純的小工具，那除了使用人數以外，大概不會需要追蹤什麼太複雜的數據

為了產品的迭代、流程的優化、成本的管控、客群的拓展，如果產品有以下特點，就會需要追蹤與分析使用者的行為數據

- 產品面對成長與擴張需求（或壓力）
- 產品有一定規模，核心功能穩定，且有大量使用者
- 人工調查使用者反饋不實際、仰賴自動化流程
- 投放了廣告，欲分析、量化投放成效

## 挑選工具


| 類別 | 負責什麼 | 代表工具 |
| --- | --- | --- |
| 流量與行為分析（Analytics） | 流量從哪來、使用者看了哪些頁面、轉換漏斗長怎樣 | GA4、Mixpanel、Amplitude |
| 標籤管理（Tag Management System, TMS） | 集中管理各種追蹤碼，換追蹤碼不用改程式碼重新部署 | Google Tag Manager |
| 客戶資料平台（Customer Data Platform, CDP） | 統一收集事件，整理後分發給各個系統 | Segment、RudderStack |

### 流量與行為分析

- **Google Analytics 4（GA4）**：業界免費標配，網頁和 App 共用同一套事件模型。功能強大又不用錢，但介面不直覺、學習曲線陡，資料量大時部分報表會抽樣，不是 100% 精準
- **Mixpanel / Amplitude**：專為 SaaS 和 App 設計的產品分析（Product Analytics）工具，強項是使用者行為路徑（User Journey）和留存分析（Retention Cohort）。做軟體產品的話會比 GA4 好用很多，但免費額度有限，流量一大就不便宜

### 標籤管理

如果把 GA 或 Meta Pixel 的程式碼直接寫死在專案裡，每次行銷要換追蹤碼，工程師就得改程式碼、打包、重新部署

Google Tag Manager（GTM）就是夾在中間的一層容器：工程師只要在網站埋一次 GTM 的程式碼，之後要加 GA、Meta Pixel 或其他追蹤碼，行銷都能直接在 GTM 後台用視覺化介面設定，不用再麻煩工程師

### 客戶資料平台

公司規模變大後，行銷要發 LINE、客服要看紀錄、GA 要看流量、Mixpanel 要看產品數據，資料散落在各個系統裡，變成一座座資料孤島

有了 CDP，前端只需要呼叫一個 SDK

```js
analytics.track('order_completed');
```

CDP 會把這筆事件整理乾淨、統一格式，再分發給 GA、Mixpanel，甚至是公司的資料倉儲（BigQuery、Snowflake）

### 依產品類型挑選

選工具不要什麼紅就裝什麼，要從「產品類型」和「團隊階段」來取捨

| 產品類型 | 建議組合 | 原因 |
| --- | --- | --- |
| 內容部落格、形象官網 | GA4，或什麼都不裝 | 看流量就夠了，不需要 CDP 或 Mixpanel |
| 電商 | GTM + GA4 + Meta Pixel | 非常依賴廣告投放和電商標準事件（`view_item`、`purchase`），用 GTM 統一管理行銷標籤最有效率 |
| SaaS、App | Mixpanel 或 Amplitude + GA4 | Mixpanel / Amplitude 看功能留存與漏斗，GA4 看整體流量和廣告成效 |

### 依團隊階段挑選

| 階段 | 原則 | 做法 |
| --- | --- | --- |
| 早期新創（0 → 1） | 越簡單越好 | 前端直接裝 GA4，或用 Mixpanel 的免費額度。一開始就上 Segment + Snowflake 是大砲打小鳥，維護成本會拖垮團隊 |
| 成長期（1 → 100） | 導入 GTM 與 CDP | 行銷需求變多、追蹤碼開始打架時，導入 GTM 讓行銷自己管理；資料來源開始分裂時，導入 CDP 統一資料管線 |

### 帶著問題挑工具

> 工具是為了回答商業問題而存在，不是為了收集數據而收集

挑工具前先問團隊：我們現在最想解決的是什麼？是想知道廣告有沒有效，還是想知道使用者卡在哪個功能？

帶著問題去挑，才不會買了一堆昂貴的 MarTech 訂閱，結果每天打開儀表板卻不知道該看什麼

## AARRR



## Reference

- [Google Analytics 4](https://developers.google.com/analytics)
- [Google Tag Manager](https://support.google.com/tagmanager)
- [Mixpanel Docs](https://docs.mixpanel.com/)
- [Segment Docs](https://segment.com/docs/)
