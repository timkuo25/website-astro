---
title: "Social Choice Theory and Voting Algorithms"
date: "2026-07-02"
excerpt: "Ostracism"
sections: ["tech", "general"]
categories: ["ds-algo"]
tags: ["Social Choice Theory", "Condorcet method", "Voting System", "Median Voter Theorem"]
---

## Social Choice Theory

Social choice theory asks one question: how do we combine the preferences of every individual in a group into a collective decision that represents the will of the whole group?

Put more formally, we want to find a system or algorithm (a function $F(X, P)$).

The input is a set of options $X = \{A, B, C, D, \dots\}$ and the individual preferences $P = (P_1, P_2, \dots, P_n)$:

$$
\begin{aligned}
P_1 &= \{(A \succ B), (C \succ D), \dots\} \\
P_2 &= \{(C \succ A), (D \succ B), \dots\} \\
&\;\;\vdots
\end{aligned}
$$

and we want the output to "represent the general will":

$$
F^* = \arg\max_{F \in \mathcal{F}} G(F)
$$

Here $\mathcal{F}$ is the set of all possible systems, and $G$ measures how well a system "represents the general will".

You may have noticed the catch: **what does it even mean to represent the general will??** How is it defined? Does such a thing exist? Something that feels this familiar turns out to be surprisingly hard to pin down.

I can't give a general, precise definition, but I can list the conclusions first and then go through them one by one.

**Does a general will exist?**

|                   | In theory          | In reality     |
| ----------------- | ------------------ | -------------- |
| 2 options         | Exists             | Doesn't exist  |
| 3 or more options | Not guaranteed     | Doesn't exist  |

Before going further, note that although social choice theory mostly speaks the language of mathematics and economics, it extends to almost any problem involving group decisions, for example:

