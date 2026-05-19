---
title: "ASO Keywords That Actually Move Installs"
description: "Most ASO advice is theory from people who haven't shipped. Here's what actually changes impressions, page views, and installs across the App Store and Play Store, with the keyword fields that matter and the ones that don't."
date: "2026-05-18"
image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80"
imageAlt: "Magnifying glass over a smartphone search field"
author: "vibeprompt"
category: method
---

ASO is mostly noise. Half the advice you find online is from agencies selling tools, half is from people who tested one app once and built a theory. The actual mechanics are simpler than either makes it sound, and a handful of fields move 90% of the result.

This is what actually shows up in the impressions and install graph, separated by store, with the tactics that move them.

---

## What you're actually optimizing

The funnel:

```
impressions → product page views → installs
```

ASO touches two of those stages:

- **Impressions** — your listing shows up in search and category browse.
- **Product page views** — someone clicks through to read more.

Installs are downstream of those. They're driven by the listing's storefront elements (icon, first screenshot, subtitle, rating), not by keywords. **Keywords get you seen. The listing converts.** Mixing them up is the most common ASO mistake.

If your install number is low but page views are healthy, the problem is the storefront, not the keywords. If page views are low despite a lot of impressions, the keywords are pulling the wrong audience.

---

## What weighs how much, per store

The fields you can edit, ranked by impact.

### App Store (iOS)

| Field | Search weight | Notes |
|---|---|---|
| App name | Highest | 30 chars, every word indexed |
| Subtitle | High | 30 chars, every word indexed |
| Keyword field | High | 100 chars, comma-separated, never shown to users |
| Description | Low | Apple does not index it for search |
| Promotional text | None | 170-char banner, not searchable |
| Category | High | Indirect — drives browse traffic |

The big rule: **Apple does not index the description.** Stuffing keywords there is wasted effort. Subtitle and the keyword field are where the work goes.

### Google Play (Android)

| Field | Search weight | Notes |
|---|---|---|
| App name | Highest | 30 chars |
| Short description | High | 80 chars |
| Long description | High | 4000 chars, fully indexed |
| Category | High | Indirect via browse |

The big rule: **Google indexes the long description.** This is the opposite of Apple. Repeating your target keywords naturally 2-3 times in the long description is worth doing for Play. Doing the same on iOS is wasted effort.

---

## How to actually find keywords

Skip the paid tools at first. The free signal is usually enough:

1. **App Store Connect Analytics → Search Terms.** Once your app has any traffic, this shows the exact terms people typed before tapping your listing. Best free keyword source you have.
2. **Play Console → Statistics → Acquisition reports → Play Store organic search.** Same thing on the Android side, with the actual queries.
3. **Type your concept into the search bar on both stores.** Autocomplete reflects real query volume. Note the order — the top suggestion has materially more volume than the third.
4. **Look at top 5 competitors.** What's in their title and subtitle? Don't copy, but use it to map the language people actually use for your category.

What to skip: keyword difficulty scores from third-party tools. They estimate, badly, and don't account for category context.

---

## The keyword field on iOS, the one that confuses everyone

The 100-character keyword field has rules people violate by accident.

**Do:**

- Use commas only. No spaces. `golf,excuses,scorecard` not `golf, excuses, scorecard` — spaces waste characters.
- Skip plurals if the singular is there. Apple matches stems, so `excuse` already covers `excuses`.
- Combine words you wouldn't expect to be combined. Apple matches multi-word queries by combining any two indexed terms across name + subtitle + keyword field.
- Skip your app name and category. Both are already indexed automatically. Wasting characters on them is the most common mistake.

**Don't:**

- Repeat words across name, subtitle, and keywords. Apple weights each one separately, but repeats give no additional boost.
- Use competitor names. Against policy, and it doesn't help because users already searching the competitor name aren't your audience.
- Pack with English variants if your app is localized. Localize the keyword field per locale instead.

---

## What changes the impressions number

The impressions graph in App Store Connect reflects three things:

- **Search impressions** — driven by keywords and ranking.
- **Browse impressions** — driven by category, sub-category, and being featured in any list (Today, Editor's Choice, etc.).
- **Referrer impressions** — driven by direct links and external referrers.

For a brand-new app, browse is small (you're buried in category lists) and referrers are tiny (no inbound links yet). 80%+ of early impressions are search. That's why ASO keywords matter more in the first 30 days than ever again.

Once you have an established install base, the equation flips: browse and referrer dominate, keywords matter less, and ratings matter more. The reason ASO advice contradicts itself is that timeline differences aren't usually labeled.

<!-- DIN DATA: jämför impressions-mix för Slothy iOS vs Excuse Caddie iOS, vad har funkat bäst keyword-mässigt -->

---

## What changes the page-view number

Page views are mostly driven by the icon and the first three things visible in the search result:

- App name
- Subtitle
- The rating, if any

A keyword that gets you impressions but doesn't get clicked through is pulling the wrong audience or framing the app wrong in the subtitle. The fix is usually a subtitle rewrite, not a different keyword.

---

## A test you can run this week

ASO is testable, with caveats. Two changes worth running:

**Test 1: subtitle rewrite.** Change only the subtitle. Wait 14 days. Compare search impressions and conversion to page view from the App Store Connect Analytics tab against the previous 14 days. Effect size is usually visible if you cut the right way.

**Test 2: keyword field swap.** Swap roughly half the keywords for new ones based on what you found in Search Terms. Wait 14 days. Compare impressions on the new terms against the old ones. Either keep the swap or revert.

What not to test simultaneously: more than one of name, subtitle, keywords, and screenshots at the same time. You won't know which one moved the number.

---

## The mistake to avoid

Treating ASO like SEO. The two are surface-similar but the indexing rules and ranking signals are different.

**SEO** is one big index that you spend years building authority into via backlinks. **ASO** is a per-store index that rebuilds your ranking every time you change a metadata field. Iteration is cheap, fast, and reversible.

The teams that win at ASO ship a metadata change every two weeks for the first three months after launch, then settle. The teams that lose either ignore ASO entirely or pick a "perfect" set of keywords on launch day and never revisit them. <!-- DIN DATA: hur ofta du faktiskt itererat på Slothy + Excuse Caddie metadata -->
