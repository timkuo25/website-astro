---
title: "GTM, dataLayer, GA4"
date: "2025-04-22"
excerpt: "Know yourself, know your users (2)"
sections: ["tech"]
categories: ["martech"]
tags: ["GA4", "GTM", "dataLayer"]
---

| | What it is | Responsible for | Operated by |
| --- | --- | --- | --- |
| **GA4** | Analytics tool | Receiving events, storing them, building reports | PM, marketing, data analysts |
| **GTM** | Tag management tool (Tag Manager) | Deciding "when" to send "what data" to "which tool" | Marketing, PM |
| **dataLayer** | A JS array on the page | Letting the site hand information to GTM | Engineers |

GA4 is just one of the destinations GTM can send data to. Meta Pixel, Google Ads and LinkedIn Insight Tag can all be connected behind GTM too. Engineers are only responsible for telling GTM "what happened"; where it goes and how many copies get sent is decided in the GTM console.

## Tag

In the early days, analyzing a website meant reading the server logs. Later a newer tracking method appeared: the **tag**. Before JS was widespread, a tag was a 1×1 image, known as a web bug.

```html
<img src="https://analytics.example.com/collect?page=/pricing&uid=123" width="1" height="1">
```

Later, tags turned into loading a library first and letting the library decide what to send.

