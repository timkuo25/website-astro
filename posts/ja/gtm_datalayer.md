---
title: "GTM、dataLayer、GA4"
date: "2025-04-22"
excerpt: "彼を知り己を知れば（2）"
sections: ["tech"]
categories: ["martech"]
tags: ["GA4", "GTM", "dataLayer"]
---

| | 何か | 役割 | 担当者 |
| --- | --- | --- | --- |
| **GA4** | 分析ツール | イベントを受け取り、保存し、レポートを作る | PM、マーケティング、データアナリスト |
| **GTM** | タグ管理ツール（Tag Manager） | 「いつ」「どのデータを」「どのツールに」送るかを決める | マーケティング、PM |
| **dataLayer** | ページ上の JS 配列 | サイトから GTM に情報を渡す | エンジニア |

GA4 は GTM がデータを送れる先のひとつにすぎず、Meta Pixel、Google Ads、LinkedIn Insight Tag なども GTM の後ろにつなげられます。エンジニアが担当するのは「何が起きたか」を GTM に渡すことだけで、どこに送るか、何か所に送るかは GTM の管理画面で決めることです。

## タグ

初期のウェブサイト分析では、サーバーのログを見る必要がありました。その後、**タグ**という比較的新しい計測方法が登場します。JS がまだ普及していなかったころのタグは 1×1 の画像で、web bug と呼ばれていました。

```html
<img src="https://analytics.example.com/collect?page=/pricing&uid=123" width="1" height="1">
```

その後、タグはまずライブラリを読み込み、何を送るかをライブラリが決める形に変わりました。

