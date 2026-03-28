export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  links?: Array<{
    label: string;
    url: string;
    description?: string;
  }>;
};

export type Article = {
  slug: string;
  title: string;
  icon: string;
  hook: string;
  kicker: string;
  readTime: string;
  publishedAt: string;
  publishedDate: string;
  excerpt: string;
  sections: ArticleSection[];
};

const ARTICLES: Article[] = [
  {
    slug: "what-is-vibe-coding-and-why-prompting-matters",
    title: "What is vibe coding, and why does prompting matter?",
    icon: "⚡",
    hook: "Tired of vague AI answers? This guide shows how better prompting turns chaos into clear, shippable results.",
    kicker: "Vibe Coding 101",
    readTime: "11 min read",
    publishedAt: "Jan 10",
    publishedDate: "2026-01-10",
    excerpt:
      "Start here if you want AI output that actually makes sense: what vibe coding is, where it goes wrong, and how to prompt for better results.",
    sections: [
      {
        heading: "What vibe coding is",
        paragraphs: [
          "Vibe coding means describing product intent, user flow, and visual direction in natural language so AI can help build faster.",
        ],
      },
      {
        heading: "What does the name 'vibe coding' come from?",
        paragraphs: [
          "The term became popular because people described the feeling, direction, and behavior of a product before talking low-level implementation.",
          "You can think of it as vibe first, refine later: idea and flow first, then constraints, then quality improvements.",
        ],
      },
      {
        heading: "The practical meaning",
        bullets: [
          "First pass: creative direction and structure.",
          "Second pass: clear requirements and constraints.",
          "Third pass: debugging, quality checks, and polish.",
        ],
      },
      {
        heading: "Why prompting is the real skill",
        bullets: [
          "Prompts define scope and reduce hallucinations.",
          "Prompts set quality expectations before code is generated.",
          "Prompts create repeatable output across sessions.",
        ],
      },
      {
        heading: "Beginner truth",
        paragraphs: ["If output is messy, improve the prompt first. Better prompting usually beats switching tools every day."],
      },
      {
        heading: "Common misunderstanding",
        paragraphs: [
          "Some people think 'vibe' means random. In strong workflows, it means fast ideation first, then disciplined refinement.",
        ],
      },
      {
        heading: "Why this matters in real projects",
        paragraphs: [
          "Most beginners assume tool quality is the main reason for good or bad results. In practice, two people using the same model can get completely different outcomes because one person gives structured prompts while the other gives vague requests. Clear prompting reduces rework, lowers frustration, and makes progress measurable. You can compare output against your own acceptance criteria instead of guessing whether the result is good enough.",
          "This is why teams that take prompting seriously ship faster even without using the newest model. Their prompts encode product context, user intent, and quality standards up front.",
        ],
      },
      {
        heading: "A practical mini-example",
        paragraphs: [
          "Weak prompt: 'Make a dashboard for my app.' Strong prompt: 'Create a beginner-friendly dashboard for first-time users. Include revenue card, recent activity list, and clear empty states. Keep layout mobile-first and avoid adding new dependencies. Done when all sections render with placeholder data and no TypeScript errors.' The second version gives purpose, scope, constraints, and a finish line.",
        ],
      },
    ],
  },
  {
    slug: "awesome-list-prompting-categories",
    title: "Awesome list: prompting categories that actually help",
    icon: "🧭",
    hook: "One page. Real links. Best tools, docs, communities, and references to level up your vibe coding fast.",
    kicker: "Awesome List",
    readTime: "14 min read",
    publishedAt: "Jan 18",
    publishedDate: "2026-01-18",
    excerpt:
      "A curated resource hub inspired by Awesome Vibe Coding so you can skip noise and open the right links immediately.",
    sections: [
      {
        heading: "Main index",
        paragraphs: ["Start here, then pick one category at a time instead of trying every tool at once."],
        links: [
          {
            label: "Awesome Vibe Coding (GitHub)",
            url: "https://github.com/filipecalegario/awesome-vibe-coding",
            description: "Primary curated list with tools, docs, communities, and news.",
          },
        ],
      },
      {
        heading: "About the concept",
        links: [
          {
            label: "Andrej Karpathy on X",
            url: "https://x.com/karpathy/status/1886192184808149383",
            description: "Popular post that introduced the phrase 'vibe coding'.",
          },
          {
            label: "Vibe coding - Wikipedia",
            url: "https://en.wikipedia.org/wiki/Vibe_coding",
            description: "Background and references around the term.",
          },
          {
            label: "Vibe coding is passe - The New Stack",
            url: "https://thenewstack.io/vibe-coding-is-passe-agentic-engineering-is-here/",
            description: "Discussion on evolution toward agentic engineering.",
          },
        ],
      },
      {
        heading: "Browser-based tools",
        links: [
          { label: "Bolt.new", url: "https://bolt.new", description: "Prompt, run, edit, deploy apps quickly." },
          { label: "Lovable", url: "https://lovable.dev", description: "Idea-to-app flow with AI generation." },
          { label: "v0 by Vercel", url: "https://v0.dev", description: "Build app and UI flows with Next.js focus." },
          { label: "Trickle AI", url: "https://www.trickle.so", description: "Visual co-creation with prompt-driven workflows." },
          { label: "Firebase Studio", url: "https://firebase.studio", description: "Agentic cloud development environment." },
        ],
      },
      {
        heading: "IDEs and code editors",
        links: [
          { label: "Cursor", url: "https://cursor.com", description: "AI-first coding editor." },
          { label: "Windsurf", url: "https://windsurf.com", description: "Agentic IDE workflow." },
          { label: "Zed", url: "https://zed.dev", description: "Fast editor with AI capabilities." },
          { label: "GitHub Copilot", url: "https://github.com/features/copilot", description: "Pair programmer in IDE and terminal." },
        ],
      },
      {
        heading: "Plugins and extensions",
        links: [
          { label: "Cline", url: "https://github.com/cline/cline", description: "Autonomous coding agent extension for VS Code." },
          { label: "Roo Code", url: "https://github.com/RooVetGit/Roo-Code", description: "AI dev team modes for coding workflows." },
          { label: "Continue", url: "https://github.com/continuedev/continue", description: "Open-source AI coding agent for IDE and CLI." },
          { label: "Tabby", url: "https://github.com/TabbyML/tabby", description: "Self-hosted coding assistant." },
        ],
      },
      {
        heading: "Command line tools",
        links: [
          { label: "OpenAI Codex CLI", url: "https://github.com/openai/codex", description: "Terminal coding agent." },
          { label: "Claude Code", url: "https://github.com/anthropics/claude-code", description: "CLI agent for code tasks." },
          { label: "Aider", url: "https://github.com/Aider-AI/aider", description: "Git-first AI pair programming in terminal." },
          { label: "Gemini CLI", url: "https://github.com/google-gemini/gemini-cli", description: "Gemini in terminal workflows." },
        ],
      },
      {
        heading: "Task management and documentation",
        links: [
          { label: "vibe-kanban", url: "https://github.com/BloopAI/vibe-kanban", description: "Kanban for AI coding agents." },
          { label: "Claude Task Master", url: "https://github.com/eyaltoledano/claude-task-master", description: "Task management system for AI coding workflows." },
          { label: "AGENTS.md", url: "https://agents.md", description: "Open format for guiding coding agents." },
          { label: "Context7", url: "https://context7.com", description: "Version-specific docs for LLM workflows." },
          { label: "llms.txt", url: "https://llmstxt.org", description: "LLM-friendly documentation format." },
        ],
      },
      {
        heading: "Communities and social learning",
        links: [
          { label: "r/vibecoding", url: "https://www.reddit.com/r/vibecoding", description: "Community discussions and shared workflows." },
          { label: "r/ChatGPTCoding", url: "https://www.reddit.com/r/ChatGPTCoding", description: "Prompting and debugging discussions." },
          { label: "Vibehackers", url: "https://vibehackers.com", description: "Projects, resources, and job links." },
        ],
      },
      {
        heading: "News and social reads",
        links: [
          { label: "MIT Technology Review: What is vibe coding, exactly?", url: "https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/", description: "Mainstream explanation and debate around the term." },
        ],
      },
      {
        heading: "How to use this list effectively",
        paragraphs: [
          "Choose one tool per layer: one builder, one editor, one CLI. Then add one task management method and one docs standard. This avoids tool overload and helps you build a repeatable workflow faster.",
          "If you are beginner level, prioritize documentation and community links first. They reduce confusion and make every tool easier to use.",
        ],
      },
    ],
  },
  {
    slug: "what-is-prompting-and-why-it-matters",
    title: "What is prompting, and why do we need it?",
    icon: "🧠",
    hook: "If you want expert-level AI output, this is your playbook: from beginner basics to advanced prompting techniques.",
    kicker: "Prompting Mastery",
    readTime: "24 min read",
    publishedAt: "Jan 22",
    publishedDate: "2026-01-22",
    excerpt:
      "A complete prompting masterclass: practical principles, advanced techniques, and repeatable workflows for IDE and CLI use.",
    sections: [
      {
        heading: "What prompting actually is",
        paragraphs: [
          "Prompting is the process of translating human intent into structured machine instructions. In AI coding workflows, a prompt is not a single sentence trick. It is a compact specification containing product context, task boundaries, quality expectations, and a clear definition of done.",
          "Beginners often treat prompts like search queries, but professionals treat prompts like execution contracts. The difference is huge: one asks for ideas, the other directs implementation.",
        ],
      },
      {
        heading: "Why prompting is necessary (not optional)",
        paragraphs: [
          "Modern models are powerful but probabilistic. If your instruction is vague, the model fills the gaps with assumptions. Those assumptions may be reasonable, but they are often wrong for your exact codebase, user needs, or constraints. Prompting exists to reduce that ambiguity.",
          "Good prompting improves speed, consistency, and quality at the same time. It minimizes random refactors, lowers debugging time, and makes work reproducible across sessions and teammates.",
        ],
        bullets: [
          "Without prompting discipline: output drifts, scope expands, and rework explodes.",
          "With prompting discipline: output aligns, scope stays controlled, and iteration becomes measurable.",
        ],
      },
      {
        heading: "The basics of prompting (beginner version)",
        paragraphs: [
          "If you have ever said, 'the AI does not understand me', this section is for you. In most cases, the model is not broken. The issue is that the instruction is too vague, missing context, or missing output format.",
          "A prompt is simply the message you type to start the interaction. It can be a question, instruction, rewrite request, or multi-step task. The quality of that message strongly predicts the quality of the answer.",
        ],
      },
      {
        heading: "Key takeaways you can use immediately",
        bullets: [
          "A prompt is your starting instruction to the AI.",
          "You get out what you put in: better prompt, better answer.",
          "Use three principles: clarity, context, and output format.",
          "Prompting is a conversation; follow-up requests improve results.",
          "Practice beats perfection. You get better by doing.",
        ],
      },
      {
        heading: "The 3 key principles of effective prompting",
        paragraphs: [
          "These three principles are simple but powerful. If you apply them consistently, output quality usually improves within a few sessions.",
        ],
        bullets: [
          "Be clear and specific: simple language and concrete details.",
          "Provide context: who, what, why, constraints, and relevant files.",
          "Define output format: list, table, paragraph, checklist, or code block.",
        ],
      },
      {
        heading: "12 prompting techniques in simple language",
        paragraphs: [
          "Below is a beginner-friendly map of the most common prompting techniques. You do not need to master all of them on day one. Start with zero-shot, few-shot, and prompt chaining, then expand gradually.",
        ],
        bullets: [
          "Zero-shot prompting: ask for a task directly with no examples.",
          "Few-shot prompting: give examples first, then ask the model to continue the pattern.",
          "Meta prompting: tell the model how to think before it answers.",
          "Self-consistency: ask for multiple reasoning paths and pick the most reliable one.",
          "General knowledge prompting: ask the model to apply domain basics or common practices.",
          "Prompt chaining: split one large task into smaller sequential prompts.",
          "Tree of thoughts: explore different branches/options before choosing one path.",
          "RAG (retrieval-augmented generation): use documents/knowledge base before generating answers.",
          "Automatic reasoning and tool use: ask the model to use tools (search, calc, code, data) where needed.",
          "APE (automatic prompt engineering): ask the model to improve your prompt itself.",
          "Active prompt: generate prompt variants, test them, and choose the best one.",
          "Directional stimulus prompting: give hints/criteria to steer the answer in the direction you need.",
        ],
      },
      {
        heading: "Quick examples for each technique",
        bullets: [
          "Zero-shot: 'Explain cloud computing in simple terms.'",
          "Few-shot: 'Example: hi -> Hello! Example: thanks -> You're welcome! Now respond to: good morning.'",
          "Meta: 'Think like a teacher and explain this in 3 steps.'",
          "Self-consistency: 'Give three possible solutions and choose the best final answer.'",
          "General knowledge: 'Using common cybersecurity practice, explain how data breaches happen.'",
          "Prompt chaining: 'Step 1 summarize, Step 2 bullet points, Step 3 presentation outline.'",
          "Tree of thoughts: 'Explore three solution branches and compare pros/cons before deciding.'",
          "RAG: 'Using the attached document, summarize key findings and risks.'",
          "Tool use: 'Analyze this CSV and highlight anomalies with a short explanation.'",
          "APE: 'Rewrite my prompt to make it clearer and more accurate.'",
          "Active prompt: 'Generate three prompt versions and pick the highest-quality one.'",
          "Directional stimulus: 'Compare options focusing on cost, speed, and security.'",
        ],
      },
      {
        heading: "Clear and specific: before vs after",
        paragraphs: [
          "Vague prompt: 'Write a party invitation.' This forces the model to guess audience, tone, and details.",
          "Specific prompt: 'Write a fun invitation for a 10-year-old pool party on July 15 at 2 PM. Mention swimsuit and towel.' This gives enough direction to produce a useful first draft.",
        ],
      },
      {
        heading: "Context: why it changes everything",
        paragraphs: [
          "Context tells the model who the answer is for and why the task exists. Without context, answers are generic. With context, answers become relevant.",
          "High-context prompt example: 'Write a warm welcome email for moms who are new to technology. Explain what they will receive in simple language and keep tone supportive.'",
        ],
      },
      {
        heading: "Format control: request the shape of the answer",
        bullets: [
          "Ask for a bullet list if you want scanability.",
          "Ask for a table if you need side-by-side comparison.",
          "Ask for short paragraph if you need concise copy.",
          "Ask for a specific section structure when writing docs.",
        ],
        paragraphs: [
          "You do not have to accept the model's default format. Define the structure you want and you save editing time later.",
        ],
      },
      {
        heading: "Adding persona and audience",
        paragraphs: [
          "Once fundamentals are stable, add persona to guide tone and depth. Example: 'Act as a kindergarten teacher and explain solar eclipse to a curious 5-year-old using a playful analogy.'",
          "Persona works best when combined with context and format. Alone, it can still be too broad.",
        ],
      },
      {
        heading: "Follow-ups and threading",
        paragraphs: [
          "You rarely need a perfect first response. Ask follow-up instructions such as 'make this shorter', 'use a more formal tone', or 'give three variations'.",
          "This iterative back-and-forth is where prompting becomes efficient. Keep corrections focused instead of restarting from zero.",
        ],
      },
      {
        heading: "Practice challenge (10 minutes)",
        bullets: [
          "Step 1: Ask a simple prompt, like 'give me a dinner idea'.",
          "Step 2: Rewrite with context: health goals, time limit, audience.",
          "Step 3: Add persona: 'act as a nutritionist'.",
          "Step 4: Compare outputs and note what changed.",
        ],
        paragraphs: [
          "Repeat this on different topics for one week. You will quickly develop intuition for wording that produces strong responses.",
        ],
      },
      {
        heading: "Beginner FAQ (quick answers)",
        bullets: [
          "Do I need perfect grammar? No. Clear language is enough.",
          "How long should prompts be? As short as possible, as detailed as necessary.",
          "Can I ask AI to retry? Yes, follow-ups are core to good prompting.",
          "Can prompting work for image tools too? Yes, same principles apply.",
        ],
      },
      {
        heading: "The anatomy of an expert prompt",
        code: `Context:
- Stack, architecture, and relevant files

Task:
- Exact feature or fix to implement

Why:
- User outcome or business reason

Constraints:
- What must not change
- Dependency and style limits

Acceptance criteria:
- Objective done/not-done checks

Output format:
- Expected files, explanation style, and tests`,
      },
      {
        heading: "Beginner quickstart: the 5-part prompt",
        paragraphs: [
          "If you are new, use this format every time. It is simple, repeatable, and removes most beginner confusion from day one.",
        ],
        code: `Build: [what]
For: [who]
Must include: [3 concrete features]
Style: [visual direction]
Constraints: [no extra deps / keep simple / explain files]`,
      },
      {
        heading: "Beginner mistakes that destroy output quality",
        bullets: [
          "Too broad: 'build me an app' without scope.",
          "No acceptance criteria, so done/not-done is unclear.",
          "No user context, so output is generic.",
          "No constraints, so AI over-refactors unrelated code.",
        ],
      },
      {
        heading: "A beginner workflow that actually works",
        paragraphs: [
          "Start each session with one tiny target: one component, one endpoint, or one UX improvement. Run output quickly and compare against acceptance criteria. If it fails, add one correction sentence instead of requesting a full rewrite. This keeps context stable and teaches you cause-and-effect faster.",
          "Keep a small 'prompt -> result -> fix' note. After one week, you will have a personal prompt playbook that is better than random template hopping.",
        ],
      },
      {
        heading: "Checklist before you hit Enter",
        bullets: [
          "Did I define who this is for?",
          "Did I define exactly what must be built?",
          "Did I define constraints and non-negotiables?",
          "Did I define acceptance criteria?",
          "Did I ask for explanation if this is new to me?",
        ],
      },
      {
        heading: "What vs Why vs How (and why this separation matters)",
        paragraphs: [
          "Strong prompts separate intent from execution. 'What' defines the deliverable. 'Why' explains the outcome the user or business needs. 'How' can be constrained when necessary, but should often leave room for the model to choose implementation details.",
          "When teams skip the 'why', models optimize for surface completion instead of meaningful outcome. You get code that compiles but does not solve the right problem.",
        ],
      },
      {
        heading: "Prompting in IDE workflows",
        paragraphs: [
          "In an IDE assistant flow, prompting should happen at feature boundaries: before generating a component, before refactoring a module, and before debugging a failing behavior. Keep each prompt scoped to one change unit so diffs remain reviewable.",
        ],
        bullets: [
          "Start with file-level context, not whole-repo context.",
          "Ask for minimal diffs unless you explicitly want refactor proposals.",
          "Request explanation of trade-offs before accepting large architectural changes.",
        ],
      },
      {
        heading: "Prompting in CLI/agent workflows",
        paragraphs: [
          "In CLI agents, prompting is even more important because actions can span commands, files, and tests. Your prompt should explicitly define permissions, sequence, and stop conditions.",
          "A good CLI prompt tells the agent what to read first, what to change, how to validate, and what to report back.",
        ],
        code: `Read:
- AGENTS.md
- current task file

Implement:
- only task X
- keep changes minimal

Validate:
- run lint + tests for touched scope

Report:
- what changed
- why it changed
- any risks left`,
      },
      {
        heading: "Common prompting failures and how experts fix them",
        bullets: [
          "Failure: broad prompt with no acceptance criteria. Fix: define objective done checks.",
          "Failure: too much context dump. Fix: include only relevant architecture and files.",
          "Failure: hidden constraints not stated. Fix: surface non-negotiables at top of prompt.",
          "Failure: endless rewrite loops. Fix: iterative corrections focused on one defect type at a time.",
        ],
      },
      {
        heading: "Prompt quality rubric (expert checklist)",
        bullets: [
          "Clarity: Is the task unambiguous?",
          "Relevance: Is only necessary context included?",
          "Control: Are hard constraints explicit?",
          "Verifiability: Can success be tested objectively?",
          "Recoverability: If output fails, can prompt be corrected incrementally?",
        ],
      },
      {
        heading: "Before vs after: a practical transformation",
        paragraphs: [
          "Before: 'Improve signup.'",
          "After: 'Improve signup completion for first-time mobile users. Keep existing API and schema unchanged. Add inline validation, password strength hint, and clearer error states. Do not add dependencies. Done when user can submit valid form in one pass and all error states are accessible.'",
          "The second version works better because it encodes goal, constraints, and measurable success.",
        ],
      },
      {
        heading: "How to grow from beginner to expert prompt writer",
        paragraphs: [
          "Experts build personal prompt systems. They save templates, track failures, and refine language based on real outcomes. If a prompt works, keep it. If it fails, annotate why and update it.",
          "Over time you develop reusable prompt patterns for build, debug, refactor, test, and documentation tasks. This is how prompting becomes a leverage skill, not a one-time tactic.",
        ],
      },
      {
        heading: "Final takeaway",
        bullets: [
          "Prompting is communication engineering.",
          "Clear prompts reduce randomness and increase quality.",
          "The best prompt includes context, task, why, constraints, and acceptance criteria.",
          "If output is weak, improve prompt structure before changing tools.",
        ],
      },
    ],
  },
  {
    slug: "beginner-prompt-glossary",
    title: "Beginner prompt glossary: terms you should know",
    icon: "📚",
    hook: "Confused by AI terms? This glossary explains vibe coding and prompting concepts in plain language you can use today.",
    kicker: "Glossary",
    readTime: "22 min read",
    publishedAt: "Jan 25",
    publishedDate: "2026-01-25",
    excerpt:
      "An A-to-Z style glossary for prompting and vibe coding, with practical definitions that remove confusion fast.",
    sections: [
      {
        heading: "How to read this glossary",
        paragraphs: [
          "This is a practical, vibe-coding focused glossary. Each term is short and action-oriented, so you can apply it immediately in IDE or CLI workflows.",
        ],
      },
      {
        heading: "Prompts (core terms)",
        bullets: [
          "Prompt: The instruction you send to the model.",
          "Prompting: The skill of structuring instructions so output is useful and reliable.",
          "Prompt Template: A reusable prompt format you fill with project-specific details.",
          "Prompt Chain: A sequence of prompts where each output becomes input to the next step.",
          "Prompt Engineering: Designing prompts systematically for quality, consistency, and control.",
          "Zero-Shot Prompt: A prompt with no examples, only direct instruction.",
          "Few-Shot Prompt: A prompt with a few examples to teach pattern before the real task.",
          "N-Shot Prompting: General term for zero-shot, one-shot, few-shot, or more example-based prompting.",
        ],
      },
      {
        heading: "Zero-Shot Prompts",
        paragraphs: [
          "Zero-Shot Prompts contain no examples or exemplars in their input prompt. You rely on clear instructions, context, and constraints to guide the model.",
          "Example: 'Summarize this issue in 3 bullets, then propose one minimal fix with acceptance criteria.'",
        ],
      },
      {
        heading: "Prompting techniques",
        bullets: [
          "Chain-of-Thought (CoT): Ask for stepwise reasoning before final answer.",
          "Few-Shot CoT: Provide reasoning examples first, then request a new solution.",
          "Plan-and-Solve: Ask the model to create a plan first, then execute it.",
          "Least-to-Most Prompting: Solve easy subproblems first, then combine into harder solution.",
          "Step-Back Prompting: Ask for abstract overview before diving into implementation.",
          "Role Prompting: Assign a role (e.g., security reviewer, senior frontend engineer).",
          "Style Prompting: Specify tone and style (concise, formal, beginner-friendly).",
          "Input-Output Prompting: Show exact input/output pattern to control response format.",
          "Tree of Thoughts: Explore multiple reasoning branches before selecting one path.",
          "Thread-of-Thought: Keep reasoning coherent across long contexts and updates.",
          "Self-Consistency: Generate multiple reasoning paths and choose most stable answer.",
          "Decomposition Prompting: Split complex tasks into modular sub-tasks.",
          "Analogical Prompting: Solve new problem by mapping from similar known examples.",
          "Directional Stimulus Prompting: Add hints (e.g., optimize for cost + reliability).",
          "Emotion Prompting: Ask for supportive or empathetic framing when audience needs it.",
        ],
      },
      {
        heading: "Retrieval and tool-use terms",
        bullets: [
          "RAG (Retrieval-Augmented Generation): Retrieve external docs before generating answer.",
          "Context Window: Maximum amount of text/model state that can be used in one pass.",
          "Tool Use: The model calls tools (search, calculator, code execution, file ops).",
          "Automatic Reasoning and Tool Use: Model decides when and how to call tools per task.",
          "APE (Automatic Prompt Engineer): Model rewrites prompts to improve performance.",
          "Active-Prompt: Generate and test prompt variants, then keep best-performing version.",
          "Prompt Mining: Collect successful prompts from logs and turn them into templates.",
        ],
      },
      {
        heading: "General ML and LLM vocabulary",
        bullets: [
          "LLM: Large Language Model trained on large-scale text corpora.",
          "In-Context Learning (ICL): Model learns task pattern from prompt examples at inference time.",
          "Few-Shot Learning: Learning from a small number of examples.",
          "Fine-Tuning: Training model weights on domain/task-specific data.",
          "Hallucination: Fluent but incorrect or unsupported output.",
          "Greedy Decoding: Token selection strategy picking highest-probability token each step.",
          "Sequential Decoding: Generating output token by token over sequence.",
          "Softmax: Function converting logits into probabilities.",
          "Priming: Early prompt setup that biases later responses.",
          "Output Formatting: Rules for response structure (JSON, table, bullets, schema).",
          "Interpretability: Understanding why model produced a specific output.",
          "Debiasing: Techniques reducing biased or harmful model behavior.",
        ],
      },
      {
        heading: "Guardrails and safety terms",
        bullets: [
          "Guardrails: Rules and checks to keep AI output safe and in-scope.",
          "Jailbreaking: Attempts to bypass model safety or policy constraints.",
          "Policy Constraints: Non-negotiable restrictions (privacy, security, compliance).",
          "Validation Step: Post-generation check against rules or tests.",
          "Acceptance Criteria: Objective done/not-done checks for task completion.",
          "Human-in-the-Loop: Human review/approval before critical actions.",
          "Risk Flagging: Explicitly reporting unresolved risks in final output.",
        ],
      },
      {
        heading: "Vibe coding specific terms",
        bullets: [
          "Vibe Coding: Building via natural-language direction with rapid AI-assisted iteration.",
          "Vibe-First Pass: Early creative pass for flow, mood, and structure.",
          "Refinement Pass: Converting ideas into constraints, tests, and production behavior.",
          "Prompt-Review Loop: prompt -> run -> inspect -> correct -> rerun.",
          "Artifact Memory: Persisting context in files (docs/tasks/rules) instead of chat alone.",
          "Prompt Ops: Operating prompting like a process (templates, checks, versioning).",
          "Agent Mission Prompt: Multi-step prompt defining scope, checks, and reporting.",
        ],
      },
      {
        heading: "How to use this glossary in CLI and IDE workflows",
        bullets: [
          "IDE mode: before you generate any code, write a short prompt block that states context (stack + files), constraints (what must not change), and a clear done condition. This helps the model align to your codebase and prevents random edits.",
          "CLI mode: begin each task with a compact specification that includes acceptance criteria and validation steps (for example lint/test scope). In terminal workflows, this is critical because the agent can touch multiple files quickly.",
          "Review pass: do not request full rewrites after each issue. Use iteration prompts that target one defect type at a time (logic, then UX, then polish) so you preserve working parts and reduce regression risk.",
          "Final pass: run a checklist against your constraints and done criteria. Confirm behavior, edge cases, and output format before accepting the change, so completion is based on evidence instead of feeling.",
        ],
      },
    ],
  },
];

export function getArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticleKeywords(article: Article): string[] {
  return [
    "vibe coding",
    "AI coding prompts",
    "agent workflows",
    "prompt engineering",
    "software development",
    article.kicker.toLowerCase(),
    ...article.sections.map((section) => section.heading.toLowerCase()),
  ];
}
