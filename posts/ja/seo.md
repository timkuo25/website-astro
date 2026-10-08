---
title: "検索エンジン、広告、そして SEO"
date: "2026-03-15"
excerpt: "社長が「うちも SEO やるぞ」と言い出した"
sections: ["tech"]
categories: ["martech", "ai"]
tags: ["SEO", "SEM", "Keyword Research", "Customer Acquisition", "Influencer Marketing"]
---

[プロダクトはどんなデータを追跡すべきか](/tech/blog/ja/product_analytics#heading-5)で、SEO は [AARRR フレームワーク](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026)の最初のステップ Acquisition、つまり新規顧客を獲得する段階に含まれると書きました。この段階には、広告出稿や SNS 運用といった他のマーケティング手法も含まれます。では、SEO の何が重要なのでしょうか？この記事では、SEO が生まれた背景である検索エンジンのビジネスモデル、SEO が必要な人・不要な人、そして AI 時代にますます重要になっている AEO について取り上げます。SEO/AEO をやるべきか迷っているスタートアップや、社長に「うちのプロダクトも SEO やるぞ！」と言われてポカンとしているマーケターやエンジニアの参考になれば幸いです。

この記事はシリーズの前編です。後編は [AI 時代の検索と露出](/tech/blog/ja/aeo)です。

![Acquisition には SEO が含まれる](https://res.cloudinary.com/dazoegq66/image/upload/v1791365046/seo/aarrr_acquisition_seo.png)

## SEO と AEO

Google などの検索エンジン開発者にとって、[SEO（Search Engine Optimization）](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ja)は、ユーザーが本当に必要としているものを検索エンジンに表示させるためのものです。サイトやプロダクトにとっては、検索エンジンに見つけてもらい、上位に表示されれば、それだけユーザーの目に留まりやすくなります。いわば長期的な無料広告です。

ところが近年、検索エンジンにキーワードを入力して最初に目に入るのは、上位のページではなく AI がまとめた情報になりました。この機能が登場してから、検索結果のページの[クリック率は大きく下がっています](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)。これは次の戦場が「どうすれば AI に見つけてもらい、選んでもらえるか」であることを示しています。それを扱うのが AEO（Answer Engine Optimization）です。

![Google の AI Overview](https://res.cloudinary.com/dazoegq66/image/upload/v1791365178/seo/google_ai_overview_aeo_search.png)

## 検索エンジン

ソフトウェア業界と技術の進化は、多くの場合ビッグテックが主導してきました。数十年前なら IBM、Oracle、Microsoft、少し最近なら Facebook、Apple、Amazon、Google といった企業です。そして今、OpenAI や Anthropic などが LLM と AI エージェントの時代を切り開き、Google は[自社のモデル](https://blog.google/technology/ai/google-gemini-ai/)を発表し、Microsoft も [OpenAI に出資](https://blogs.microsoft.com/blog/2023/01/23/microsoftandopenaiextendpartnership/)して [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/) で参戦しています。

初期の検索エンジンはユーザーにあまり親切ではなく、広告を出すか[人による審査](https://en.wikipedia.org/wiki/Yahoo!_Directory)を通らないかぎり、ユーザーは必要なページをほとんど見つけられませんでした。Google の検索エンジンは **[PageRank](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/)** でページ同士のリンク関係を見てランキングし、ユーザーが本当に役立つ情報にたどり着けるようにしました。その後 Google は Google AdWords（のちの Google Ads）を検索エンジンと組み合わせ、ユーザーがキーワードを入力すると同時に広告を表示する仕組みを作り、これが Google の主なビジネスモデルになりました。この成功が今の Google のソフトウェア帝国を築き、競合他社や学術機関による Information Retrieval の研究も盛んにしました。今でも Google は検索エンジンの王者で、Yahoo!、Bing、DuckDuckGo はどれもその規模に及びません（百度は独自路線なので別枠…）。SEO の話をするときも、ほぼ Google の枠組みとルールに沿うことになります。

| | Google | Bing | Yahoo! |
| --- | --- | --- | --- |
| 世界シェア（2026 年 9 月） | [約 90%](https://gs.statcounter.com/search-engine-market-share) | 約 5% | 約 1.4% |
| 検索結果の出どころ | 自社インデックス | 自社インデックス。Yahoo!、DuckDuckGo など他の検索エンジンにも提供 | 自社クローラー Slurp と [Bing のクローラー](https://uk.help.yahoo.com/kb/SLN2213.html) |
| ビジネスモデル | ユーザーの行動に基づく検索広告。広告が親会社 Alphabet の売上の大半を占める | 検索広告（Microsoft Advertising）。Microsoft にとっては Azure や Office に次ぐ[副業](https://www.microsoft.com/investor/reports/ar25/index.html) | ニュース、ファイナンス、メールなどポータルサイトの広告。検索広告は 2009 年から [Microsoft と提携](https://techcrunch.com/2009/07/29/microsoft-yahoo-search-deal-the-official-press-release/) |
| AI との統合 | [AI Overviews と AI Mode](https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/)（Gemini） | [Copilot](https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/)（OpenAI のモデル） | [Yahoo Scout](https://techxplore.com/news/2026-03-yahoo-ai-powered-scout-roots.html)（Anthropic の Claude） |

## SEO が必要な人・不要な人

広告とは、特定の対象に対して大規模に**情報を伝え**、**認知を形成し**、**行動を促す**商業活動です。何かを売りたいなら、ほぼ必ず広告が必要になります。例外は、すでに評判が高い・有名である場合や、宣伝のいらない独占事業（電力会社など）くらいでしょう。つまり問題は「広告を出すかどうか」ではなく「どの広告を使うか」で、その答えは**顧客がふだんどうやって新しいものを見つけているか**で決まります。

### SEO

ユーザーが自分から検索したときに、自然検索の順位で見つけてもらう方法です。コストは時間とコンテンツで、直接お金はほとんどかかりませんが、効果が出るまで時間がかかり、成果が見えるまで通常数か月かかります。

### SEM（Search Engine Marketing、検索広告）

お金を払ってキーワードを買う方法で、最も一般的な形は Google Ads のような PPC（Pay-Per-Click、クリック課金型広告）です。クリックごとに課金され、出稿すればすぐに表示されますが、止めればそれで終わりです。

### SNS 運用

Instagram、Threads、Facebook などでコンテンツを発信し、ファンを増やす方法です。コストはこれも時間とコンテンツで、SNS 広告を買って加速させることもできます。効果が出る速さは SEO と SEM の中間です。

### タレント起用、インフルエンサー、自身の知名度

他人（または自分）が積み上げてきた信頼を借りる方法です。コストは起用料か、自分自身の長年の積み重ねで、知名度があれば効果は非常に速く出ます。ライブコマース、タイアップ広告、芸能人が自分のアパレルブランドや飲食店、インスタント麺を出すのもこれに当たります。

台湾の YouTuber、壹加壹（Lean & ILLY）は自分たちで繁体字中国語の字幕ツール [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI) を作り、自分のチャンネルの動画 1 本で公開を告知しただけで、1 週間で 1,000 人以上が有料登録しました。彼らに SEO は必要ありません。チャンネルの視聴者そのものが顧客獲得のチャネルだからです。さらに 10 年以上動画を作ってきた彼らは業界の課題を深く理解しており、それがプロダクト成功の大きな理由になりました。

この方法は**自分か誰かがすでに有名であること**が前提で、それはたいてい 10 年以上かけて積み上げたものなので、誰でも真似できるわけではありません。強い個人の影響力と課題への洞察は、やみくもに SEO にお金をかけるよりも効果的なことが多いです。

### SEO は必要か

判断基準：顧客は検索であなたを見つけるか？

| ケース | SEO は必要？ | 理由 |
| --- | --- | --- |
| コンテンツサイト、ブログ、メディア | 非常に必要 | トラフィックが生命線 |
| 一般的な店舗・事業者 | やる価値はある | ユーザーは困ったときに直接検索する。地域の店舗は Google ビジネスプロフィールも運用すべき |
| EC | 必要。通常は SEM と併用 | 商品ページが検索で見つかる必要がある。人気キーワードの競争が激しいときは広告で補う |
| まったく新しいカテゴリの製品 | 効果は限定的 | ユーザーは何を検索すればいいかすら知らないので、まず SNS やインフルエンサーで市場を啓蒙する必要がある |
| スタートアップ | 段階による | PMF を探している段階ではプロダクトの方向性がいつ変わるかわからず、SEO は効果が出るまで数か月かかる。まずは SEM や SNS、ユーザーへの直接ヒアリングで需要を検証するほうがいい。検索されることが確認でき、プロダクトも安定してから、SEO は割に合う長期投資になる |
| すでに有名なブランドやクリエイター | 特に力を入れなくてよい | ブランド名そのものがキーワードで、自然に 1 位に表示される |
| B2B のエンタープライズソフトウェア | 一部必要 | 意思決定者はネットで比較検討するが、成約は主に営業、展示会、口コミによる |
| ログインしないと見られない SaaS の管理画面やアプリ内ページ | 不要 | そもそも検索エンジンがクロールできない |
| 短期のキャンペーンやポップアップ | 間に合わない | SEO は効果が出るまで数か月かかるので、SEM や SNS のほうが現実的 |

## SEO では何をするのか

### リンクを増やす

外部サイトからリンクしてもらう、自分のサイト内のページ同士をリンクする、[サイトマップを送信する](https://www.yesharris.com/seo-basic/sitemap-seo/)。

### キーワード調査

サイトやプロダクトのポジショニングから、ユーザーがどんなキーワードを使うかを考えます。ツールで市場を分析することもできます。

- [Ahrefs](https://ahrefs.com/)
- [OpenSEO](https://openseo.so/)

検索ボリューム、競合度、検索意図（info、nav、trans、CI）といった指標に注目しましょう。スタートアップや小さなサイトは、[ロングテールキーワード](https://ranking.works/knowledge/%E9%95%B7%E5%B0%BE%E9%97%9C%E9%8D%B5%E5%AD%97/)（例：フロントエンドのパフォーマンス最適化 実践チュートリアル）から攻めると、大手サイトに勝ちやすくなります。

![](https://res.cloudinary.com/dazoegq66/image/upload/v1791429846/seo/search_demand_curve_long_tail_keywords.png)

### クローラーにサイトを正しく理解してもらう

- ページのメタデータ（title、meta）をきちんと書く
- 正しい HTML タグ（h1、h2、h3、nav、header、footer…）を使う
- [JSON-LD](https://seo.lucas-futures.com/glossary/json-ld/) を書く
- [robots.txt](https://frankchiu.io/seo-robots-txt/) を設定し、検索されたいページをブロックしない
- 重複コンテンツが多い場合は [canonical タグ](https://frankchiu.io/seo-canonical-tags/)を設定する
- サイトが [CSR](/tech/blog/ja/rendering#heading-4) の場合、Google のクローラーはまだ完全なコンテンツを確実に取得できません。ブログやニュースサイトなど純粋なコンテンツサイトなら、[他のレンダリング方式](/tech/blog/ja/rendering#heading-10)を検討しましょう

### サイトのパフォーマンスと Core Web Vitals

サイトのパフォーマンスが悪いと、SEO の順位にも影響します。Core Web Vitals はサイトのパフォーマンスを評価する 3 つの指標です。

- Largest Contentful Paint（LCP）：読み込み速度を測る
- First Input Delay（FID）：ページのインタラクティブ性を測る
- Cumulative Layout Shift（CLS）：視覚的な安定性を測る

[PageSpeed Insights](https://pagespeed.web.dev/) で自分のサイトのパフォーマンスを確認し、改善点を見つけられます。

### コンテンツの質を保ち、ユーザーの課題を解決する

- [E-E-A-T の原則](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=ja)
- 順位のために記事を書いたり、不自然なキーワードを詰め込んだりしない
- AI で大量の低品質コンテンツを量産しない

![iQIYI：中国有嘻哈（The Rap of China）「良いものは必ず残る」](https://res.cloudinary.com/dazoegq66/image/upload/v1791430396/seo/rap_of_china_good_will_stay_meme.png)

### AI でサイトの技術的な問題を改善する

- [claude-seo](https://github.com/AgricIDaniel/claude-seo)
- [seo-skills](https://github.com/seranking/seo-skills)

## Reference

- [What'Sub](https://www.youtube.com/watch?v=h2e-Me48tHI)
- [從 0 到被 Google 看見:AI 時代的 SEO 生存指南](https://www.youtube.com/watch?v=iE8Byp-mMsc)
- [Core Web Vitals（CWV）とは？](https://www.cloudflare.com/ja-jp/learning/performance/what-are-core-web-vitals/)
