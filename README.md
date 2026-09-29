# EchoGPT Website

## Project overview
A single-page marketing site for EchoGPT that fulfills the "Design & Develop a
Single-Page EchoGPT Website" task: a hero with a live, interactive chat demo,
a product preview, a features showcase, an AI-models directory, a Chrome
extension preview, a "why choose EchoGPT" section, pricing, an FAQ, a call to
action, and a footer. The goal is to communicate what EchoGPT does and give a
visitor a reason to sign up or install — most sections are actually
interactive rather than static screenshots, so the page demonstrates the
product instead of just describing it.

Sections, top to bottom: **Hero → Product Preview → Features → AI Models →
Chrome Extension → Why EchoGPT → Pricing → FAQ → Call to Action → Footer**.

## Setup instructions
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production build
```
No environment variables or API keys are required — everything on the page
runs on local mock data. To deploy, push the repo to GitHub and import it in
Vercel; it needs no additional configuration.

## Technologies used
- **Next.js** (App Router) with **React** and **TypeScript**
- **Tailwind CSS v4** for styling, with a small set of CSS-variable design
  tokens for light/dark theming
- **motion** (Framer Motion) for animation and micro-interactions
- **lucide-react** and **react-icons** for icons

## Assumptions
- The existing EchoGPT purple brand color was kept and refined into separate
  light and dark token sets rather than replaced.
- There is no real backend or AI API. The hero chat, the Compare-style demos,
  and other "live" interactions all use local mock data and canned,
  keyword-matched replies — this is disclosed in the UI copy, not hidden.
- Pricing tiers, testimonials, and the "maker" attribution shown for each
  model (e.g. OpenAI, DeepSeek, Alibaba) are placeholders and should be
  replaced with real values before shipping.
- The product-preview screenshots are not included; the section is wired up
  to read image files from `public/screenshots/` (see the `README.txt` left
  there) and shows a clear placeholder state until real screenshots are added.
- Outbound links (sign-up, sign-in, "Add to Chrome") point at illustrative
  `echogpt.live` URLs since the real destinations weren't provided.

## Additional features implemented
- **Light/dark theme** that follows the system by default, remembers the
  user's choice in `localStorage`, and swaps with no flash on page load.
- **Interactive hero chat**: switch between models and the reply's tone
  changes with it; replies type out character by character and respect the
  visitor's reduced-motion preference.
- **Searchable, expandable model directory**: featured models are shown as
  cards, with the rest of the 40+ model catalog revealed on demand and
  filterable by name.
- **Interactive feature demos**: the Features section isn't static icons and
  text — each card contains a small working demo (e.g. an editable compare
  view, a mock image-generation flow) that illustrates the feature directly.
- **Interactive "Why EchoGPT" section** with live mini-demos for each reason
  (switching models mid-chat, keyboard shortcuts, deleting a chat, syncing
  across devices) instead of plain bullet points.
- **Interactive Chrome-extension preview**: a mock browser window showing the
  extension's popup responding to clicks, rather than a single screenshot.
- **Accessible FAQ accordion**, a skip-to-content link, visible focus states
  throughout, and semantic landmarks (`header`, `main`, `nav`, `footer`).
- **Fully responsive layout**, including a mobile navigation menu.