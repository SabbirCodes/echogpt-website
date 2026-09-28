export type Model = {
  name: string;
  maker: string;
  tag: string;
  blurb: string;
  style: string;
};

// Featured models shown in the hero selector and Models section.
export const models: Model[] = [
  {
    name: "EchoGPT",
    maker: "EchoGPT",
    tag: "echogpt",
    blurb: "Our balanced default for everyday chat, writing and research.",
    style: "Here's a clear, balanced take.",
  },
  {
    name: "GPT-5.6 Sol",
    maker: "OpenAI",
    tag: "gpt-5.6-sol",
    blurb: "Top-tier reasoning for hard writing, analysis and code.",
    style: "Let me reason through this step by step.",
  },
  {
    name: "DeepSeek V4 Pro",
    maker: "DeepSeek",
    tag: "deepseek-v4-pro",
    blurb: "Strong open-weight model for reasoning and coding.",
    style: "Breaking it down efficiently.",
  },
  {
    name: "Qwen 3.8 Max",
    maker: "Alibaba",
    tag: "qwen-3.8-max",
    blurb: "Great multilingual answers and long context.",
    style: "Here's a structured answer, ready to use.",
  },
  {
    name: "Kimi K3",
    maker: "Moonshot",
    tag: "kimi-k3",
    blurb: "Handles very long documents and research tasks.",
    style: "I read through everything. Here's the summary.",
  },
  {
    name: "Gemini 3.8 Flash",
    maker: "Google",
    tag: "gemini-3.8-flash",
    blurb: "Fast and multimodal, good for quick answers.",
    style: "Quick answer first, details after.",
  },
  {
    name: "Grok 4.6",
    maker: "xAI",
    tag: "grok-4.6",
    blurb: "Direct, real-time flavored answers with a bit of wit.",
    style: "Short version, no fluff.",
  },
  {
    name: "GLM-5.3",
    maker: "Zhipu",
    tag: "glm-5.3",
    blurb: "Reliable for agents, tools and structured output.",
    style: "Here's a tidy, structured result.",
  },
];

export const moreModels = [
  "DeepSeek V4 Flash",
  "DeepSeek V4 Flash Vision",
  "DeepSeek V4 Flash Fast",
  "Nemotron 3 Ultra",
  "GLM-5.2",
  "GLM-5.2 Fast",
  "GLM-5.3 Flash",
  "Tencent Hy3",
  "Tencent Hy4 Preview",
  "MiMo V2.5",
  "MiMo V2.5 Pro",
  "Qwen 3.6 Plus",
  "Qwen 3.7 Plus",
  "Qwen 3.7 Max",
  "Qwen 3.8 27B",
  "Qwen 3.8 Flash",
  "Qwen 3.8 Max 0902",
  "Kimi K2.7 Code",
  "Kimi K2.7 Code HighSpeed",
  "LongCat 2.0",
  "MiniMax M3",
  "GPT-5.4",
  "GPT-5.5",
  "GPT-5.6 Luna",
  "Grok 4.5",
  "Gemini 3.7 Flash",
  "Muse Spark 1.2",
  "Muse Spark 1.3",
  "Muse Spark 1.3 Contributor",
  "Step 3.5 Flash",
  "Step 3.7 Flash",
  "Inkling",
  "Inkling Small",
];

// Dummy replies keyed by topic. The hero chat picks one by keyword.
export const topics = [
  {
    keys: ["resume", "cv", "job"],
    text: "Your resume is strong on projects. Add measurable results (for example, cut load time by 40%) and move your top skills to the first third of the page.",
  },
  {
    keys: ["code", "bug", "react", "function", "api"],
    text: "Start by isolating the failing input, then write a small test for it. Most bugs like this come from state updated in the wrong order, so log values before and after each step.",
  },
  {
    keys: ["summar", "contract", "article", "pdf"],
    text: "Summary: the document covers scope, payment and termination. The main risk is the payment terms in section 3, which conflict with the appendix. Want a clause-by-clause list?",
  },
  {
    keys: ["translate", "bangla", "spanish", "french"],
    text: "Done. I kept the tone friendly and natural rather than word for word. I can also make it more formal if you'd like.",
  },
  {
    keys: ["email", "write", "post", "caption"],
    text: "Draft: a short opening that names the goal, two lines of key detail, and one clear next step. Want it shorter, warmer, or more formal?",
  },
];
export const fallbackReply =
  "Good question. Here's a short plan: define the goal, list what you already have, pick the smallest next step, and check the result. Tell me more and I'll make it specific.";
export const suggestions = [
  "Summarize this contract",
  "Improve my resume",
  "Explain this React bug",
  "Write a friendly email",
];

