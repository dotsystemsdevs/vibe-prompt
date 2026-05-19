---
title: "Store Listing Anatomy: The Elements That Decide if Someone Installs"
description: "A store listing has eleven editable fields. Three of them carry most of the install decision. Here's a field-by-field breakdown for App Store and Play Store, with the priority order and the patterns that convert."
date: "2026-05-16"
image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
imageAlt: "App store listing on a phone screen"
author: "vibeprompt"
category: method
---

A store listing is paperwork until you realize it's the only sales surface 99% of your installs will ever see. Most of them never read your homepage, never visit your social, never see your launch post. They search a term, see a tile, tap it, and decide in seconds.

This is a field-by-field tear-down of what's actually on a store listing, what each field does, and how much it moves the install number.

---

## The fields, ranked by impact

There are roughly eleven editable elements per listing per platform. Their actual impact is not equal:

| Tier | Field | Why it matters |
|---|---|---|
| 1 | Icon | Visible everywhere, biggest CTR lever |
| 1 | First screenshot | First thing seen on the page |
| 1 | App name + subtitle (or short description) | The headline + tagline |
| 2 | Rating count and average | Trust signal, compounds with time |
| 2 | Screenshots 2-3 | Decision support after the first |
| 3 | Long description | Almost nobody reads it, but Play indexes it |
| 3 | Promotional text (iOS) | Updateable without resubmission |
| 4 | Category | Affects browse impressions, not install rate |
| 4 | Developer name | Trust signal at large scale, not for indie |
| 5 | Privacy nutrition label | Visible, but rarely a decision factor |
| 5 | Version notes / what's new | Almost nobody reads this either |

The big lesson: spend 80% of your listing time on tier 1, 15% on tier 2, 5% on everything else. The temptation is to perfect the long description because you can see it. The reality is almost nobody scrolls that far.

---

## Tier 1, one by one

### The icon

The single most-viewed element. Visible in search, browse, home screen post-install, and notification badges.

The patterns that win in 2026:

- **One shape, one color, instant.** Apps like Bear, Pocket, Stripe — the icon is a single readable mark, not a logo with text.
- **High contrast.** Looks crisp at 60px, not just 1024px. Test on a phone, not in Figma.
- **Distinct from your category.** If you make a productivity app and your icon is a checkmark or list, you're invisible in the search results next to 20 other productivity apps with checkmarks or lists.

What kills icons: tiny text, full-photo backgrounds, gradients that go muddy at small sizes. <!-- DIN DATA: Slothy och Excuse Caddie icon-design — vad funkar bättre och varför -->

### The first screenshot

Worth its own [conversion rate article](/articles/app-store-conversion-rate-deep-dive). The 30-second version:

- Landscape orientation outperforms portrait for hero screenshots in 2026. Apple now shows two side-by-side, which doubles the readable area for landscape.
- One headline, one product visual. Not a tour.
- The headline is a benefit statement: what the user gets, not what the feature is named.

### The app name and subtitle (or short description)

The headline + tagline pair. These show in three places: search results, the product page header, and notifications.

**The combination that converts:**

| App name | Subtitle |
|---|---|
| `Brand` | `What it does in 5 words` |
| `Brand: Outcome` | `How it does it in 5 words` |

Real examples:

- "Slothy: Daily Todo & Planner" — `Slothy: Daily Todo & Planner`. Name combines brand + category. Subtitle slot is where the differentiation lives.
- "Excuse Caddie: Golf Alibis" — brand + outcome. Distinctive enough to stand out from generic "golf score tracker" listings.

The rule: if your app name + subtitle could describe any of your top 5 competitors, rewrite. The differentiation has to be readable in under 2 seconds.

---

## Tier 2, the trust layer

### Rating count and average

The numbers that matter:

- **0 ratings:** worst-case. The listing looks abandoned.
- **5 ratings, 4.5+ average:** unlocks the click-through. Most users skip apps with zero ratings; five is the threshold where it stops feeling broken.
- **20+ ratings, 4.5+ average:** stops being a friction point. Above this, going from 50 → 500 ratings doesn't materially change install rate.

The rating field is the one element you cannot fix by editing. You can only fix it by getting reviews. If your app is sub-5 ratings, [Getting Your First 10 App Reviews](/articles/getting-your-first-app-reviews) is the highest-ROI work available.

### Screenshots 2-3

Screenshots 2 and 3 are seen by users who clicked through but weren't fully convinced. They're the "tell me more" panel.

The pattern that converts: each screenshot answers one objection.

- Screenshot 1: "What is this?" (hero, single message)
- Screenshot 2: "How does it work?" (main flow)
- Screenshot 3: "Why this one?" (key differentiator vs competitors)

Screenshots 4-10 exist mostly for the screenshot-rich pattern that scroll-pads competing apps. They get diminishing attention. Don't over-invest.

---

## Tier 3 and below

### Long description

On iOS, Apple does not index the description for search. Almost nobody reads it. The investment-to-impact ratio is awful.

On Play, Google indexes the full long description. It matters for ASO ranking but not for install conversion (it's below the fold, behind a "more" tap on most devices).

**The minimum-viable description that works on both stores:**

1. **Lead with the value statement** (1 sentence, mirrors your subtitle).
2. **A 3-5 bullet list of what the app does**, each bullet a single feature.
3. **A "perfect for" line** with 3 use cases.
4. **A footer with privacy + support contact**.

Total: 200-400 words. More than that is wasted. Less than that and Play's ASO ranking suffers because there's nothing to index.

### Promotional text (iOS only)

170 characters, updateable without resubmission. The only listing field that's editable without going through review.

Use it for: a launch announcement, a current promotion, a recent press mention, a new feature highlight. It shows above the description and is one of the more visible pieces of text on the page.

Underused field. Almost every indie app leaves it blank. <!-- DIN DATA: vad du har i promo text för dina iOS-appar nu -->

### Category

Affects which browse lists you appear in, not search ranking. For most indie apps, browse traffic is 5-20% of impressions, so this matters less than the search-driven fields.

Pick the most accurate, not the most popular. A small app in a niche category ranks higher in browse than the same app drowned in a popular one.

---

## What to do this week

If you have a live listing, audit it against tier 1 in this order:

1. Look at your icon next to 5 competitor icons in a search result. Does yours stand out, blend in, or disappear?
2. Take the subtitle and read it aloud. Could it describe a competitor? If yes, rewrite.
3. Open your first screenshot on a phone. Can you read the headline in 1 second? If no, redesign.

If the answer to any of those is "no," fix that one element. Ship the change. Wait 14 days. Measure CTR and install rate against the previous 14 days.

Don't change two things at once. Don't try to nail it on the first attempt. The work that compounds is the work that iterates.

---

## The mistake to avoid

Treating the store listing as a one-time task you finish at launch.

The listings that convert in 2026 are the ones that have been iterated 6-10 times since launch. The teams who win at this update their first screenshot every quarter, swap their subtitle every six months, and treat the icon as the only "permanent" element on the page.

If you launched and never touched the listing since, your install rate is leaving real money on the table. The single highest-leverage thing you can do today: change one tier-1 element, wait two weeks, see what moved.
