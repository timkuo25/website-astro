---
title: "社會選擇理論與投票演算法"
date: "2026-07-02"
excerpt: "陶片放逐"
sections: ["tech"]
categories: ["ds-algo"]
tags: ["Social Choice Theory", "", "Condorcet method"]
---

## 社會選擇理論（Social Choice Theory）

社會選擇理論是探討一個問題：如何找到一個方式把團體中所有個體的喜好，拼成一個能代表全體意志的集體決策

用理論一點的方式講，就是要找到一個制度或演算法（函數 $F(X, P)$）

**輸入**是選項 $X = \{A, B, C, D, \dots\}$跟個體的喜好 $P = (P_1, P_2, \dots, P_n)$

$$
\begin{aligned}
P_1 &= \{(A \succ B), (C \succ D), \dots\} \\
P_2 &= \{(C \succ A), (D \succ B), \dots\} \\
&\;\;\vdots
\end{aligned}
$$

使**輸出**能「代表全體意志」

$$
F^* = \arg\max_{F \in \mathcal{F}} G(F)
$$

其中 $\mathcal{F}$ 是所有可能的制度，$G$ 用來衡量一個制度有「多能代表全體意志」

你可能發現了，**什麼叫代表全體意志??** 定義是什麼？有這種東西嗎？這個看似我們再熟悉不過的東西，實際上並不好處理

我無法給出通用且明確的定義，但我能先列出結論，再一項項細說

**全體意志存不存在**

|              | 理論   | 現實   |
| ------------ | ------ | ------ |
| 2 個選項     | 存在   | 不存在 |
| 3 個以上選項 | 不保證存在 | 不存在 |

在往下討論之前，補充說明一下社會選擇理論雖然用的多是數學與經濟學的語言，但能延伸到幾乎所有涉及多人決策的議題，例如：

