# vibeprompt CLI

Browse, search, copy, and run vibeprompt prompts from your terminal.

## Install

```bash
npm install -g ./cli   # from the repo root, or after publishing:
npm install -g vibeprompt
```

## Usage

```bash
vibeprompt                     # alias for browse
vibeprompt browse              # list all categories
vibeprompt browse "Agent Setup"  # list prompts in a category
vibeprompt search "tdd"        # full-text search across all prompts
vibeprompt show <slug>         # print a prompt to stdout
vibeprompt show "AGENTS.md Generator"  # fuzzy: works with a title too
vibeprompt copy <slug>         # copy a prompt to the clipboard
vibeprompt workflow            # show the 9-step playbook
vibeprompt tui                 # open the interactive terminal UI
```

The TUI supports arrow keys to move, Enter to open a prompt detail pane,
`s` to search, `c` to cycle categories, and `Esc` to back out or quit.

## How it works

The CLI reads prompts straight from the `prompt-library/` folder. It finds it
by walking up from the current directory, or you can point at it explicitly:

```bash
VIBEPROMPT_ROOT=/path/to/vibe-prompt/prompt-library vibeprompt browse
```

## Development

```bash
npm install
npm run dev -- tui # run the TUI from source (no build step)
npm run build      # tsup -> dist/
npm run typecheck  # tsc --noEmit
npm test           # build + run the CLI/TUI test suite
```

> `npm run dev` without the `tui` argument runs the default `browse` command
> and just prints the category list. Pass `tui` to get the interactive UI.