export const features = [
  {
    icon: "compare",
    title: "Compare models side by side",
    body: "Send one prompt to several models and pick the best answer.",
  },
  {
    icon: "image",
    title: "Image and video studio",
    body: "Generate visuals and short clips without leaving the chat.",
  },
  {
    icon: "plug",
    title: "Connectors",
    body: "Bring in files and apps so answers use your real context.",
  },
  {
    icon: "tasks",
    title: "AI tasks",
    body: "Turn a request into a repeatable task you can run any time.",
  },
  {
    icon: "job",
    title: "Job analysis and resumes",
    body: "Match your resume to a job post and see what to improve.",
  },
  {
    icon: "history",
    title: "Searchable history",
    body: "Find any past chat in seconds and pick up where you left off.",
  },
] as const;

export const why = [
  {
    title: "No model lock-in",
    body: "Switch models mid-chat. Your history stays put.",
  },
  {
    title: "Built for speed",
    body: "Streaming replies and keyboard shortcuts for everything.",
  },
  {
    title: "Private by default",
    body: "Your chats are yours. Delete them any time.",
  },
  {
    title: "Works where you do",
    body: "Web app and Chrome extension, with the same history.",
  },
];

export const includedModels = [
  "DeepSeek V4 Pro", "GLM-5.2", "MiMo V2.5 Pro", "Qwen 3.7 Plus", "GPT-5.6 Sol", "GLM-5.3 Flash", "Qwen 3.8 27B", "Kimi K3", "MiniMax M3",
];

export const plans = [
  { id: "monthly", name: "Monthly", price: 9.99, months: 1, billedAs: "Billed monthly", blurb: "Experience the benefits of Pro membership with unlimited chats for one month.", cta: "Choose Monthly", featured: false },
  { id: "quarterly", name: "Quarterly", price: 29.99, months: 3, billedAs: "Billed every 3 months", blurb: "Unlock three months of Pro features and save with quarterly billing.", cta: "Choose Quarterly", featured: false },
  { id: "semi-annual", name: "Half-Yearly", price: 59.99, months: 6, billedAs: "Billed every 6 months", blurb: "Enjoy six months of Pro features at a discounted rate, paid biannually.", cta: "Choose Half-Yearly", featured: false },
  { id: "annual", name: "Annual", price: 99.99, months: 12, billedAs: "Billed yearly", blurb: "Access all Pro member features for a full year, with significant savings.", cta: "Choose Annual", featured: true },
] as const;

export const faqs = [
  {
    q: "What is EchoGPT?",
    a: "EchoGPT is one workspace for chatting with several AI models, comparing their answers, and running tasks.",
  },
  {
    q: "Do I need an account?",
    a: "You can look around first. Sign in with email, Google, X or GitHub to save your history.",
  },
  {
    q: "Which models can I use?",
    a: "The free plan includes two models. Pro unlocks all supported models and compare mode.",
  },
  {
    q: "How does the Chrome extension work?",
    a: "Open it on any page, ask a question, or send selected text to a model. Chats sync with the web app.",
  },
  {
    q: "Can I delete my data?",
    a: "Yes. Delete single chats or your full history from settings.",
  },
];

export const quotes = [
  {
    name: "Nadia R.",
    role: "Product designer",
    text: "Compare mode ended my tab juggling. I see three answers and pick one.",
  },
  {
    name: "Tanvir A.",
    role: "Frontend developer",
    text: "The extension is always one shortcut away. It's how I review code snippets now.",
  },
  {
    name: "Mehrin S.",
    role: "Student",
    text: "Resume analysis showed me exactly which skills were missing for the role.",
  },
];

// Put your images in /public/screenshots. Recommended: 1920x1080 (16:9), PNG or WebP.
// Optional: add `srcDark` to show a different image in dark mode.
export const previews = [
  {
    id: "chat",
    label: "Chat",
    caption: "A clean chat with model switching and streaming replies.",
    src: "/screenshots/chat.png",
    srcDark: undefined as string | undefined,
    alt: "EchoGPT chat screen",
  },
  {
    id: "compare",
    label: "Compare",
    caption: "Send one prompt to several models and pick the best answer.",
    src: "/screenshots/compare.png",
    srcDark: undefined as string | undefined,
    alt: "EchoGPT compare mode",
  },
  {
    id: "studio",
    label: "Studio",
    caption: "Generate images and videos from the same workspace.",
    src: "/screenshots/studio.png",
    srcDark: undefined as string | undefined,
    alt: "EchoGPT image and video studio",
  },
  {
    id: "extension",
    label: "Extension",
    caption: "Ask about any page from the Chrome popup.",
    src: "/screenshots/extension.png",
    srcDark: undefined as string | undefined,
    alt: "EchoGPT Chrome extension popup",
  },
];
