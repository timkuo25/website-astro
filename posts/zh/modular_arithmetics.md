---
title: "模算數與中國剩餘定理"
date: "2025-05-02"
excerpt: "三三數之剩二，五五數之剩三，七七數之剩二。問物幾何？"
sections: ["tech", "general"]
categories: ["security"]
tags: ["Modular Arithmetic", "Fermat's Little Theorem", "Chinese Remainder Theorem"]
---

## 同餘

同餘（Congruence Modulo）是一個[關係](https://yuehhua.github.io/blog/2018/07/22/03-relations/)，當兩個整數 $a$ 與 $b$ 除以同一個正整數 $n$（模）時，若得到的餘數相同，就稱 $a$ 與 $b$ 對 $n$ **同餘**，寫作

$$a \equiv b \ (\text{mod } n)$$

例如

$$11 \equiv 5 \ (\text{mod } 3)$$

$$38 \equiv 14 \ (\text{mod } 12)$$

對負數也適用，例如

$$-8 \equiv 7 \ (\text{mod } 5)$$

在數學、密碼學中常常會需要處理一些「巨大的數」

- [整數分解](https://zh.wikipedia.org/zh-tw/%E6%95%B4%E6%95%B0%E5%88%86%E8%A7%A3)
- [非對稱式加密](https://hackmd.io/x8m97ltRTaC1BGXD-P7okQ)
- [葛利恆數、TREE(3)](https://googology.fandom.com/zh/wiki/%E8%91%9B%E7%AB%8B%E6%81%86%E6%95%B8?variant=zh-tw)

面對一個從來沒見過的巨大的數，往往會心生畏懼，不知道要怎麼處理他。同餘就能把大數做一個分類。例如 $\text{mod } 7$ 的話，可以把所有自然數分成 $7$ 組

| 餘數 | 數 |
| :-: | --- |
| 1 | 1、8、15、... |
| 2 | 2、9、16、... |
| 3 | 3、10、17、... |
| 4 | 4、11、18、... |
| 5 | 5、12、19、... |
| 6 | 6、13、20、... |
| 0 | 7、14、21、... |

當看到 $131231312313131$ 這個數，我們會覺得他很陌生，但如果我們知道他除以 $7$ 餘 $2$，也就是 $131231312313131 \equiv 2 \ (\text{mod } 7)$，就知道這個數是跟「$2$、$9$、$16$ 等數是同一組的」，至少就有一個基本的認識

### 相加性質

若

$$a \equiv b \ (\text{mod } n)$$

$$c \equiv d \ (\text{mod } n)$$

則

$$a + c \equiv b + d \ (\text{mod } n)$$

### 相乘性質

若

$$a \equiv b \ (\text{mod } n)$$

$$c \equiv d \ (\text{mod } n)$$

則

$$a \times c \equiv b \times d \ (\text{mod } n)$$

由此可再推導出，若 $a \equiv b \ (\text{mod } n)$，則

$$a^k \equiv b^k \ (\text{mod } n)$$

$$ma \equiv mb \ (\text{mod } n)$$

### 例子

1. $4096 \equiv \ ? \ (\text{mod } 13)$
2. $2^{100} + 2^{50} \equiv \ ? \ (\text{mod } 13)$

**Ans.**

**1.**

$$4096 = 13 \times 315 + 1 \equiv 1 \ (\text{mod } 13)$$

**2.**

$$2^{12} = 4096 \equiv 1 \ (\text{mod } 13)$$

$$2^{100} = \left(2^{12}\right)^8 \times 2^4 \equiv 1^8 \times 16 = 16 \equiv 3 \ (\text{mod } 13)$$

$$2^{50} = \left(2^{12}\right)^4 \times 2^2 \equiv 1^4 \times 4 = 4 \ (\text{mod } 13)$$

$$2^{100} + 2^{50} \equiv 3 + 4 = 7 \ (\text{mod } 13)$$

### 模反元素

若

$$ab \equiv 1 \ (\text{mod } n)$$

稱 $b$ 為 $a$ 的模反元素（Modular multiplicative inverse），也可以寫成

$$a^{-1} \equiv b \ (\text{mod } n)$$

例如在 $\text{mod } 11$ 之下，$3$ 的模反元素為 $\{\, 4 + 11z \mid z \in \mathbb{Z} \,\}$，也就是 $\{\ldots, -18, -7, 4, 15, 26, \ldots\}$，因為 $3 \times 4 = 12 \equiv 1 \ (\text{mod } 11)$

$a$ 對於 $n$ 存在模反元素 $\iff$ $a$ 與 $n$ 互質，可以用[擴展歐幾里得法（Extended Euclidean）](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95)求模反元素，或下面會提到的費馬小定理

$a^{p-2} \equiv a^{-1} \ (\text{mod } p)$

## 費馬小定理

費馬有兩個定理，這個是跟 mod 有關的，另一個是跟方程式無整數解有關的（就是他說什麼證明寫不下那個）

若 $p$ 是質數，且 $a$ 不是 $p$ 的倍數，則

$$a^{p-1} \equiv 1 \ (\text{mod } p)$$

或寫成另一種形式

$$a^p \equiv a \ (\text{mod } p)$$

上面例子中的 $2^{12} \equiv 1 \ (\text{mod } 13)$ 就是 $a = 2$、$p = 13$ 的情況

---

從下面這個現象可以感受一下費馬小定理的意義。把 $2$ 的次方依序除以 $13$

$$2^1, 2^2, \ldots, 2^{12} \equiv 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1} \ (\text{mod } 13)$$

$$2^{13}, 2^{14}, \ldots, 2^{24} \equiv \htmlClass{math-highlight}{2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1}} \ (\text{mod } 13)$$

$$2^{25}, 2^{26}, \ldots, 2^{36} \equiv \htmlClass{math-highlight}{2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1}} \ (\text{mod } 13)$$

第 $12$ 次回到 $1$ 之後，再乘一次 $2$ 又回到 $2$，整串餘數重新開始。費馬小定理其實就是在說，次方除以質數 $p$ 的餘數會像時鐘一樣循環，每 $p - 1$ 次轉一圈

所以計算 $a^k \ (\text{mod } p)$ 時，只需要看 $k$ 除以 $p - 1$ 的餘數，就像時鐘只看小時除以 $12$ 的餘數，例如 $100 = 12 \times 8 + 4$，所以 $2^{100} \equiv 2^4 \ (\text{mod } 13)$

## 中國剩餘定理

傳說韓信想知道自己面前的兵有多少，便讓士兵三個一列、五個一列、七個一列排好，結果發現分別剩餘 2、3、2 人

我們可以列舉所有除三餘二、除五餘三、除七餘二的數：

- 除三餘二：2、5、8、11、14、17、20、**23**...
- 除五餘三：3、8、13、18、**23**、28...
- 除七餘二：2、9、16、**23**...

我們發現共同的數字是 **23**，但繼續往後寫也還可能遇到更多一樣的數。要找到這些數，就要把 23 加上 **3、5、7 的最小公倍數**，也就是 105，所以所有可能的數就是 $23 + 105n$

列舉是一個方法，[《算法統宗》](https://zh.wikipedia.org/zh-tw/%E7%AE%97%E6%B3%95%E7%B5%B1%E5%AE%97)給出另一個解法

> 三人同行七十稀，五樹梅花廿一支，七子團圓正半月，除百零五便得知

意思是把除三的餘數乘以 70、除五的餘數乘以 21、除七的餘數乘以 15，加總後再除以 105 取餘數，就能得到像 23 這樣的最小值

105 我們知道是 3、5、7 的最小公倍數，70 則是除 3 餘 1、除 5 和 7 餘 0。同理 21 除 5 餘 1、15 除 7 餘 1

我們以韓信點兵的例子（餘 2、3、2）來代入公式，由相乘與相加性質，令

$$N = 2 \times 70 + 3 \times 21 + 2 \times 15 = 233$$

則

$$N \equiv 2 \times 1 + 3 \times 0 + 2 \times 0 = 2 \ (\text{mod } 3)$$

$$N \equiv 2 \times 0 + 3 \times 1 + 2 \times 0 = 3 \ (\text{mod } 5)$$

$$N \equiv 2 \times 0 + 3 \times 0 + 2 \times 1 = 2 \ (\text{mod } 7)$$

每一項只會在自己負責的模數留下餘數，在其他模數都是 $0$，所以三個條件可以分開處理、再加在一起

最後因為 $105$ 除以 $3$、$5$、$7$ 都餘 $0$，減掉 $105$ 的倍數不會改變餘數，所以 $233 - 2 \times 105 = 23$

![15、21、70作為基底向量（這張舉的例子是餘 1、2、6） (YouTube：漫士沉思录 Meditation Math)](https://res.cloudinary.com/dazoegq66/image/upload/v1791199177/modular_arithmetics/sunzi_126_remainder_box.png)

## Reference

- [Day 14:[離散數學]同餘（Mod）是什麼？](https://ithelp.ithome.com.tw/articles/10205727)
- [中国古代稀有的一个数学定理，孙子定理是什么？韩信点兵又是怎么回事？李永乐老师带你了解中国剩余定理](https://www.bilibili.com/video/BV1ss411576j/)
- [【漫士】所以，到底什么是傅里叶变换？](https://www.youtube.com/watch?v=nwMKuChwpMo&t=681s)
