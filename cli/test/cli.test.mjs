import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist", "index.js");

function run(...args) {
  return execFileSync(process.execPath, [dist, ...args], {
    cwd: path.join(__dirname, "..", ".."),
    encoding: "utf8",
  });
}

test("browse lists all 9 categories with counts", () => {
  const out = run("browse");
  for (const c of ["Agent Setup", "Architecture Stack", "Build Ship", "PRD Spec", "Testing Quality"]) {
    assert.match(out, new RegExp(c));
  }
});

test("search finds prompts by keyword", () => {
  const out = run("search", "agent");
  assert.match(out, /AGENTS\.md Generator/);
});

test("show prints the prompt body", () => {
  const out = run("show", "agent-setup-agents-md-generator");
  assert.match(out, /Generate a complete AGENTS\.md file/);
});

test("workflow lists the 9-step playbook", () => {
  const out = run("workflow");
  assert.match(out, /00 Environment/);
  assert.match(out, /09 Iterate/);
});
