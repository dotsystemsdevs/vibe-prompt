#!/usr/bin/env node
import { loadLibrary, findPromptRoot, searchPrompts } from "./lib/library.js";

const WORKFLOW = [
  "00 Environment",
  "01 Deep Research",
  "02 PRD",
  "03 Stack",
  "04 Context",
  "05 Build",
  "06 Quality",
  "07 Ship",
  "08 Launch",
  "09 Iterate",
];

function printCategories(prompts: { categoryName: string }[]): void {
  const counts = new Map<string, number>();
  for (const p of prompts) counts.set(p.categoryName, (counts.get(p.categoryName) ?? 0) + 1);
  for (const [name, count] of counts) console.log(`${name} (${count})`);
}

async function copyToClipboard(text: string): Promise<void> {
  try {
    const { default: copy } = await import("clipboardy");
    copy.writeSync(text);
    console.log("copied to clipboard");
  } catch (err) {
    console.error("failed to copy to clipboard:", cleanErr(err));
    process.exitCode = 1;
  }
}

function cleanErr(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

async function runTUI(): Promise<void> {
  const [{ default: React }, { render }, { default: TUI }] = await Promise.all([
    import("react"),
    import("ink"),
    import("./tui.js"),
  ]);
  render(React.createElement(TUI));
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] ?? "browse";
  const rest = args.slice(1);

  try {
    switch (command) {
      case "browse":
      case "b": {
        const root = findPromptRoot();
        const prompts = await loadLibrary(root);
        const target = rest.join(" ").toLowerCase();
        if (!target) {
          printCategories(prompts);
          break;
        }
        const matches = prompts.filter((p) => p.categoryName.toLowerCase().includes(target));
        if (matches.length === 0) {
          console.log("no category matched");
          break;
        }
        for (const p of matches) console.log(`${p.title} | ${p.slug}`);
        break;
      }
      case "search":
      case "s": {
        const query = rest.join(" ").toLowerCase();
        if (!query) {
          console.error("usage: vibeprompt search <query>");
          process.exitCode = 1;
          break;
        }
        const prompts = await loadLibrary();
        for (const p of searchPrompts(prompts, query)) console.log(`${p.title} | ${p.slug}`);
        break;
      }
      case "show":
      case "cat": {
        const slug = rest[0];
        if (!slug) {
          console.error("usage: vibeprompt show <slug>");
          process.exitCode = 1;
          break;
        }
        const prompts = await loadLibrary();
        const p = prompts.find((x) => x.slug === slug || x.title.toLowerCase() === slug.toLowerCase());
        if (!p) {
          console.error(`no prompt found for: ${slug}`);
          process.exitCode = 1;
          break;
        }
        console.log(p.prompt);
        break;
      }
      case "copy":
      case "cp": {
        const slug = rest[0];
        if (!slug) {
          console.error("usage: vibeprompt copy <slug>");
          process.exitCode = 1;
          break;
        }
        const prompts = await loadLibrary();
        const p = prompts.find((x) => x.slug === slug || x.title.toLowerCase() === slug.toLowerCase());
        if (!p) {
          console.error(`no prompt found for: ${slug}`);
          process.exitCode = 1;
          break;
        }
        await copyToClipboard(p.prompt);
        break;
      }
      case "workflow":
      case "w":
        console.log(WORKFLOW.join("\n"));
        break;
      case "scan":
      case "audit":
        console.error(
          "PageLens audit is not yet wired to the CLI. Run it from https://vibeprompt.app/scan or open an issue."
        );
        process.exitCode = 1;
        break;
      case "tui":
        runTUI();
        break;
      case "help":
      case "-h":
      case "--help":
        console.log(
          [
            "vibeprompt - browse and run vibeprompt prompts from the terminal",
            "",
            "Usage:",
            "  vibeprompt browse [category]   list categories or prompts in a category",
            "  vibeprompt search <query>      full-text search across prompts",
            "  vibeprompt show <slug|title>   print a prompt to stdout",
            "  vibeprompt copy <slug|title>   copy a prompt to the clipboard",
            "  vibeprompt workflow            show the 9-step playbook",
            "  vibeprompt scan <url>          PageLens audit (not yet wired)",
            "  vibeprompt tui                 open the interactive terminal UI",
          ].join("\n")
        );
        break;
      default:
        console.error(`unknown command: ${command}`);
        process.exitCode = 1;
    }
  } catch (err) {
    console.error("error:", cleanErr(err));
    process.exitCode = 1;
  }
}

main();