- A group eating out: choosing a restaurant and what to order
- [Democracy](https://en.wikipedia.org/wiki/Democracy): a system of collective decision-making that takes human rights, separation of powers, and constitutional rule of law into account
- Social development ([welfare economics](https://en.wikipedia.org/wiki/Welfare_economics)): legislation, infrastructure, social welfare policy, industrial policy
- Shareholder meetings: many people deciding on company matters, with votes weighted by shareholding
- Recommender systems: computing a trending-videos chart from user preferences and ratings

## Two options: May's Theorem

When there are only two options, it's just what you'd expect: in theory the general will is **majority rule**.

Majority rule satisfies the following conditions (May's Theorem):

1. Anonymity: every vote counts equally
2. Neutrality: the system has no bias toward either option
3. Positive responsiveness: if the vote ends in a tie and just one person changes their mind to support $A$, the result must become a win for $A$

These three conditions are the core spirit of majority rule. They don't fully capture "fairness", but they are the most widely shared interpretation of fairness people have come up with.

But even when a decision is made by majority rule, is that decision really the "general will" in real life? Clearly not. That's why we say that with two options, majority rule can produce a collective decision in theory, while in reality there are many situations where the rules have to be constrained to avoid the [tyranny of the majority](https://en.wikipedia.org/wiki/Ostracism).

## Three options: the general will is a false premise

If you grew up in Taiwan or any democracy, you probably believe that "as long as everyone votes, we can find the collective will, the wisdom of the people". Two classic theorems shatter this romantic notion:

1. **Arrow's impossibility theorem** proves that with 3 or more options, no ranked voting system satisfies a basic set of fairness conditions
2. The **Gibbard-Satterthwaite theorem** proves that with 3 or more options, no system can stop people from lying

These two theorems puncture our idealized picture of democratic politics. They tell us that a single correct "general will" doesn't exist, and that every collective decision is just the product of a particular voting rule.

![Source: https://whogovernstw.org/2014/05/20/fangyuchen1/](https://res.cloudinary.com/dazoegq66/image/upload/v1792568147/voting/electoral_systems_table.png)

### What kind of function can represent the general will?

Earlier we said we want a $G$ that represents the general will. So what does $G$ look like? Each $G$ is really one definition (criterion) of the "general will", and for each criterion there are different systems $F$ that implement it, for example:

1. Utility maximization → Borda count
2. Majority criterion → plurality, two-round system
3. Condorcet criterion → [Copeland](https://en.wikipedia.org/wiki/Copeland%27s_method), Schulze, Dodgson

Written as $G$, the majority criterion and the Condorcet criterion simply score 1 if satisfied and 0 if not.

Suppose there are four options and three voters:

|       | 1st | 2nd | 3rd | 4th |
| ----- | --- | --- | --- | --- |
| Alice | A   | B   | C   | D   |
| Bob   | B   | C   | D   | A   |
| Carol | A   | B   | C   | D   |

### 1. Utility maximization

Each person has a "utility" (how much they like it) for each option. The greater the total utility a system's outcome brings everyone, the better it represents the general will:

$$
G(F) = \sum_{i=1}^{n} u_i\big(F(X, P)\big)
$$

The system that maximizes $G$ simply picks the option with the highest total utility:

$$
F(X, P) = \arg\max_{x \in X} \sum_{i=1}^{n} u_i(x)
$$

**Borda count**: 3 points for 1st place, 2 for 2nd, 1 for 3rd, and 0 for 4th.

|       | A   | B     | C   | D   |
| ----- | --- | ----- | --- | --- |
| Alice | 3   | 2     | 1   | 0   |
| Bob   | 0   | 3     | 2   | 1   |
| Carol | 3   | 2     | 1   | 0   |
| Total | 6   | **7** | 4   | 1   |

B wins. Two people like A best, but nobody ranks B near the bottom, while A is Bob's last choice. You could say B is the option "everyone can live with".

### 2. Majority criterion

Under **plurality**, each person casts only one vote and the option with the most votes wins. This is what most elections use.

$$
F(X, P) = \arg\max_{x \in X} \left|\{\, i : x \text{ is } P_i\text{'s first choice} \,\}\right|
$$

In the example above, A gets 2 votes and B gets 1, so A wins.

The most common problem is **vote splitting**. You need a few more voters to see it, so suppose there are 9:

| Voters | Ranking               |
| ------ | --------------------- |
| 4      | $A \succ B \succ C$   |
| 3      | $B \succ C \succ A$   |
| 2      | $C \succ B \succ A$   |

A has the most votes (4) and wins, yet the other 5 voters all rank A last.

The **two-round system** sends the top two to a second round when nobody wins a majority in the first. In the second round it's A versus B: the 2 voters who chose C switch to B, and B wins 5 to 4.

Plurality and the two-round system both satisfy the majority criterion, but in this example nobody has a majority (A has only 4/9), so the criterion makes no demand and the two systems pick different winners. The majority criterion alone isn't enough to determine the general will.

### 3. Veto

If anyone vetoes an option, it's removed. In our example, A wouldn't win. This approach violates Neutrality and efficiency, and tends to preserve the status quo.

The most famous example is probably the [veto power of the five permanent members](https://www.cna.com.tw/news/aopl/202204260140.aspx) of the UN Security Council.

### 4. Condorcet criterion

[Condorcet](https://en.wikipedia.org/wiki/Marquis_de_Condorcet) **pits every pair of options against each other**. If one option beats every other option head-to-head (the Condorcet winner), it is the general will, and the system must choose it.

| Matchup | Result        |
| ------- | ------------- |
| A vs B  | A wins 2:1    |
| A vs C  | A wins 2:1    |
| A vs D  | A wins 2:1    |

A is the Condorcet winner. That matches plurality but not Borda, so Borda **does not satisfy** the Condorcet criterion.

Some of you have probably already spotted the problem: what if preferences behave like rock-paper-scissors? Scissors beats paper, paper beats rock, and rock beats scissors, so the Condorcet criterion breaks down. This is the [Condorcet paradox](https://en.wikipedia.org/wiki/Condorcet_paradox): collective preferences can be cyclic even when individual preferences are not.

### 5. Dodgson's method

Dodgson is better known by another name, [Lewis Carroll](https://en.wikipedia.org/wiki/Lewis_Carroll), the author of *Alice's Adventures in Wonderland*.

[He proposed](https://en.wikipedia.org/wiki/Dodgson%27s_method#:~:text=Given%20an%20integer%20k%20and%20an%20election%2C,Condorcet%20winner%20with%20fewer%20than%20k%20swaps.) that when the Condorcet paradox occurs, we count for each option "how many swaps of adjacent preferences it takes to make it the Condorcet winner", and the option needing the fewest swaps wins. Computing the minimum number of swaps and the winner [is NP-hard](https://www.jstor.org/stable/41105913).

![Alice's Adventures in Wonderland, by Lewis Carroll](https://res.cloudinary.com/dazoegq66/image/upload/v1792598657/voting/alice_in_wonderland_cover.png)

| Rule | How it works | Pros | Cons |
| ---- | ------------ | ---- | ---- |
| Borda count | Points by rank; highest total wins | Picks a compromise everyone can accept | Affected by irrelevant alternatives; easily manipulated by strategic voting |
| Plurality | One vote each; most votes wins | Simple and easy to understand | Vote splitting; may elect the option most people hate |
| Two-round system | If nobody has a majority, the top two face a runoff | Reduces vote splitting | Costly; compromise candidates may be eliminated early |
| Veto | Any veto removes an option; if all are vetoed, keep the status quo | Protects minorities | Biased toward the status quo; prone to deadlock |
| Condorcet method | Pairwise matchups; the option that wins them all wins | The winner has majority support in every head-to-head | Cycles may occur, leaving no winner |
| Dodgson | The option needing the fewest rank swaps to become the Condorcet winner wins | Handles the Condorcet paradox | NP-hard, hard to compute |

### Arrow's impossibility theorem

Kenneth Arrow proved that with 3 or more candidates, no voting system can satisfy all four of the following conditions at once:

- Non-dictatorship: no single person's preferences can directly determine the final result
- Pareto efficiency: if everyone agrees $A > B$, the collective result must be $A > B$
- Independence of irrelevant alternatives: the relative ranking of $A$ and $B$ depends only on voters' preferences between $A$ and $B$, and shouldn't be affected by a third option $C$ entering or dropping out
- Unrestricted domain: voters may rank their preferences in any order, and the system must handle all of them

Like the three conditions of May's Theorem, these four conditions are the most widely shared interpretation of fairness people have come up with for the case of multiple options.

Arrow's impossibility theorem shows that perfect fairness is logically impossible. For any collective choice, even if individual preferences stay the same, different rules produce different outcomes, each with its own trade-offs.

## Manipulation, strategyproofness, and Taiwan's 2000 presidential election

Strategyproof (SP) means voters cannot get a better outcome by voting dishonestly (against their own preferences). Designing an SP system is the dream of every scholar who studies institutional design. However, the [Gibbard-Satterthwaite theorem](https://fiveable.me/game-theory/key-terms/gibbard-satterthwaite-theorem) proves that "with 3 or more candidates, no voting system in the world is both non-dictatorial and SP".

Plurality can be gamed through [tactical voting](https://en.wikipedia.org/wiki/Tactical_voting), and Borda is even worse: the more choices you get to express, the more room there is to lie.

In fact, [Dodgson himself disliked both the Borda method and plurality](https://ora.ox.ac.uk/objects/uuid:6314baf4-1883-483b-ac4b-71c25f063769/files/rdb78td089), and Borda himself said, "My scheme is intended only for honest men."

Let's look at a case. Taiwan's 2000 presidential election was a three-way race between Lien Chan of the Kuomintang (KMT), Chen Shui-bian of the Democratic Progressive Party (DPP), and independent James Soong. The final vote shares were Chen 39.3%, Soong 36.84%, and Lien 23.1%, and Chen won.

![Chen Shui-bian wins the 2000 election](https://res.cloudinary.com/dazoegq66/image/upload/v1792598405/voting/election_2000_victory_rally.png)

As Governor of Taiwan Province, Soong was originally a strong favorite. But after Lee Teng-hui distanced himself from Soong, Soong left the party to run on his own, and the KMT nominated Lien instead. Soong and Lien both belonged to the Pan-Blue camp and together had nearly 60% of the vote, but the split still let Chen win while the two of them fought each other.

Soong was very likely the Condorcet winner in this election (Soong beats Chen head-to-head, and Soong beats Lien too), but plurality worked against him. If plurality can't produce the Condorcet winner, why use it at all? There are a few reasons:

1. There were actually five candidates in this election (Li Ao and Hsu Hsin-liang also ran). Under a Condorcet method, voters would have to rank all five, which is more cumbersome
2. Beyond being cumbersome, the rules are more complex and less transparent. If someone with an agenda spread conspiracy theories, it would damage social order and trust
3. Even with only three candidates, there's no guarantee the Condorcet paradox won't occur

For point 3, someone might ask: "What if we run a Condorcet method first, and fall back to plurality or Borda only if a paradox occurs?"

This idea has a name: [Black's Method](https://en.wikipedia.org/wiki/Black%27s_method). But it still doesn't work, because the Pan-Green camp could vote dishonestly to create a Condorcet paradox in the first stage, forcing the vote into the second stage, so the Condorcet winner still wouldn't be chosen.

- If Black's Method had been used in 2000: Chen's camp would have had the strongest incentive to vote strategically (since honest voting means certain defeat)
- If the Green camp's strategy succeeds and the vote falls back to plurality $\implies$ Chen wins
- If the Green camp's strategy succeeds but the vote falls back to Borda count $\implies$ Lien has a better chance, but Borda is still open to manipulation
- If every voter votes honestly $\implies$ Soong wins

New voting methods stitched together from several existing ones still can't escape Arrow's impossibility theorem and the Gibbard-Satterthwaite theorem.

## When a general will exists with three or more options: single-peaked preferences

If the options have a particular spatial structure, such as location, size, height, or a spectrum, and voters have **single-peaked preferences**, meaning each person **has one most-preferred option and likes options less the farther they are from it**, then a general will exists in theory.

For example, say three people are choosing a budget for a trip. A prefers NT$100,000, B prefers NT$200,000, and C prefers NT$300,000, and each is less satisfied the further the amount is from their preference. That's a single-peaked preference.

Single-peaked preferences guarantee that the Condorcet paradox won't occur, and **the median voter's preference automatically becomes the Condorcet winner**. This is called the Median Voter Theorem.

In practice: suppose voters' preferred candidates or policies can be placed on a one-dimensional spectrum. Under single-peaked preferences, any candidate or party that wants to win will keep moving toward the "median voter" in the middle of the spectrum (which is why party platforms in two-party and multi-party democracies often converge and play to the center).

## Conclusion

Social choice theory tells us that a perfect voting system doesn't exist and that collective decision-making is hard. Even though perfect fairness is hard to achieve in theory, real life brings many additional factors that must be considered. So we neither abuse plurality at the expense of minority rights, nor insist on the Condorcet winner as the optimal answer. A voting system isn't about finding the perfect solution; it's a system full of adjustments and compromises. Understanding the limits of algorithms, weighing the pros and cons of the game, and finding the right balance between efficiency and justice for the moment are things all of us living in society should think about.

## Reference

- [Dr. Hsu-Chun Hsiao](https://www.csie.ntu.edu.tw/~hchsiao)
- [菜市場政治學](https://whogovernstw.org/2014/05/20/fangyuchen1/)
- [A Set of Independent Necessary and Sufficient Conditions for Simple Majority Decision](https://doi.org/10.2307/1907651)
- [A Difficulty in the Concept of Social Welfare](https://doi.org/10.1086/256963)
- [Strategy-proofness and Arrow's Conditions](https://doi.org/10.1016/0022-0531(75)90050-2)
- [Voting Schemes for Which It Can Be Difficult to Tell Who Won the Election](https://doi.org/10.1007/BF00303169)
- [2000 Taiwanese presidential election](https://en.wikipedia.org/wiki/2000_Taiwanese_presidential_election)

## Appendix: The Hunter Association chairman election

After Chairman Netero died, he left a will stating that the next chairman would be elected by a vote of all Hunters, and that any vote with turnout below 95% would be thrown out and held again. The Zodiacs drew lots to decide the details, and the slip drawn was Ging's four rules:

1. All 661 Hunters are both voters and candidates
2. If nobody wins a majority in the first round, the top 16 advance to the next round, and the field is halved each round after that (16 → 8 → 4 → 2) until someone wins a majority
3. If turnout falls below 95%, that round is void and held again with the same number of candidates
4. Votes must be signed; unsigned ballots are invalid

A multi-round system where you can neither abstain nor vote anonymously. It took 9 rounds to finish.

![HUNTER X HUNTER](https://res.cloudinary.com/dazoegq66/image/upload/v1792598010/voting/hisoka_blank_ballot.png)

### Ging

- The 95% threshold: if more than 5% of people don't vote, the whole round is void, so the election can deadlock at any moment. The contest becomes about who can drag reluctant voters to the polls
- Signed ballots: this effectively abolishes the secret ballot. Everyone's position is out in the open, and tactical voting, pressure, and factional vote-herding all become visible
- Misdirection: he used an outrageous final rule to draw the Zodiacs' attention, covering up the fact that he had rigged the rules

The result of the election shows once again that a general will doesn't exist: the rules were written by Ging, and the outcome turned out much as he expected.

### Pariston

Pariston had a large bloc of Association-exclusive Hunters loyal to him. He took nearly 40% of the vote in the first round and led the whole way.

He often did things that worked against himself. For example, he proposed temporarily confiscating the licenses of Hunters who didn't vote, which only made more people abstain. Turnout kept falling short of 95% and the election dragged on, wearing down the opposition (Cheadle, Mizaistom, and others), and all he wanted was to have fun.

### Cheadle

A Zodiac who stands for steady governance and has little guile. She stayed near the top throughout, but her vote count was always a fraction of Pariston's: she had neither Pariston's organized bloc nor Leorio's emotional pull. It's the classic tragedy of the traditional moderate being squeezed by the extremes.

To stop the candidate she hated most, she resorted to **tactical voting** and threw her support behind Leorio.

### Ending: the player who didn't care about winning

After winning, Pariston immediately appointed Cheadle as vice-chairman and then resigned on the spot, making Cheadle the 14th chairman.

Cheadle and the Zodiacs cared about winning the election and controlling the Association. Pariston cared only about the game itself. While everyone else was counting votes and calculating tactical moves, the game he was playing was to prove he could control the system, then dump the burden of running the Association on Cheadle.

Every voting algorithm carries a hidden assumption: candidates want to win. Once you meet a player who doesn't care about the outcome, the algorithm can decide who gets the most votes, but not what happens next.