![Two ways for the frontend to send data to GA4: GTM and gtag.js](https://res.cloudinary.com/dazoegq66/image/upload/v1792482271/gtm_datalayer/gtm_vs_gtag_to_ga4.png)

**gtag.js** is another option, but as a project grows, its tags end up scattered across the codebase. It also only works with Google's own products (GA4, Google Ads), so teams often go with GTM instead, which can send data to multiple platforms.

## GTM

In GTM, each website maps to one **container**. Containers come in several types: Web, iOS, Android, AMP and Server (server-side GTM). A regular website uses Web.

Inside the container, the person in charge of reviewing sets up three things:

### Tags

The things GTM fires. When the **triggers** are satisfied, GTM fires a tag, and the tag determines which platform receives the data (GA4, Meta Pixel, LinkedIn Insight Tag).

### Triggers

The conditions that fire a tag, such as "page load" or "`dataLayer` receives `event: "signup"`".

### Variables

Values used by tags and triggers.

- [Built-in variables](https://support.google.com/tagmanager/topic/7182737), such as Click Element, History Source and Scroll Depth Threshold
- [User-defined variables](https://support.google.com/tagmanager/answer/7683362#data_layer), such as Data Layer Variables

![How Tags, Triggers and Variables relate](https://res.cloudinary.com/dazoegq66/image/upload/v1792488427/gtm_datalayer/tag_trigger_variable_relationship.png)

The flow:

> When a **Trigger** is met, run the **Tag**, passing in **Variables** as parameters.

Once engineers add the GTM snippet to the code, the site can interact with GTM through `dataLayer` and other sources (DOM, URL, cookies, etc.).

| Source | Matching trigger / variable | Example |
| --- | --- | --- |
| **dataLayer** | Custom Event trigger, Data Layer Variable | `{ event: "signup", method: "Google" }` |
| **DOM** | Click, Form Submission, Element Visibility, Scroll Depth triggers; Auto-Event Variable, DOM Element variable | Which button was clicked, whether a section appeared on screen |
| **URL** | Page View trigger; Page URL, Page Path, URL variable | UTM parameters in the URL |
| **Cookie** | 1st Party Cookie variable | Login state, A/B test group |
| **Global JS variable** | JavaScript Variable | `window.appVersion` |

The GTM snippet:

```js
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
```

This code does three things:

1. If `window.dataLayer` doesn't exist, create it
2. Push a `gtm.js` event and record the start time as `gtm.start`
3. Load `gtm.js` asynchronously. Once loaded, it takes over `dataLayer.push` and processes everything pushed before and after

## Reading the dataLayer

```js
window.dataLayer.push({ event: "signup", method: "Google" });
window.dataLayer.push({ event: "purchaseSucceed", skuId: "pro_monthly" });
```

1. In GTM, create a user-defined variable and choose Data Layer Variable as the type
2. In GTM, create a trigger and choose Custom Event as the type, listening for the event sent from the frontend
3. Create a GA4 Event tag, enter the event name and the GA4 ID, and link the relevant triggers and variables

### Wrapping the dataLayer with TypeScript

`window.dataLayer.push` accepts anything. Misspell a single letter of an event name and the GTM trigger no longer matches, with no error at all. So you can define every event as a union type and make this module the only place in the project allowed to touch `window.dataLayer`:

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
  if (typeof window === "undefined") return; // Do nothing during SSR
  window.dataLayer?.push(event); // Drop it if GTM is blocked; tracking must never break features
}
```

```ts
pushGtmEvent({ event: "signup", method: "Google" }); // OK
pushGtmEvent({ event: "sigunp", method: "Google" }); // Compile error: misspelled event name
pushGtmEvent({ event: "signup" }); // Compile error: missing method
```

`skuId` is typed as `string | null` rather than `skuId?: string` because GTM remembers the last value of every key. If a purchase has no `skuId` and you simply leave it out, GTM will read the `skuId` from the previous purchase. So when the value is unknown, send `null` explicitly.

## GA4

When GTM tags fire, they send event data to GA4 for analysis.

### Why is it called GA4? What happened to GA1, 2 and 3?

There's no GA1, 2 or 3. It's called GA4 [probably because three generations came before it](https://www.lilachbullock.com/why-google-analytics-is-now-called-ga4/) (urchin.js, ga.js, analytics.js).

### Events

GA4 is built around **events**, so PMs and marketing need to decide up front which user behaviors to track. If you're not sure where to start, see [What Data Should a Product Track](/tech/blog/en/product_analytics).

GA4 events fall into four categories:

| Category | Defined by | Sent by | Example |
| --- | --- | --- | --- |
| Automatically collected | Google | GA4, automatically | `first_visit`, `session_start`, `user_engagement` |
| Enhanced measurement | Google | GA4, automatically; each can be toggled | `page_view`, `scroll`, `file_download` |
| Recommended events | Google | You | `sign_up`, `login`, `purchase` |
| Custom events | You | You | `planDialogImpression` |

### Enhanced measurement

[Enhanced Measurement](https://support.google.com/analytics/answer/9216061) covers common behaviors GA4 detects on the page by itself. Each one can be toggled in the data stream settings:

| Event | What it detects |
| --- | --- |
| `page_view` | Page load; can also be sent on SPA page changes (based on browser history events) |
| `scroll` | Scrolling to 90% of the page |
| `click` | Clicking an outbound link |
| `view_search_results` | A URL with a search parameter, such as `?q=` |
| `video_start` / `video_progress` / `video_complete` | Embedded YouTube videos |
| `file_download` | Clicking a link to a PDF, ZIP or other file |
| `form_start` / `form_submit` | Starting to fill in a form, submitting a form |

### Recommended and custom events

[Recommended events](https://support.google.com/analytics/answer/9267735) have names and parameters predefined by Google. Using these names lets GA4 apply its built-in reports directly, for example `sign_up`, `login`, `search` and `share`, plus `add_to_cart`, `begin_checkout` and `purchase` for e-commerce.

The frontend doesn't have to send these exact names. If the PM's spec says to send `signup`, just rename it to `sign_up` in the GTM tag.

Custom events have names and parameters you define yourself, but they have no built-in reports, and their parameters must be registered as custom dimensions in GA4 before they show up in reports.

### Key events

Key events aren't a fifth category of event but a label: in GA4 you mark the events that matter most to the business, such as `sign_up` and `purchase`, and then use them to calculate conversion rates and compare how different traffic sources perform.

They used to be called "conversions". In 2024 Google renamed GA4 conversions to key events, and "conversion" now refers only to events shared with Google Ads to optimize ads.


## Reference

- [資料分析與數據追蹤（架構篇）：從 GTM、Data Layer 到 Server-Side GTM（sGTM）](https://yizzypeasy.com/blog/mar-tech/gtm-sgtm)
- [Tags, triggers, and variables in Google Tag Manager | Lesson 4 [2020]](https://www.youtube.com/watch?v=yOpTD2xCyLc)
- [GA4 是什麼？Google Analytics 新手完整教學（2026）](https://frankchiu.io/marketing-google-analytics/)
- [History of Google Analytics](https://onward.justia.com/history-of-google-analytics)
