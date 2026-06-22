// Lightweight cookbook nav list for the (client) navbar submenu.
// Kept separate from workflow-data.ts on purpose: importing the full recipe
// data into a client component pulls ~107KB of lesson/task content into the
// client bundle on EVERY page. The navbar only needs step + title + emoji.
export const WORKFLOW_NAV: { step: string; title: string; emoji: string }[] = [
  { step: "intro", title: "Start here", emoji: "🍳" },
  { step: "00", title: "Environment", emoji: "⚙️" },
  { step: "01", title: "Deep Research", emoji: "🔍" },
  { step: "02", title: "PRD", emoji: "📝" },
  { step: "03", title: "Stack", emoji: "🎨" },
  { step: "04", title: "Context", emoji: "🗂️" },
  { step: "05", title: "Build", emoji: "🔄" },
  { step: "06", title: "Quality", emoji: "🛡️" },
  { step: "07", title: "Ship", emoji: "🚀" },
  { step: "08", title: "Launch", emoji: "📣" },
  { step: "09", title: "Iterate", emoji: "🔁" },
];
