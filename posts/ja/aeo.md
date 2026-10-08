---
title: "AI 時代の検索と露出"
date: "2026-03-16"
excerpt: "告白してくる AI はなぜ負けたのか"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["AEO", "GEO", "AI Search", "Zero-Click Search", "RAG"]
---

この記事は[検索エンジン、広告、そして SEO](/tech/blog/ja/seo) の続編です。

## ネットにつながらない AI

覚えているでしょうか。ChatGPT が 2022 年末に登場したときは、ネット上の最新情報を取得できず、最近の出来事を聞いても「知識は 2021 年までです」と答えるだけでした。この時点を [knowledge cutoff](https://en.wikipedia.org/wiki/Knowledge_cutoff) と呼びます。LLM がネット上のデータを使って答えるのは、[RAG](https://aws.amazon.com/jp/what-is/retrieval-augmented-generation/) の一種です。

### なぜ最初からネットにつなげなかったのか

いくつか理由が推測できます（ただし OpenAI と Google は認めていません）。

- **OpenAI は当時まだ自前の検索エンジンを持っていなかった**：2021 年末には GPT-3 が自分でブラウザを操作して質問に答える [WebGPT](https://arxiv.org/abs/2112.09332) がありましたが、まだ研究段階でした
- **ネット上のコンテンツは制御できない**：ページには誤情報や、AI を狙った悪意ある指示（[プロンプトインジェクション](https://en.wikipedia.org/wiki/Prompt_injection)）が含まれていることもあります
- **著作権**：ChatGPT の Browse with Bing は 2023 年 7 月に一時[停止](https://siliconangle.com/2023/07/04/openai-suspends-chatgpt-browsing-feature-alleged-paywall-bypass-concerns/)されました。ペイウォールの向こうの記事を丸ごと出力させられることにユーザーが気づいたためです
- **Google も踏み切れなかった**：Google が間違えたときの reputational risk は他社よりはるかに大きいものです。のちに急いで発表した Bard は、プロモーション動画で[ジェイムズ・ウェッブ宇宙望遠鏡](https://ja.wikipedia.org/wiki/%E3%82%B8%E3%82%A7%E3%82%A4%E3%83%A0%E3%82%BA%E3%83%BB%E3%82%A6%E3%82%A7%E3%83%83%E3%83%96%E5%AE%87%E5%AE%99%E6%9C%9B%E9%81%A0%E9%8F%A1)に関する質問を間違え、Alphabet の時価総額は 1 日で [1,000 億ドル吹き飛びました](https://www.cnn.com/2023/02/08/tech/google-ai-bard-demo-error)。しかも AI が答えを直接返せば、**ユーザーはリンクをクリックしなくなり**、自社の検索広告を自ら壊すことになります

### AI がネットにつながる

2023 年 2 月、Microsoft はネットにつながる AI、[Bing Chat](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/) を発表しました。ChatGPT は同年 3 月にプラグインでブラウジング機能を追加し、2024 年末には ChatGPT Search を公開しました。

競合に追い詰められた Google は、[2024 年 5 月に AI Overviews を公開](https://blog.google/products-and-platforms/products/search/generative-ai-google-search-may-2024/)せざるを得ませんでした。AI の要約の中に広告を入れることで、ユーザーがページをクリックしないという広告の問題を解決し、検索数も伸ばしました。全体として見れば Google は勝ち、サイトのトラフィックは負けた。これがサイトが AEO を始めるべき理由です。

### 各社 AI の検索結果はどこから来るのか

今では主要な AI のほとんどがネットにつながりますが、検索結果の出どころは各社で異なり、それがあなたのサイトが AI に見つけてもらえるかどうかにも影響します。

| | 開発元 | 特徴 | 検索結果の出どころ |
| --- | --- | --- | --- |
| ChatGPT | OpenAI | 最初に普及した AI チャットボット。2024 年末に ChatGPT Search を公開。検索を使った回答は [Search Arena](https://arena.ai/leaderboard/search) で 1 位 | 自社クローラー [OAI-SearchBot](https://www.searchengineworld.com/tracking-openai-chatgpt-bots-a-fresh-guide-for-webmasters-site-owners-and-seos)。Bing などの提携検索事業者も併用 |
| Gemini | Google | Gmail、ドキュメントなど Google のサービスと統合。一般的な対話は [Text Arena](https://arena.ai/leaderboard/text) で 1 位 | [Google 検索](https://ai.google.dev/gemini-api/docs/google-search) |
| Claude | Anthropic | [検索機能の追加](https://claude.com/blog/web-search)は 2025 年 3 月と遅かったが、Search Arena のトップ 10 の半分が Claude。コーディングと[エージェント](https://arena.ai/leaderboard)タスクが特に強い | 自社クローラー [Claude-SearchBot](https://www.searchenginejournal.com/anthropics-claude-bots-make-robots-txt-decisions-more-granular/568253/)。サードパーティの検索は公式には非公開だが、委託先リストに [Brave Search](https://finance.yahoo.com/news/anthropic-appears-using-brave-power-170703042.html) が載っている |
| Copilot | Microsoft | 前身は Bing Chat。最も早くネットにつながった AI のひとつだが、[先行したのに勝てなかった](#heading-9)。Windows、Edge、Office と統合されており、会社の環境で最も使いやすい | Bing |

> ランキングは [Arena](https://arena.ai/leaderboard) のユーザーによるブラインド投票の結果です。Text Arena は 2026 年 10 月、Search Arena は 2026 年 8 月のデータです。各社のモデルは更新が速く、ランキングは数か月で入れ替わります。いずれ各社の AI エコシステムを比較する記事も書くかもしれません。

### データの出どころ

- **自社の検索エンジンを使う**（Gemini、Copilot）
  - メリット：インデックスが最大で最新。Google と Bing には、サイトの信頼性を判断し、コンテンツファームを排除してきた 20 年以上の蓄積がある
  - デメリット：もともと検索エンジンを運営している会社にしかできない
- **他社の検索エンジンを使う**（Claude の Brave Search、ChatGPT の Bing）
  - メリット：自前でインデックスを作らなくても、すぐに完全な検索機能が手に入る
  - デメリット：生命線を他社に握られる。Microsoft は 2025 年 8 月に [Bing Search API を終了](https://www.windowscentral.com/software-apps/browsing/bing-search-apis-to-be-decommissioned-completely)し、長期契約を結んだ顧客しか使えなくなりました。しかも Google には Gemini、Microsoft には Copilot があり、彼らからデータをもらうのは競合からもらうのと同じです。だからこそ Brave のように[自前のインデックスを持ち](https://techcrunch.com/2023/04/28/brave-search-doesnt-use-bings-index-anymore/)、自社では大規模モデルを作っていない検索エンジンが、数少ない中立な選択肢になっています
- **クローラー**（OAI-SearchBot、Claude-SearchBot）
  - メリット：他社に縛られず、AI のニーズに合わせてインデックスを設計できる。従来のインデックスは人が「10 本の青いリンク」を見るためのものだが、AI 向けのインデックスはコンテンツが理解しやすいか、引用しやすいかを重視する
  - デメリット：お金がかかり、カバー範囲やランキングの質は短期間では Google に追いつけない。また、多くのサイトは AI のクローラーはブロックしても Googlebot はめったにブロックしません。ブロックすれば検索流入がなくなるからです

つまり ChatGPT も Claude も今は「他社の検索エンジン＋自社クローラー」のハイブリッド型で、既存のインデックスを借りながら、少しずつ自前のものを育てています。

## RAG

RAG（Retrieval-Augmented Generation）は、AI と既存のナレッジベースを組み合わせたアーキテクチャです。まずデータを検索し、それをプロンプトに加えてから答えを生成します。この記事では AI による検索支援と AEO の例だけを扱います。[論文](https://arxiv.org/pdf/2312.10997)にある RAG の詳しいステップや、Naive RAG、Advanced RAG、Modular RAG の違いは、いずれ別の記事で紹介するかもしれません。

AI がネットで調べて答える場合を例にすると、だいたい次のステップを踏みます。

1. **検索が必要か判断する**：「1 + 1 は？」なら調べる必要はなく、「今日の台北の天気は？」なら調べる必要がある
2. **検索キーワードを作る（[Query fan-out](https://frankchiu.io/seo-ai-query-fan-out/)）**：質問を検索に適したキーワードに言い換える。ひとつの質問が複数の検索に分かれることもある
3. **検索する**：検索エンジンがページを返す
4. **読み込んで絞り込む**：ページを開き、質問に関係があって信頼できそうな部分を選ぶ
5. **答えを生成する**：選んだ部分と元の質問をプロンプトに入れ、LLM に答えをまとめさせ、引用元を示す

検索エンジンが担当するのはステップ 3 だけで、それ以外はすべてモデル自体の能力次第です。だから同じ検索エンジンを使っていても、モデルによって回答の質は変わります。

サイトにとって、AI に引用されるには 2 つの関門があります。ステップ 3 で検索に引っかかること、ステップ 4 でモデルに選ばれることです。前者は相変わらず SEO の仕事で、後者が AEO の扱う領域です。

## AEO

AEO（Answer Engine Optimization）の目的は、適切なページ、プロダクト、情報源を AI の回答に表示させることです。ネット上では GEO や AI SEO と呼ばれることもありますが、指しているものは同じです。SEO でやるべきことは、AEO でもすべてやる必要があります。SEO がしっかりできていれば AEO は半分完成です。残りは次のとおりです。

- **Query fan-out に拾われる**：Query fan-out は元のキーワードとはまったく違うコンテンツを探すこともあり、AI の引用のうち検索上位 10 件からのものの割合は大きく下がっています。Query fan-out に拾われれば露出のチャンスがあります
- **クローラーを分けて設定する**：会社によっては検索用と学習用のクローラーを分けています。露出したいか、学習データに使われたいかに応じて robots.txt を書きましょう（ブロックは今後に効くだけで、過去に収集された分は取り消せません）
- **AI が引用したくなるコンテンツを書く**：
  - 段落ごとに単独で理解できるようにする
  - 結論から書く：見出しのすぐ下で数文で質問に答え、それから詳しく説明する
  - オリジナルのデータや根拠を使う
- **AI に正しく伝えてもらう**：重要な数字ははっきり書き、日付と出典を添える。定期的に AI ツールでチェックし、AI がハルシネーションや「具体的だけど架空」の答えを返さないようにする
- **ブランド情報を統一する**：同じブランドなら、サイトや SNS ごとに違う名前を使わない。製品やコンテンツも統一し、JSON-LD を書く
- **サイト外での言及を増やす**：YouTube、他の SNS、ブログ
- **成果を追跡する**：AI に引用された回数、引用が正しいかどうか、どれだけコンバージョンにつながったかを測る（今では Google Search Console もこの種のデータに対応しています）

## Reference

- [趁 99% 的人還沒搞懂 AEO,先搶下 AI 的推薦位](https://www.youtube.com/watch?v=f4kc4qI1nUk)

## Appendix

### Bing はどこで負けたのか

Bing は Google より 1 年以上早く AI 検索を出したのに、シェアはほとんど動きませんでした。Bing Chat が登場した 2023 年 2 月、Bing の世界シェアは 2.81% でしたが、同年 12 月でも 3.37% と、[1 年でわずか 0.56 ポイントしか伸びていません](https://www.theregister.com/2024/01/18/bing_ai_search/)。

- **デフォルトの座**：Google は Safari のデフォルト検索エンジンになるために [2022 年に Apple へ 200 億ドルを支払っています](https://www.macrumors.com/2024/05/01/google-default-search-engine-safari-20-billion/)。Android と Chrome はそもそも自社のものです
- **Edge 限定**：Bing Chat は Edge ブラウザでしか使えず、使いたければまずブラウザを乗り換える必要がありました（相変わらずの MS スタイル…）
- **Sydney**：（めちゃくちゃ笑える）Bing には「Sydney」という人格があり、[ユーザーに告白したり離婚を勧めたり](https://www.ndtv.com/feature/ai-chatbot-confesses-love-for-user-asks-him-to-end-his-marriage-3795575)したため、Microsoft は 1 回の会話を最大 5 往復に制限せざるを得ませんでした
- **Google が追いついた**：Google が AI Overviews を出すと、ユーザーは何も変えずに AI の要約を使えるようになり、Bing の先行者利益は消えました

検索エンジンの堀は技術だけではありません。デフォルトの座とユーザーの習慣を押さえていることも大きいのです。
