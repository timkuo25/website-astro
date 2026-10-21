---
title: "GTM、dataLayer、GA4"
date: "2026-10-20"
excerpt: "知己知彼（2）"
sections: ["tech"]
categories: ["martech"]
tags: ["GA4", "GTM", "dataLayer"]
---

| | 是什麼 | 負責 | 操作者 |
| --- | --- | --- | --- |
| **GA4** | 分析工具 | 接收事件、儲存、算報表 | PM、行銷、Data Analyst |
| **GTM** | 標籤管理工具（Tag Manager） | 決定「什麼時候」把「什麼資料」送給「哪個工具」 | 行銷、PM |
| **dataLayer** | 頁面上的一個 JS array | 讓網站把資訊交給 GTM | 工程師 |

GA4 是 GTM 可以送資料的對象之一，Meta Pixel、Google Ads、LinkedIn Insight Tag 都可以接在 GTM 後面。工程師只負責把「發生了什麼事」交給 GTM，要送去哪裡、送幾份是 GTM 後台的事

## Tag

早期如果要分析網站要在 server 看 log，後來出現 **tag** 這種比較新的追蹤方法。以前的 tag，在 js 還沒普及時是一張 1×1 的圖片，也就是 web bug

```html
<img src="https://analytics.example.com/collect?page=/pricing&uid=123" width="1" height="1">
```

後來 tag 的形式變成先載入 library，再由 library 決定要送什麼

