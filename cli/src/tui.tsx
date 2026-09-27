import React, { useState, useEffect } from "react";
import { Box, Text, useApp, useInput } from "ink";
import TextInput from "ink-text-input";
import { loadLibrary, searchPrompts, type Prompt } from "./lib/library.js";

function truncate(t: string, max: number): string {
  if ([...t].length <= max) return t;
  return [...t].slice(0, max - 1).join("") + "…";
}

function App() {
  const { exit } = useApp();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filtered, setFiltered] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState<Prompt | null>(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadLibrary().then((p) => {
      setPrompts(p);
      setFiltered(p);
      setCategories(["All", ...new Set(p.map((x) => x.categoryName))]);
    });
  }, []);

  useEffect(() => {
    let list = prompts;
    if (category !== "All") list = list.filter((p) => p.categoryName === category);
    if (query.trim()) list = searchPrompts(list, query);
    setFiltered(list);
    setSelected(0);
    setDetail(null);
  }, [category, query, prompts]);

  useInput((input, key) => {
    if (key.escape) {
      if (searching) {
        setQuery("");
        setSearching(false);
      } else if (detail) {
        setDetail(null);
      } else {
        exit();
      }
      return;
    }
    if (searching) return;
    if (key.upArrow && !detail) setSelected((s) => Math.max(0, s - 1));
    if (key.downArrow && !detail) setSelected((s) => Math.min(filtered.length - 1, s + 1));
    if (key.return) {
      if (detail) {
        setDetail(null);
      } else if (filtered[selected]) {
        setDetail(filtered[selected]);
      }
      return;
    }
    if (input.toLowerCase() === "s") setSearching(true);
    if (input.toLowerCase() === "c") {
      const idx = categories.indexOf(category);
      setCategory(categories[(idx + 1) % categories.length]);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="green">
        vibeprompt
      </Text>
      <Text dimColor>arrows: move, enter: open/close, s: search, c: category, esc: quit/back</Text>
      <Text dimColor>category: {category}</Text>
      {searching && (
        <Box>
          <Text>search: </Text>
          <TextInput value={query} onChange={setQuery} />
        </Box>
      )}
      <Box marginTop={1} flexGrow={1}>
        <Box borderStyle="round" width={44} flexDirection="column" paddingX={1}>
          <Text bold color="yellow">
            {filtered.length} prompts
          </Text>
          {filtered.map((p, i) => (
            <Box key={p.slug}>
              <Text color="cyan">{i === selected ? "› " : "  "}</Text>
              <Text bold={i === selected}>{truncate(p.title, 36)}</Text>
            </Box>
          ))}
          {filtered.length === 0 && <Text dimColor>(none)</Text>}
        </Box>
        <Box borderStyle="round" marginLeft={1} flexGrow={1} flexDirection="column" paddingX={1}>
          {detail ? (
            <>
              <Text bold>
                {detail.title}{" "}
                <Text dimColor>
                  ·{detail.categoryName}/{detail.fileName}
                </Text>
              </Text>
              {detail.whenToUse && (
                <>
                  <Text dimColor>When to use</Text>
                  <Text>{detail.whenToUse}</Text>
                  <Text dimColor>Prompt</Text>
                </>
              )}
              <Text>{detail.prompt}</Text>
            </>
          ) : (
            <Text dimColor>select a prompt (enter)</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