- 一群人出去吃飯：決定要選哪間餐廳、要點什麼
- [民主](https://zh.wikipedia.org/wiki/%E6%B0%91%E4%B8%BB)：考慮人權保障、權力分立、憲法法治的集體決策制度
- 社會發展（[福利經濟學](https://zh.wikipedia.org/zh-tw/%E7%A6%8F%E5%88%A9%E7%BB%8F%E6%B5%8E%E5%AD%A6)）：法條制訂、基礎建設、社會福利政策、產業發展走向
- 股東會：多人考慮公司決策、根據持有股份有不同權重
- 推薦系統：根據使用者偏好與評分算出熱門影片排行榜

## 兩個選項時：May's theorem

當選項只有兩個，跟你想的一樣，理論上的全體意志就是**多數決（Majority rule）**

多數決滿足以下條件（May's Theorem）
1. Anonymity：每票等值
2. Neutrality：制度對選項無偏見
3. Positive responsiveness：如果大家投完後平手，此時只要有一個人改變心意支持 $A$，結果就必須變成 $A$ 勝出

這三個條件是多數決的核心精神，他不全然代表「公平」，卻是人們能想到對於公平最通用的詮釋

然而即便用多數決做出了決策，這個決策在現實生活中是「全體意志」嗎？顯然是不行的，因此我們才會說只有兩個選項時理論上能用多數決產生集體決策，現實中卻有更多情況是要為了避免[多數人暴政](https://zh.wikipedia.org/zh-tw/%E9%99%B6%E7%89%87%E6%94%BE%E9%80%90%E5%88%B6)，而對規則加以限制

## 三個選項時：全體意志是個假議題

只要是在台灣或民主國家長大，你大概都會覺得「只要人人投票，就能找出集體的意志、人民的智慧」，然而**阿羅不可能定理**證明只要選項有 3 個以上，滿足基本公平條件的排名投票制度就不存在**Gibbard-Satterthwaite 定理**證明只要選項有 3 個以上，任何制度都防不住大家說謊。這兩個定理戳破了大家對民主政治美好的想像，並告訴我們唯一正確的「全體意志」並不存在，任何集體決策都只是投票規則不同帶來的結果

![Source: https://whogovernstw.org/2014/05/20/fangyuchen1/](https://res.cloudinary.com/dazoegq66/image/upload/v1792568147/voting/electoral_systems_table.png)


### 怎樣的 function 可以代表全體意志？

前面說要找到一個 $G$ 來代表全體意志，那這個 $G$ 會長怎樣呢？每一種 $G$ 其實就是一種對「全體意志」的定義（標準），而針對每種標準，又有不同的制度 $F$ 去實現它，例如：

1. 效用最大化（Utility Maximization）→ Borda Count
2. 多數標準（Majority Criterion）→ 相對多數決、多輪投票制
3. 孔多塞標準（Condorcet Criterion）→ [Copeland](https://en.wikipedia.org/wiki/Copeland%27s_method)、Schulze、Dodgson

其中多數標準跟孔多塞標準寫成 $G$ 的話就是滿足得 1 分、不滿足得 0 分

我們假設有四個選項、三個人在選擇

|      | 第 1 名 | 第 2 名 | 第 3 名 | 第 4 名 |
| ---- | ------- | ------- | ------- | ------- |
| 小明 | A       | B       | C       | D       |
| 小華 | B       | C       | D       | A       |
| 小美 | A       | B       | C       | D       |

#### 1. 效用最大化

每個人對每個選項都有一個「效用」（喜歡的程度），一個制度選出來的結果帶給大家的效用總和越大，就越能代表全體意志

$$
G(F) = \sum_{i=1}^{n} u_i\big(F(X, P)\big)
$$

能讓 $G$ 最大的制度，就是直接挑效用總和最大的選項

$$
F(X, P) = \arg\max_{x \in X} \sum_{i=1}^{n} u_i(x)
$$

**Borda Count**：第 1 名給 3 分、第 2 名給 2 分、第 3 名給 1 分、第 4 名給 0 分

|      | A   | B   | C   | D   |
| ---- | --- | --- | --- | --- |
| 小明 | 3   | 2   | 1   | 0   |
| 小華 | 0   | 3   | 2   | 1   |
| 小美 | 3   | 2   | 1   | 0   |
| 總分 | 6   | **7** | 4   | 1   |

勝出的是 B，雖然有兩個人最喜歡 A，但 B 沒有被任何人排在後段，A 卻是小華的最後一名，可以說 B 是比較「大家都能接受」的選項

#### 2. 多數標準

**相對多數決（Plurality）** 這次每個人只能投一票，得票最多的勝出，也就是大部分選舉用的方式

$$
F(X, P) = \arg\max_{x \in X} \left|\{\, i : x \text{ 是 } P_i \text{ 的第一名} \,\}\right|
$$

上面的例子 A 拿 2 票、B 拿 1 票，A 勝出

最常見的問題是**分票**。這需要人多一點才看得出來，假設有 9 個人

| 人數 | 排名                  |
| ---- | --------------------- |
| 4    | $A \succ B \succ C$   |
| 3    | $B \succ C \succ A$   |
| 2    | $C \succ B \succ A$   |

A 拿 4 票最多所以勝出，但其他 5 個人都把 A 排在最後一名

**多輪投票制（Two-round system）** 則是當第一輪沒有人過半時，前兩名進入第二輪。第二輪 A 對 B，原本投 C 的 2 個人轉投 B，B 以 5 比 4 勝出

相對多數決跟多輪投票制都符合多數標準，但在這個例子裡沒有人過半（A 只有 4/9），多數標準沒有要求，兩個制度就選出不同的結果，可見光靠多數標準還不足以決定全體意志

#### 3. 否決制

只要有一個人否決，選項就會被拿掉，以我們的例子來說 A 就不會當選。這是個破壞 Neutrality 與效率的做法，傾向維持現狀

最有名的應該是聯合國安理會的[五常否決權](https://www.cna.com.tw/news/aopl/202204260140.aspx)

#### 4. 孔多塞標準

[孔多塞](https://zh.wikipedia.org/zh-tw/%E5%B0%BC%E5%8F%A4%E6%8B%89%C2%B7%E5%BE%B7%C2%B7%E5%AD%94%E5%A4%9A%E5%A1%9E)**讓每個選項兩兩對決**，如果有一個選項跟其他任何選項一對一都能贏（孔多塞贏家），它就是全體意志，制度就必須選它

| 對決   | 結果   |
| ------ | -------- |
| A vs B | A 以 2:1 勝 |
| A vs C | A 以 2:1 勝 |
| A vs D | A 以 2:1 勝 |

A 是孔多塞贏家，跟相對多數決的結果一樣，但跟 Borda 不同，所以 Borda **不符合**孔多塞標準

但應該也有人想到了，萬一大家的偏好像剪刀石頭布一樣，剪刀贏布、布贏石頭、石頭又贏剪刀，孔多塞標準就不適用了。這就是[孔多塞悖論](https://zh.wikipedia.org/wiki/%E6%8A%95%E7%A5%A8%E6%82%96%E8%AE%BA)：集體傾向可以是循環性的，即使個人的傾向不是

#### 5. Dodgson's method

Dodgson 有另外一個較為人所知的名字叫 [Lewis Carroll](https://en.wikipedia.org/wiki/Lewis_Carroll)，就是寫愛麗絲夢遊仙境那個人

[他提出](https://en.wikipedia.org/wiki/Dodgson%27s_method#:~:text=Given%20an%20integer%20k%20and%20an%20election%2C,Condorcet%20winner%20with%20fewer%20than%20k%20swaps.)如果遇到孔多塞悖論，就計算每個選項「需要把相鄰的偏好排序對調幾次，才能讓自己成為孔多塞贏家」，次數最少的那個人勝出。算出最少的步數與贏家[是個 NP-hard 問題](https://www.jstor.org/stable/41105913)

#### 整理

| 規則 | 運作方式 | 優點 | 缺點 |
| ---- | -------- | ---- | ---- |
| Borda Count | 依名次給分，總分最高者勝 | 選出大家都能接受的折衷選項 | 受無關選項影響；易被策略投票操弄 |
| 相對多數決 | 每人投一票，最高票者勝 | 簡單好懂 | 分票，可能選出多數人最討厭的 |
| 多輪投票制 | 沒人過半時，前兩名再投一輪 | 減少分票 | 成本高；折衷選項可能先被淘汰 |
| 否決制 | 有人否決就拿掉，全被否決則維持現狀 | 保障少數 | 偏向現狀，容易僵局 |
| 孔多塞法 | 兩兩對決，全勝者勝出 | 贏家一對一都有過半支持 | 可能出現循環，沒有贏家 |
| Dodgson | 對調排名次數最少就能成為孔多塞贏家者勝 | 處理孔多塞悖論 | NP-hard，難計算 |

### 阿羅不可能定理

阿羅（Kenneth Arrow）證明了當候選人超過 3 個時，不存在任何一個投票制度能同時滿足以下 4 個條件：
- Non-Dictatorship：不能有任何一個人的喜好直接決定最終結果
- Pareto Efficiency：如果所有人一致認為 $A > B$，那集體結果必須是 $A > B$
- Independence of Irrelevant Alternatives：$A$ 和 $B$ 的相對排名，只取決於選民對 $A$ 和 $B$ 的偏好，不應該受到第三者 $C$ 出現或退選的干擾
- Unrestricted Domain：選民可以任意排列自己的喜好，制度都必須能處理

跟 May's Theorem 的三個條件一樣，這四個條件是多個選擇的情況下，人們能想到對於公平最通用的詮釋

阿羅不可能定理說明完美的公平在邏輯上是不存在的。所有集體做出的選擇，即使個人的偏好不變，在不同規則下就會出現不同結果，並且伴隨著一定的 trade-off

## Manipulation、Strategyproof 與 2000 年臺灣總統大選

StrategyProof(SP) 的意思是投票者沒辦法透過不誠實（違反自己偏好）的選擇獲得較好的結果。研究制度怎麼設計的學者，夢寐以求的就是設計出一個 SP 的制度。然而 [Gibbard-Satterthwaite Theorem](https://fiveable.me/game-theory/key-terms/gibbard-satterthwaite-theorem) 證明了「當候選人有 3 個以上時，世界上不存在任何一個非獨裁，又滿足 SP 的投票系統」

Plurality 可以操作[棄保效應](https://zh.wikipedia.org/zh-tw/%E7%AD%96%E7%95%A5%E6%80%A7%E6%8A%95%E7%A5%A8)，Borda 就更不用說了，手上能給的選擇一多，能說謊的空間就更大。

事實上 [Dodgson 本人就不喜歡 Borda 法與 Plurality](https://ora.ox.ac.uk/objects/uuid:6314baf4-1883-483b-ac4b-71c25f063769/files/rdb78td089)，而 Borda 自己也說「My scheme is intended only for honest men」



## Reference