![フロントエンドから GA4 にデータを送る 2 つの方法：GTM と gtag.js](https://res.cloudinary.com/dazoegq66/image/upload/v1792482271/gtm_datalayer/gtm_vs_gtag_to_ga4.png)

**gtag.js** という選択肢もありますが、プロジェクトが大きくなるとタグがコードのあちこちに散らばりがちです。また、対応しているのは Google 自社のプロダクト（GA4、Google Ads）だけです。そのため、複数のプラットフォームにデータを送れる GTM が選ばれることが多いです。

## GTM

GTM では、ひとつのサイトがひとつの **コンテナ** に対応します。コンテナには Web、iOS、Android、AMP、Server（server-side GTM）などの種類があり、一般的なウェブサイトでは Web を使います。

コンテナの中では、レビューを担当する人が次の 3 つを設定します。

### タグ

GTM が発火させるものです。**トリガー** の条件が満たされると GTM がタグを発火させ、タグの設定によってどのプラットフォーム（GA4、Meta Pixel、LinkedIn Insight Tag）がデータを受け取るかが決まります。

### トリガー（発火条件）

タグが発火する条件です。たとえば「ページの読み込み」や「`dataLayer` が `event: "signup"` を受け取った」などです。

### 変数

タグとトリガーが使う値です。

- [組み込み変数](https://support.google.com/tagmanager/topic/7182737)：Click Element、History Source、Scroll Depth Threshold など
- [ユーザー定義変数](https://support.google.com/tagmanager/answer/7683362#data_layer)：データレイヤー変数など

![タグ、トリガー、変数の関係](https://res.cloudinary.com/dazoegq66/image/upload/v1792488427/gtm_datalayer/tag_trigger_variable_relationship.png)

流れ：

> **トリガー** が成立したら **タグ** を実行し、パラメータに **変数** を渡す

エンジニアがコードに GTM のスニペットを入れると、`dataLayer` やその他の情報源（DOM、URL、Cookie など）を通じて GTM とやり取りできるようになります。

| 情報源 | 対応するトリガー / 変数 | 例 |
| --- | --- | --- |
| **dataLayer** | カスタムイベント トリガー、データレイヤー変数 | `{ event: "signup", method: "Google" }` |
| **DOM** | クリック、フォーム送信、要素の表示、スクロール距離 トリガー；自動イベント変数、DOM 要素変数 | どのボタンがクリックされたか、あるブロックが画面に表示されたか |
| **URL** | ページビュー トリガー；Page URL、Page Path、URL 変数 | URL の UTM パラメータ |
| **Cookie** | ファーストパーティ Cookie 変数 | ログイン状態、A/B テストのグループ |
| **グローバル JS 変数** | JavaScript 変数 | `window.appVersion` |

GTM のスニペット：

```js
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');
```

このコードがしていることは 3 つです。

1. `window.dataLayer` がなければ作る
2. `gtm.js` イベントを push し、開始時刻を `gtm.start` として記録する
3. `gtm.js` を非同期で読み込む。読み込まれると `dataLayer.push` を引き継ぎ、それ以前とそれ以降に push されたものをすべて処理する

## dataLayer を読み取る

```js
window.dataLayer.push({ event: "signup", method: "Google" });
window.dataLayer.push({ event: "purchaseSucceed", skuId: "pro_monthly" });
```

1. GTM でユーザー定義変数を作成し、変数の種類にデータレイヤー変数を選ぶ
2. GTM でトリガーを作成し、トリガーの種類にカスタムイベントを選んで、フロントエンドから送られる event を待ち受ける
3. GA4 イベントタグを作成し、イベント名と GA4 の ID を入力して、関連するトリガーと変数を設定する

### TypeScript で dataLayer をラップする

`window.dataLayer.push` は何でも受け付けるので、event 名を 1 文字打ち間違えるだけで GTM のトリガーが一致しなくなり、しかもエラーは一切出ません。そこで、すべてのイベントを union 型として定義し、プロジェクト内で `window.dataLayer` に触れてよいのはこのモジュールだけ、というルールにします。

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
  if (typeof window === "undefined") return; // SSR 中は何もしない
  window.dataLayer?.push(event); // GTM がブロックされていたら捨てる。計測で機能を壊してはいけない
}
```

```ts
pushGtmEvent({ event: "signup", method: "Google" }); // OK
pushGtmEvent({ event: "sigunp", method: "Google" }); // コンパイルエラー：event 名のタイポ
pushGtmEvent({ event: "signup" }); // コンパイルエラー：method がない
```

`skuId` を `skuId?: string` ではなく `string | null` にしているのは、GTM が各キーの最後の値を覚えているからです。今回の購入で `skuId` が取れず、キーごと省略して送ると、GTM は前回の購入の `skuId` を読んでしまいます。わからないときは明示的に `null` を送りましょう。

## GA4

GTM のタグが発火すると、イベントデータが GA4 に送られて分析されます。

### なぜ GA4 なのか？GA1、2、3 はどこへ？

GA1、2、3 は存在しません。GA4 という名前は、[それ以前に 3 世代のプロダクトがあったから](https://www.lilachbullock.com/why-google-analytics-is-now-called-ga4/)（urchin.js、ga.js、analytics.js）と考えられます。

### イベント

GA4 は **イベント** を中心に設計されているので、PM やマーケティングは、ユーザーのどの行動を追跡するかを先に決めておく必要があります。見当がつかなければ、[プロダクトはどんなデータを追跡すべきか](/tech/blog/ja/product_analytics)を参考にしてください。

GA4 のイベントは 4 種類に分かれます。

| 種類 | 定義するのは | 送るのは | 例 |
| --- | --- | --- | --- |
| 自動収集イベント | Google | GA4 が自動で | `first_visit`、`session_start`、`user_engagement` |
| 拡張計測機能 | Google | GA4 が自動で（項目ごとにオン／オフ可） | `page_view`、`scroll`、`file_download` |
| 推奨イベント | Google | 自分で | `sign_up`、`login`、`purchase` |
| カスタムイベント | 自分 | 自分で | `planDialogImpression` |

### 拡張計測機能

[拡張計測機能](https://support.google.com/analytics/answer/9216061)（Enhanced Measurement）は、GA4 がページ上で自動的に検出するよくある行動です。データストリームの設定で項目ごとにオン／オフできます。

| イベント | 検出するもの |
| --- | --- |
| `page_view` | ページの読み込み。SPA のページ遷移時に送ることもできる（ブラウザの履歴イベントに基づく） |
| `scroll` | ページの 90% までスクロール |
| `click` | 外部リンクのクリック |
| `view_search_results` | `?q=` などの検索パラメータを含む URL |
| `video_start` / `video_progress` / `video_complete` | 埋め込みの YouTube 動画 |
| `file_download` | PDF や ZIP などのファイルリンクのクリック |
| `form_start` / `form_submit` | フォームの入力開始、フォームの送信 |

### 推奨イベントとカスタムイベント

[推奨イベント](https://support.google.com/analytics/answer/9267735)は、Google が名前とパラメータをあらかじめ定義しているイベントです。この名前を使えば GA4 の組み込みレポートがそのまま使えます。たとえば `sign_up`、`login`、`search`、`share`、EC なら `add_to_cart`、`begin_checkout`、`purchase` などです。

フロントエンドが必ずこの名前で送る必要はありません。PM の仕様どおりに `signup` を送り、GTM のタグで `sign_up` に変えれば済みます。

カスタムイベントは名前もパラメータも自由に決められますが、組み込みレポートはありません。パラメータも、GA4 の管理画面でカスタムディメンションとして登録しないとレポートに表示されません。

### キーイベント

キーイベント（Key Events）は 5 つ目のイベントの種類ではなく、ひとつの印です。GA4 の管理画面でビジネスにとって最も重要なイベント（`sign_up`、`purchase` など）に印をつけると、コンバージョン率の計算や流入元ごとの成果の比較に使えるようになります。

以前は「コンバージョン」（Conversions）と呼ばれていました。2024 年に Google は GA4 のコンバージョンをキーイベントに改名し、「コンバージョン」は Google 広告と共有して広告の最適化に使うイベントだけを指すようになりました。


## Reference

- [資料分析與數據追蹤（架構篇）：從 GTM、Data Layer 到 Server-Side GTM（sGTM）](https://yizzypeasy.com/blog/mar-tech/gtm-sgtm)
- [Tags, triggers, and variables in Google Tag Manager | Lesson 4 [2020]](https://www.youtube.com/watch?v=yOpTD2xCyLc)
- [GA4 是什麼？Google Analytics 新手完整教學（2026）](https://frankchiu.io/marketing-google-analytics/)
- [History of Google Analytics](https://onward.justia.com/history-of-google-analytics)
