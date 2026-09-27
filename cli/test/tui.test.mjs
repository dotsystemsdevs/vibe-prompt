import React from "react";
import { render } from "ink-testing-library";
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const distTui = require.resolve(path.join(__dirname, "..", "dist", "tui.js"));

test("TUI renders categories and prompt count from the library", async () => {
  const mod = await import(pathToFileURL(distTui));
  const App = mod.default ?? mod;
  const { lastFrame } = render(React.createElement(App));
  await new Promise((r) => setTimeout(r, 400));
  const frame = lastFrame() ?? "";
  assert.match(frame, /vibeprompt/);
  assert.match(frame, /AGENTS\.md Generator/);
  assert.match(frame, /56 prompts/);
});
