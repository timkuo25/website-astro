---
title: "Modular Arithmetic and the Chinese Remainder Theorem"
date: "2025-05-02"
excerpt: "Counted by threes, two remain; by fives, three remain; by sevens, two remain. How many things are there?"
sections: ["tech", "general"]
categories: ["security"]
tags: ["Modular Arithmetic", "Fermat's Little Theorem", "Chinese Remainder Theorem"]
---

## Congruence

Congruence modulo is a [relation](https://yuehhua.github.io/blog/2018/07/22/03-relations/). When two integers $a$ and $b$ leave the same remainder after being divided by the same positive integer $n$ (the modulus), we say $a$ and $b$ are **congruent** modulo $n$, written as

$$a \equiv b \ (\text{mod } n)$$

For example

$$11 \equiv 5 \ (\text{mod } 3)$$

$$38 \equiv 14 \ (\text{mod } 12)$$

It works for negative numbers too, for example

$$-8 \equiv 7 \ (\text{mod } 5)$$

In math and cryptography, we often have to deal with some "huge numbers"

- [Integer factorization](https://en.wikipedia.org/wiki/Integer_factorization)
- [Asymmetric encryption](https://hackmd.io/x8m97ltRTaC1BGXD-P7okQ)
- [Graham's number, TREE(3)](https://googology.fandom.com/wiki/Graham%27s_number)

Facing a huge number you've never seen before can be intimidating — you don't know where to start. Congruence lets us sort big numbers into groups. For example, with $\text{mod } 7$, all natural numbers fall into $7$ groups

| Remainder | Numbers |
| :-: | --- |
| 1 | 1, 8, 15, ... |
| 2 | 2, 9, 16, ... |
| 3 | 3, 10, 17, ... |
| 4 | 4, 11, 18, ... |
| 5 | 5, 12, 19, ... |
| 6 | 6, 13, 20, ... |
| 0 | 7, 14, 21, ... |

When we see a number like $131231312313131$, it feels unfamiliar. But if we know it leaves a remainder of $2$ when divided by $7$, that is, $131231312313131 \equiv 2 \ (\text{mod } 7)$, then we know it's "in the same group as $2$, $9$, $16$, and so on", which at least gives us a basic feel for it.

### Addition Property

If

$$a \equiv b \ (\text{mod } n)$$

$$c \equiv d \ (\text{mod } n)$$

then

$$a + c \equiv b + d \ (\text{mod } n)$$

### Multiplication Property

If

$$a \equiv b \ (\text{mod } n)$$

$$c \equiv d \ (\text{mod } n)$$

then

$$a \times c \equiv b \times d \ (\text{mod } n)$$

From this we can further derive that if $a \equiv b \ (\text{mod } n)$, then

$$a^k \equiv b^k \ (\text{mod } n)$$

$$ma \equiv mb \ (\text{mod } n)$$

### Examples

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

### Modular Inverse

If

$$ab \equiv 1 \ (\text{mod } n)$$

then $b$ is called the modular multiplicative inverse of $a$, which can also be written as

$$a^{-1} \equiv b \ (\text{mod } n)$$

For example, under $\text{mod } 11$, the modular inverses of $3$ are $\{\, 4 + 11z \mid z \in \mathbb{Z} \,\}$, that is, $\{\ldots, -18, -7, 4, 15, 26, \ldots\}$, because $3 \times 4 = 12 \equiv 1 \ (\text{mod } 11)$.

$a$ has a modular inverse modulo $n$ $\iff$ $a$ and $n$ are coprime. The modular inverse can be found with the [Extended Euclidean algorithm](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E6%AC%A7%E5%87%A0%E9%87%8C%E5%BE%97%E7%AE%97%E6%B3%95), or with Fermat's little theorem, covered below:

$a^{p-2} \equiv a^{-1} \ (\text{mod } p)$

## Fermat's Little Theorem

Fermat has two famous theorems. This is the one about mod; the other is about an equation having no integer solutions (the one where he said the margin was too small to contain the proof).

If $p$ is a prime and $a$ is not a multiple of $p$, then

$$a^{p-1} \equiv 1 \ (\text{mod } p)$$

or, in another form

$$a^p \equiv a \ (\text{mod } p)$$

The $2^{12} \equiv 1 \ (\text{mod } 13)$ in the example above is exactly the case $a = 2$, $p = 13$.

---

The following phenomenon gives a feel for what Fermat's little theorem means. Divide the powers of $2$ by $13$ one by one

$$2^1, 2^2, \ldots, 2^{12} \equiv 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1} \ (\text{mod } 13)$$

$$2^{13}, 2^{14}, \ldots, 2^{24} \equiv \htmlClass{math-highlight}{2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1}} \ (\text{mod } 13)$$

$$2^{25}, 2^{26}, \ldots, 2^{36} \equiv \htmlClass{math-highlight}{2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, \mathbf{1}} \ (\text{mod } 13)$$

After returning to $1$ at the $12$th power, multiplying by $2$ once more brings us back to $2$, and the whole sequence of remainders starts over. What Fermat's little theorem really says is that the remainders of powers divided by a prime $p$ cycle like a clock, completing one lap every $p - 1$ steps.

So when computing $a^k \ (\text{mod } p)$, we only need to look at the remainder of $k$ divided by $p - 1$, just like a clock only cares about the hour divided by $12$. For example, $100 = 12 \times 8 + 4$, so $2^{100} \equiv 2^4 \ (\text{mod } 13)$.

## Chinese Remainder Theorem

Legend has it that General Han Xin wanted to know how many soldiers he had, so he had them line up in rows of three, five, and seven, and found 2, 3, and 2 soldiers left over respectively.

We can list all the numbers that leave remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 2 when divided by 7:

- Remainder 2 mod 3: 2, 5, 8, 11, 14, 17, 20, **23**...
- Remainder 3 mod 5: 3, 8, 13, 18, **23**, 28...
- Remainder 2 mod 7: 2, 9, 16, **23**...

The common number is **23**, but if we keep going, we may run into more numbers that match. To find them, add **the least common multiple of 3, 5, and 7**, which is 105, to 23. So all possible numbers are $23 + 105n$.

Listing is one approach, but [*Suanfa Tongzong*](https://zh.wikipedia.org/zh-tw/%E7%AE%97%E6%B3%95%E7%B5%B1%E5%AE%97) gives another solution:

> Three people walking together, seventy is rare; five plum trees, twenty-one branches; seven children reunite at the half-month; subtract one hundred and five and you'll know

It means: multiply the remainder mod 3 by 70, the remainder mod 5 by 21, and the remainder mod 7 by 15, add them up, then take the remainder mod 105 to get the smallest value, like 23.

We know 105 is the least common multiple of 3, 5, and 7. 70 leaves remainder 1 when divided by 3, and remainder 0 when divided by 5 and 7. Likewise, 21 leaves remainder 1 mod 5, and 15 leaves remainder 1 mod 7.

Let's plug in Han Xin's example (remainders 2, 3, 2). By the multiplication and addition properties, let

$$N = 2 \times 70 + 3 \times 21 + 2 \times 15 = 233$$

then

$$N \equiv 2 \times 1 + 3 \times 0 + 2 \times 0 = 2 \ (\text{mod } 3)$$

$$N \equiv 2 \times 0 + 3 \times 1 + 2 \times 0 = 3 \ (\text{mod } 5)$$

$$N \equiv 2 \times 0 + 3 \times 0 + 2 \times 1 = 2 \ (\text{mod } 7)$$

Each term only leaves a remainder under its own modulus and is $0$ under the others, so the three conditions can be handled separately and then added together.

Finally, since $105$ leaves remainder $0$ when divided by $3$, $5$, or $7$, subtracting multiples of $105$ doesn't change any of the remainders, so $233 - 2 \times 105 = 23$.

![15, 21, and 70 as basis vectors (this one uses remainders 1, 2, 6) (YouTube: 漫士沉思录 Meditation Math)](https://res.cloudinary.com/dazoegq66/image/upload/v1791199177/modular_arithmetics/sunzi_126_remainder_box.png)

## Reference

- [Day 14:[離散數學]同餘（Mod）是什麼？](https://ithelp.ithome.com.tw/articles/10205727)
- [中国古代稀有的一个数学定理，孙子定理是什么？韩信点兵又是怎么回事？李永乐老师带你了解中国剩余定理](https://www.bilibili.com/video/BV1ss411576j/)
- [【漫士】所以，到底什么是傅里叶变换？](https://www.youtube.com/watch?v=nwMKuChwpMo&t=681s)
