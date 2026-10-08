---
title: "What Data Should a Product Track"
date: "2025-04-21"
excerpt: "知己知彼"
sections: ["tech"]
categories: ["martech"]
tags: ["GA4", "GTM", "CDP", "AARRR"]
---

If you were the boss and had a piece of software on your hands, which user behaviors would you care about? Which pages get used, and how?

Think about the following examples before reading on.

- E-commerce sites
- Food delivery platforms
- Streaming platforms
- Online travel and ticketing platforms

## Who needs to track data

If your software is a practice project, a blog for sharing things, or a simple single-purpose tool, you probably won't need to track anything much more complicated than the number of users.

For iterating on the product, streamlining flows, controlling costs and reaching new customers, you'll need to track and analyze user behavior data if your product looks like this:

- The product faces a need (or pressure) to grow and expand
- The product has reached a certain scale, its core features are stable, and it has a lot of users
- Collecting user feedback by hand is impractical, so you rely on automated processes
- You're running ads and want to analyze and quantify how well they perform

## Choosing tools

### Traffic and behavior analytics

- Google Analytics 4 (GA4)
- Meta Pixel
- Mixpanel / Amplitude

### Tag management

If the GA or Meta Pixel code is hardcoded into the project, then every time marketing wants to switch tracking tools, an engineer has to change the code, rebuild and redeploy.

With Google Tag Manager, you add its code to the site once. After that, GA, Meta Pixel or any other tracking code can be set up directly through GTM's visual interface.

### Customer data platform

As a company grows, marketing wants to send LINE messages and check GA, customer support wants to see user history, and the data ends up scattered across different systems. That's when you need a Customer Data Platform.

A CDP can handle:
- Data collection: website behavior, backend data, interactions with external tools
- Identity resolution: recognizing that records belong to the same user
- Distribution: sending the data to customer support, marketing, and analytics tools such as GA

As I mentioned in [How Frontend Testing Is Actually Done](/tech/blog/en/frontend_testing#heading-1), data tracking isn't about collecting piles of information for its own sake that nobody ends up using. It's a test of how well the PM and data analysts understand the product. Only by starting from the business logic and how the product is used can you set marketing goals and strategy, and only then will you know how to design the tracking architecture and which behaviors to track.

## AARRR

[AARRR](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026) is a framework proposed by Dave McClure in 2007. It uses a "funnel" to break the journey from discovering a product to generating revenue into five stages, and each stage maps to data you should track.

![AARRR](https://res.cloudinary.com/dazoegq66/image/upload/v1790907132/product_analytics/aarrr_customer_lifecycle.png)

| Stage | Question it answers | Common metrics | Engineering |
| --- | --- | --- | --- |
| Acquisition | Where do users come from? | Traffic sources, customer acquisition cost (CAC) per channel, ad click-through rate | SEO / SEM |
| Activation | Did they see value on first use? | Sign-up completion rate, onboarding completion rate, share of users completing the core action for the first time | Landing page design and A/B tests, tutorials, sign-up flow |
| Retention | Do they come back? | Day 1 / 7 / 30 retention, [DAU / MAU](https://www.appier.com/en/blog/what-is-dau/wau/mau/yau) | Lifecycle / status / event-based email, Web Push notifications, offline caching |
| Revenue | Do they pay? | Paid conversion rate, average order value (AOV), average revenue per user (ARPU), customer lifetime value (LTV) | Payment integration, checkout flow optimization, pricing and plans page |
| Referral | Do they recommend it to others? | Number of shares, invite codes redeemed, [viral coefficient (K-factor)](https://painpoint.tw/map/viral-coefficient) | Sharing features (Web Share API, OG tags), invite codes and referral rewards, deep links |


Applying the five stages to an e-commerce site gives you a list of events to instrument.

| Stage | Behavior to track | Example events |
| --- | --- | --- |
| Acquisition | Which ad or search keyword brought them in | UTM parameters, `page_view` |
| Activation | Signing up, adding a product to the cart for the first time | `sign_up`, `add_to_cart` |
| Retention | Coming back after a while, buying again | Return visit rate, repurchase rate |
| Revenue | Drop-off at each step of checkout | `begin_checkout`, `purchase` |
| Referral | Sharing products, using invite codes | `share` |

### Find the leakiest stage

The five stages work like a funnel: every step down loses some users. Fix the stage that loses the most first.

Teams usually get Activation and Retention right before pouring money into Acquisition. For a product that can't keep users, no amount of advertising helps — it's like pouring water into a leaky bucket.

## Reference

- [Google Analytics 4](https://developers.google.com/analytics)
- [Google Tag Manager](https://support.google.com/tagmanager)
- [Startup Metrics for Pirates](https://www.slideshare.net/slideshow/startup-metrics-for-pirates-long-version/89026)
