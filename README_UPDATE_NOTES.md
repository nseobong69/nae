# Portfolio update — what changed & what to fill in

## Files
- `App.jsx` → replace your `src/App.jsx`
- `index.html` → replace your root `index.html`

No new dependencies. Same React + Vite setup — just drop these in and redeploy.

## What changed

1. **Fixed a logic bug** in the project tag styling (`tagColor` string handling was
   inconsistent and had dead `||` fallback code). Colors are now plain hex values
   passed straight through.

2. **Added `liveUrl` and `githubUrl` fields** to every project. Cards now show a
   `Live ↗` and/or `Code ↗` link when those fields are filled in. Currently blank —
   **fill these in** with real links (or leave blank to hide the link, but fill in
   at least VIS Portal and Emanicel Store since those are your strongest proof points).

3. **Added an in-page case study modal** for VIS Portal and Emanicel Store. Click
   "Read case study →" on those cards to see it. Content is drafted from what you've
   told me — **search for `TODO` in App.jsx** and fill in:
   - Number of schools/tenants live on VIS Portal
   - A concrete before/after metric (time saved, error reduction, etc.)
   - What you'd architect differently today (self-critique — this signals seniority)
   - Emanicel Store: how you actually fixed the race condition, and transaction/usage numbers

4. **Reordered `index.html` meta description** to lead with "Full Stack Developer"
   instead of "Grant Writer & Curriculum Designer." This is what shows up in Google
   results, LinkedIn previews, and social shares — for eng/design job hunting, dev
   work needs to be the first thing anyone sees, not the third.

## Still worth doing (not included here)

- A dedicated **UI/UX case study** — the "obsidian sidebar, gold accents" redesign
  you described would make strong design-process material: before/after screenshots,
  what you changed and why. Say the word and I'll draft that too, once you can share
  screenshots or describe the before/after in more detail.
- Making the GitHub link per-project actually point somewhere (even a stripped-down/
  sanitized version of the VIS Portal repo with credentials removed) — this is the
  single highest-leverage thing for engineering credibility.