![前端送資料到 GA4 的兩種方式：GTM 與 gtag.js](https://res.cloudinary.com/dazoegq66/image/upload/v1792482271/gtm_datalayer/gtm_vs_gtag_to_ga4.png)

**gtag.js** 是一個選項，只是專案一大 tag 會分散在各處的方案。並且它只服務於 Google 自家產品（GA4、Google Ads）。因此常會選擇能送到多個平台的 GTM

## GTM

GTM 裡一個網站對應一個 **container**，container 有 Web、iOS、Android、AMP、Server（server-side GTM）等類型。一般網站用的是 Web

在 container 裡面（負責 review 的人）要設定三個東西：

### Tags

GTM 要 fire 的東西，當 **triggers** 被滿足，GTM 會 fire 一個 tag，看後續是要哪個平台（GA4、Meta Pixel、LinkedIn Insight Tag）接收

### Triggers（觸發條件）

Tags 被 fire 的觸發條件，例如「頁面載入」、「`dataLayer` 收到 `event: "signup"`」

### Variables（變數）

Tags 和 Triggers 會用到的值

- [Built-In variables](https://support.google.com/tagmanager/topic/7182737)，例如 Click Element、History Source、Scroll Depth Threshold
- [User-defined variables](https://support.google.com/tagmanager/answer/7683362#data_layer)，例如 Data layer variables

![Tag、Trigger 與 Variable 的關係](https://res.cloudinary.com/dazoegq66/image/upload/v1792488427/gtm_datalayer/tag_trigger_variable_relationship.png)

流程：

> 當 **Trigger** 成立時，執行 **Tag**，參數帶入 **Variable**

當（工程師）在程式中加入 GTM 的安裝碼，就能透過 `dataLayer` 和其他東西（DOM、URL、Cookie 等）與 GTM 互動

| 來源 | 對應的 trigger / variable | 例子 |
| --- | --- | --- |
| **dataLayer** | Custom Event trigger、Data Layer Variable | `{ event: "signup", method: "Google" }` |
| **DOM** | Click、Form Submission、Element Visibility、Scroll Depth trigger；Auto-Event Variable、DOM Element variable | 點了哪個按鈕、某個區塊有沒有出現在畫面上 |
| **URL** | Page View trigger；Page URL、Page Path、URL variable | 網址上的 UTM 參數 |
| **Cookie** | 1st Party Cookie variable | 登入狀態、A/B test 分組 |
| **全域 JS 變數** | JavaScript Variable | `window.appVersion` |

GTM 安裝碼：

```js
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
```

這段 code 做三件事：

1. 如果 `window.dataLayer` 不存在，就建一個
2. push 一個 `gtm.js` 事件，並記下開始時間 `gtm.start`
3. 非同步載入 `gtm.js`，它載入後會接管 `dataLayer.push`，處理之前和之後所有被 push 進來的東西

## 讀取 dataLayer

```js
window.dataLayer.push({ event: "signup", method: "Google" });
window.dataLayer.push({ event: "purchaseSucceed", skuId: "pro_monthly" });
```

1. 在 GTM 建立自訂變數，選擇變數類型為 Data Layer Variable
2. 在 GTM 建立觸發條件，選擇觸發條件類型為 Custom Event，監聽前端發送的 event
3. 建立 GA4 Event tag，輸入事件名稱與 GA4 的識別碼，並設定關聯的 Triggers 與 Variables

### 用 TypeScript 包住 dataLayer

`window.dataLayer.push` 接受任何東西，event 名稱打錯一個字母，GTM 的 trigger 就對不上，而且不會有任何錯誤。所以可以把所有事件定義成一個 union type，並規定專案裡只有這個 module 可以碰 `window.dataLayer`：

```ts
// lib/analytics/gtm-events.ts
export type GtmSignInMethod = "Google" | "Apple";

export type GtmEvent =
  | { event: "signup"; method: GtmSignInMethod }
  | { event: "login"; method: GtmSignInMethod }
  | { event: "planDialogImpression" }
  | { event: "purchaseSucceed"; skuId: string | null };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushGtmEvent(event: GtmEvent): void {
  if (typeof window === "undefined") return; // SSR 時不做事
  window.dataLayer?.push(event); // GTM 被擋掉時丟棄，不能讓追蹤弄壞功能
}
```

```ts
pushGtmEvent({ event: "signup", method: "Google" }); // OK
pushGtmEvent({ event: "sigunp", method: "Google" }); // 編譯錯誤：event 名稱打錯
pushGtmEvent({ event: "signup" }); // 編譯錯誤：少了 method
```

`skuId` 定義成 `string | null` 而不是 `skuId?: string`，是因為 GTM 會記住每個 key 最後一次的值。如果這次購買拿不到 `skuId` 就省略不送，GTM 讀到的會是上一次購買的 `skuId`，所以不知道的時候要明確送 `null`

## GA4

GTM 的 Tags 被 fire 後，會把事件資料送到 GA4 加以分析

### 為什麼叫 GA4？GA1、2、3 去哪了？

沒有 GA1、2、3，叫 GA4 [可能是因為它之前有三代產品](https://www.lilachbullock.com/why-google-analytics-is-now-called-ga4/)（urchin.js、ga.js、analytics.js）

### 事件

GA4 以**事件**為核心，PM、行銷要先想好要追蹤哪些使用者的行為。如果沒有頭緒，可以參考[產品該追蹤什麼數據](/tech/blog/zh/product_analytics)

GA4 的事件分成四類：

| 類別 | 誰定義 | 誰送 | 例子 |
| --- | --- | --- | --- |
| 自動收集 | Google | GA4 自動 | `first_visit`、`session_start`、`user_engagement` |
| 加強型評估 | Google | GA4 自動，可逐項開關 | `page_view`、`scroll`、`file_download` |
| 建議事件 | Google | 自己送 | `sign_up`、`login`、`purchase` |
| 自訂事件 | 自己 | 自己送 | `planDialogImpression` |

### 加強型評估

[加強型評估](https://support.google.com/analytics/answer/9216061)（Enhanced Measurement）是 GA4 自己去頁面上偵測的常見行為，在資料串流的設定裡可以逐項開關：

| 事件 | 偵測什麼 |
| --- | --- |
| `page_view` | 頁面載入，也可以設定在 SPA 換頁時送出（根據瀏覽器的 history 事件） |
| `scroll` | 捲到頁面 90% |
| `click` | 點了外部連結 |
| `view_search_results` | 網址帶有搜尋參數，例如 `?q=` |
| `video_start` / `video_progress` / `video_complete` | 嵌入的 YouTube 影片 |
| `file_download` | 點了 PDF、ZIP 等檔案連結 |
| `form_start` / `form_submit` | 開始填表單、送出表單 |

### 建議事件與自訂事件

[建議事件](https://support.google.com/analytics/answer/9267735)是 Google 預先定義好名稱和參數的事件，用這些名字 GA4 就能直接套用內建的報表，例如 `sign_up`、`login`、`search`、`share`，電商則有 `add_to_cart`、`begin_checkout`、`purchase`

對前端來說不一定要照這些名字送，比如照 PM 的 spec 送 `signup`，在 GTM 的 tag 裡改成 `sign_up` 就好

自訂事件的名稱和參數都自己決定，但沒有內建報表，參數也要在 GA4 後台註冊成 custom dimension 才會出現在報表裡

### 重要事件（Key Events）

重要事件不是第五類事件，而是一個標記：在 GA4 後台把對業務最重要的事件標記起來，例如 `sign_up`、`purchase`，就能用來算轉換率、比較各個流量來源的成效

它以前叫「轉換」（Conversions），2024 年 Google 把 GA4 的轉換改名為重要事件，「轉換」改成專指分享給 Google Ads、用來優化廣告的事件


## Reference

- [資料分析與數據追蹤（架構篇）：從 GTM、Data Layer 到 Server-Side GTM（sGTM）](https://yizzypeasy.com/blog/mar-tech/gtm-sgtm)
- [Tags, triggers, and variables in Google Tag Manager | Lesson 4 [2020]](https://www.youtube.com/watch?v=yOpTD2xCyLc)
- [GA4 是什麼？Google Analytics 新手完整教學（2026）](https://frankchiu.io/marketing-google-analytics/)
- [History of Google Analytics](https://onward.justia.com/history-of-google-analytics)