---
title: "App Store Conversion: From 0.5% to 12% (Real Numbers)"
description: "Conversion rate is the metric that decides if your ad spend works, if your ASO matters, and whether installs grow. Here's what actually moves it across iOS and Android, with the levers ranked by impact."
date: "2026-05-17"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
imageAlt: "Conversion rate chart on a laptop screen"
author: "vibeprompt"
category: method
---

Conversion rate is the leverage point for every other metric in the funnel. Double it, and every install channel becomes twice as valuable for free. Halve it, and the most expensive paid acquisition campaign won't make the math work.

The store conversion benchmark for an indie app in 2026: **3-5% is normal, 8%+ is good, 12%+ is exceptional.** Most apps that feel "stuck" are sitting at 1-2% and don't realize the storefront is the bottleneck.

Two real numbers from shipped apps:

- **Excuse Caddie iOS: 6.39% conversion.** 1,330 impressions → 266 page views → installs. The page-view rate is fine, the install conversion from page view is the weak link.
- **Slothy iOS: 12.4% conversion.** 1,270 impressions → 408 page views → installs. Both the click-through and the install conversion are working.

Same developer, same platform, same time period. The difference is the storefront. This is what to actually change.

<!-- DIN DATA: senaste 30 dagars conversion-jämförelse mellan Slothy + Excuse Caddie -->

---

## The funnel, named explicitly

| Stage | iOS metric | Android metric |
|---|---|---|
| Reach | Impressions | Store listing acquisitions |
| Click-through | Product page views | Listing visitors |
| Install | First-time downloads | Installs |

Two distinct conversion rates matter:

- **CTR**: page views ÷ impressions. This is the icon-and-snippet test.
- **Install rate**: installs ÷ page views. This is the page-content test.

Total conversion = CTR × install rate. A 5% CTR with a 50% install rate beats a 20% CTR with a 10% install rate (2.5% total vs 2.0%), but it's also true that a 20% CTR pulls more total volume even if conversion is lower. **The mix matters as much as the headline number.**

Most "conversion problems" are actually one of these two ratios, not both. Diagnose first.

---

## What moves CTR (impressions → page view)

The signal is exclusively what's visible in the search result list:

1. **The icon.** Roughly 60% of CTR signal lives here. A cluttered icon that competes for attention loses to a clean one with one strong shape.
2. **The app name (first 18 characters).** What's visible before it truncates. Names ending in "...for iOS" or "...Tracker" lose; names ending in the value proposition win.
3. **The rating (if visible).** A 4.7 rating with 100+ ratings outperforms a 4.9 rating with 8 ratings. Apple shows rating count alongside the average.
4. **The subtitle (iOS) or short description (Android).** The one line under the name. This is the closest thing to ad copy in the app stores.

**What does not move CTR meaningfully:** the developer name, the in-app purchase indicator, the price (for free apps), the category label.

---

## What moves install rate (page view → install)

Once they tap through, the install decision is made in roughly 7 seconds. That's enough time to see:

- The first screenshot.
- The first line of description (the "promotional text" area on iOS).
- The big install button.

What's below the fold rarely gets seen. The 4000-character description you spent an afternoon writing on Play affects search ranking, not install rate.

The two levers that actually matter:

**Lever 1: The first screenshot.**

Three patterns that work, ranked by effectiveness:

1. **Single-purpose hero**, one device frame, one big benefit-statement headline overlaid. This is the highest-converting pattern in 2026.
2. **Split-screen before/after.** Works for productivity apps where the value is a transformation.
3. **Pure screenshot, no overlay.** Lower conversion but higher trust signal. Best for apps where the UI itself is the sell (clean, beautiful design).

What kills install rate: a screenshot with 4+ feature callouts crammed together. The reader can't parse it in 7 seconds and moves on.

**Lever 2: The subtitle / short description rewrite.**

The pattern: `[Verb] [outcome the user wants]`. Not features, outcomes.

| Weak | Strong |
|---|---|
| "Track your golf scores easily" | "Win your bet on the next round" |
| "AI-powered todo list" | "Plan your day in 30 seconds" |
| "Beautiful weather app" | "See if you need a jacket today" |

The rule: if a competitor could use the same line, it's too generic.

---

## The thing that boosts both at once

Reviews.

Going from 0 to 5 reviews changes the conversion rate more than any storefront change you can make. Going from 5 to 50 makes the rating count visible, which boosts CTR. Going from 50 to 500 stops mattering — diminishing returns.

The reason: the rating is a trust signal that compresses everything else. A 4.7 with 80 ratings tells a hesitant user "other people have tried this and weren't disappointed." No amount of clever screenshot work substitutes for that.

If your app is under 10 reviews, this is the only ASO work that has urgency. See [Getting Your First 10 App Reviews](/articles/getting-your-first-app-reviews) for the playbook.

---

## A test plan that takes two weeks

ASO conversion is testable, slowly. The cleanest sequence:

**Week 1:**

1. Take a screenshot of your current App Store Connect / Play Console analytics baseline.
2. Change exactly one element: first screenshot, OR subtitle, OR icon.
3. Wait 7 days.

**Week 2:**

4. Compare CTR and install rate against the baseline week.
5. Keep the change if it moved the right metric in the right direction. Revert if it didn't.
6. Repeat with the next element.

Cadence: one change every two weeks. Faster than that and you can't read the data through noise. Slower than that and you stop iterating before you find what works.

The hardest part is psychological: most changes don't move the number, and the temptation is to declare a test "inconclusive" and revert. Hold the changes that didn't break anything. They're not the bottleneck; the bottleneck is the next thing.

---

## The mistake to avoid

Polishing the description for hours while the first screenshot stays generic.

The description doesn't get read. The first screenshot is what someone uses to decide. If your screenshots look like every other app in your category, fixing them is worth more than a perfect description rewrite ever will be.

If you're staring at low conversion and don't know where to start: the first screenshot, in landscape, with the value proposition spelled out. Ship the change tomorrow, measure in seven days. <!-- DIN DATA: vad du faktiskt prövade på Excuse Caddie iOS som lyfte conversion -->
