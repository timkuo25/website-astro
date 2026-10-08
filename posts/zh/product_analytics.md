---
title: "產品該追蹤什麼數據"
date: "2025-04-21"
excerpt: "知己知彼"
sections: ["tech"]
categories: ["martech"]
tags: ["GA4", "GTM", "CDP", "AARRR"]
---

如果你是老闆，手上有一個軟體，你會關心使用者的哪些行為？或是哪些頁面被怎麼使用？

可以想想以下例子再往下看

- 電商網站
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

### 流量與行為分析

- Google Analytics 4（GA4）
- Meta Pixel
- Mixpanel / Amplitude

### 標籤管理

如果把 GA 或 Meta Pixel 的程式碼直接寫死在專案裡，每次行銷要換追蹤工具，工程師就得改程式碼、打包、重新部署

可以用 Google Tag Manager，在網站寫一次的程式碼，之後要加 GA、Meta Pixel 或其他追蹤碼，都能直接在 GTM 後台用視覺化介面設定

### 客戶資料平台

公司規模變大後，行銷要發 LINE、看 GA、客服要看紀錄，資料散落在各個系統裡，此時就會需要 Customer Data Platform

CDP 可以實現
- 收集資料：網站行為、後端資料、外部工具互動
- 身分解析：認出同一個使用者
- 分發：把資料送到客服、行銷、GA 等分析工具

跟[前端測試都是怎麼做的](/tech/blog/zh/frontend_testing#heading-1)提到的一樣，數據追蹤並非為做而做收集一堆用不到的資訊。而是考驗 PM、Data Analyst 對產品的理解。從商業邏輯、產品使用流程出發，才能制定出行銷目標與策略，才會知道要如何設計追蹤架構、要追蹤哪些行為

## AARRR

[AARRR](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026) 是 Dave McClure 在 2007 年提出的框架，用「漏斗」的形式把使用者從認識產品到帶來營收的過程拆成五個階段，每個階段都能對應到要追蹤的數據

![AARRR](https://res.cloudinary.com/dazoegq66/image/upload/v1790907132/product_analytics/aarrr_customer_lifecycle.png)

| 階段 | 回答的問題 | 常見指標 | 工程 |
| --- | --- | --- | --- |
| Acquisition 獲取 | 使用者從哪裡來 | 流量來源、各渠道獲客成本（CAC）、廣告點擊率 | SEO / SEM |
| Activation 啟動 | 第一次使用有沒有感受到價值| 註冊完成率、新手引導完成率、首次完成核心動作的比例 | Landing page 設計與 A/B test、Tutorial、註冊流程 |
| Retention 留存 | 會不會再回來 | 次日／7 日／30 日留存率、[DAU / MAU](https://www.appier.com/en/blog/what-is-dau/wau/mau/yau) | Lifecycle / status / event-based email、Web Push 推播通知、離線 cache |
| Revenue 營收 | 有沒有付錢 | 付費轉換率、客單價（AOV）、每位使用者平均營收（ARPU）、顧客終身價值（LTV） | 金流串接、結帳流程優化、定價與方案頁 |
| Referral 推薦 | 會不會推薦給別人 | 分享次數、邀請碼使用數、[病毒係數（K-factor）](https://painpoint.tw/map/viral-coefficient) | 分享功能（Web Share API、OG 標籤）、邀請碼與推薦獎勵機制、deep link |


把五個階段套到電商網站，就能列出要埋哪些事件

| 階段 | 要追蹤的行為 | 事件範例 |
| --- | --- | --- |
| 獲取 | 從哪個廣告、哪個搜尋關鍵字進站 | UTM 參數、`page_view` |
| 啟動 | 註冊、第一次把商品加入購物車 | `sign_up`、`add_to_cart` |
| 留存 | 隔一段時間回訪、再次購買 | 回訪率、回購率 |
| 營收 | 結帳流程每一步的流失 | `begin_checkout`、`purchase` |
| 推薦 | 分享商品、使用邀請碼 | `share` |

### 找出漏最多的那一層

五個階段像一個漏斗，每往下一層都會流失一部分使用者，優先處理流失最嚴重的那一層

通常會先把 Activation 和 Retention 顧好，再砸錢在 Acquisition。留不住人的產品，投再多廣告都像在往漏水的桶子裡倒水

## Reference

- [Google Analytics 4](https://developers.google.com/analytics)
- [Google Tag Manager](https://support.google.com/tagmanager)
- [Startup Metrics for Pirates](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026)

