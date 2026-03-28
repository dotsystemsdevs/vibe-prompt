"""
One-off: translate Swedish prompt library markdown to English.
Preserves fenced code blocks; applies header standardization.
"""
from __future__ import annotations

import re
import time
import warnings
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
warnings.filterwarnings("ignore", message="Unverified HTTPS request")

_orig_requests_get = requests.get


def _requests_get_verify_optional(*args, **kwargs):
    kwargs.setdefault("verify", False)
    kwargs.setdefault("timeout", 45)
    return _orig_requests_get(*args, **kwargs)


requests.get = _requests_get_verify_optional  # type: ignore[method-assign]

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1] / "promt draft"
translator = GoogleTranslator(source="sv", target="en")

HEADER_MAP = [
    ("## Syfte", "## Purpose"),
    ("## Instruktioner", "## Instructions"),
    ("## Output-format", "## Output Format"),
    ("## Kvalitetskriterier", "## Quality Criteria"),
    ("## Varianter", "## Variants"),
]


def ascii_prefer(s: str) -> str:
    """Prefer ASCII for common Latin-1 remnants after translation."""
    repl = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u00a0": " ",
    }
    for k, v in repl.items():
        s = s.replace(k, v)
    return s


# Heuristic: ASCII-only Swedish in this corpus; include common tokens.
SWEDISH_HINT = re.compile(
    r"[åäöÅÄÖ]|"
    r"\b(och|att|fran|från|till|med|som|är|var|ska|kan|inte|eller|"
    r"den|det|en|ett|om|av|på|pa|här|har|man|när|nar|där|dar|sedan|också|ocksa|"
    r"utan|genom|inom|över|"
    r"skapa|skriv|lägg|lagg|mål|mal|krav|beskriv|variant|dag|plan|syfte|"
    r"instruktion|kvalitet|egen|själv|sjalv|utveckling|kodning|använda|anvand|"
    r"definiera|bifoga|sätt|satt|hög|hog|minimal|enkelt|återanvända|ateranvand|"
    r"kopiera|nedan|håller|haller|praktisk|fokus|leverans|milstolpe|kaos|"
    r"fart|verifiering|kriterie|undersök|undersok|prompten|uppgift|uppgifts|"
    r"begränsning|begransning|tonalitet|iteration|förbättring|forbattring|vardag|"
    r"kritisk|precision|tolkning|exempel|delmoment|längd|langd|onskad|onskat|"
    r"skicka|bygga|första|forsta|ifall|enbart|vill|dvs|dvs\.|"
    r"exempelvis|nästa|nasta|tidigare|sammanfattning|checklista)\b",
    re.I,
)


def looks_swedish(block: str) -> bool:
    return bool(SWEDISH_HINT.search(block))


def translate_paragraph(block: str) -> str:
    block = block.strip()
    if not block:
        return block
    if not looks_swedish(block):
        return block
    try:
        out = translator.translate(block)
        time.sleep(0.12)
        return ascii_prefer(out)
    except Exception:
        time.sleep(1.0)
        try:
            out = translator.translate(block)
            return ascii_prefer(out)
        except Exception as e:
            print(f"TRANSLATE_FAIL: {e!r} :: {block[:80]!r}...")
            return block


def process_markdown_segment(segment: str) -> str:
    """Translate prose in a markdown segment (not inside code fence)."""
    if not segment:
        return segment
    # Split on double newlines to get paragraphs
    parts = re.split(r"(\n\n+)", segment)
    out = []
    for i, p in enumerate(parts):
        if i % 2 == 1:  # delimiters
            out.append(p)
            continue
        if not p.strip():
            out.append(p)
            continue
        out.append(translate_paragraph(p))
    return "".join(out)


def process_file(path: Path) -> tuple[bool, str]:
    raw = path.read_text(encoding="utf-8")
    original = raw

    for sv, en in HEADER_MAP:
        raw = raw.replace(sv, en)

    chunks = re.split(r"(```[\s\S]*?```)", raw)
    rebuilt = []
    for i, ch in enumerate(chunks):
        if ch.startswith("```") and ch.endswith("```"):
            rebuilt.append(ch)
        else:
            rebuilt.append(process_markdown_segment(ch))
    new_text = "".join(rebuilt)

    if new_text == original:
        return False, "unchanged"

    path.write_text(new_text, encoding="utf-8", newline="\n")
    return True, "updated"


def main() -> None:
    md_files = sorted(ROOT.rglob("*.md"))
    updated = 0
    skipped: list[tuple[str, str]] = []
    for p in md_files:
        rel = str(p.relative_to(ROOT))
        changed, reason = process_file(p)
        if changed:
            updated += 1
            print(f"OK {rel}")
        else:
            skipped.append((rel, reason))
    print(f"\nUpdated: {updated}")
    print(f"Skipped: {len(skipped)}")
    for rel, r in skipped:
        print(f"  {rel}: {r}")


if __name__ == "__main__":
    main()
