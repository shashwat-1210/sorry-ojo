# Six Months, Ojo 🍫

A small, interactive one-page site for your anniversary. Plain HTML/CSS/JS —
no build tools, no dependencies, works straight from GitHub Pages.

## File map

```
ojo-and-me/
├── index.html   → structure + most of the editable text (search "EDIT:")
├── style.css    → colors, fonts, animation — change --bg/--ink/etc. at the top to retheme
├── script.js    → all your CONTENT LIVES HERE: photos, timeline, reasons, surprise messages
├── images/      → put her photos in this folder
└── README.md    → you are here
```

## 1. Personalise it (do this first)

- Open **script.js** — the top of the file has four arrays: `photos`,
  `timeline`, `reasons`, `surprises`. Fill each one in with your real
  content. Add or delete entries freely, the page rebuilds itself from
  whatever's there.
- Open **index.html** and search for `EDIT:` — that marks the headline,
  the Shagun/hot-chocolate paragraph, the secret note, and the footer
  name.
- Drop your photos into **images/**, named to match whatever you put in
  `photos` in script.js (e.g. `images/photo1.jpg`). Any size works — they
  get cropped to fit automatically. If a filename doesn't match, that
  slot shows a friendly "add photo here" placeholder instead of breaking.

Open `index.html` directly in your browser (just double-click it) to
preview as you go — no server needed.

## 2. Put it on GitHub

```bash
cd ojo-and-me
git init
git add .
git commit -m "our six months"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't — the green "New"
button on your GitHub homepage.)

## 3. Turn on GitHub Pages

1. On your repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub gives you a link like `https://<your-username>.github.io/<repo-name>/`
   within a minute or two — that's the one to send her.

## Notes

- The eye motif (bottom-left, and the button in the "ojo, look here"
  section) is a nod to her nickname — Latin for eyes. It tracks your
  cursor and blinks on its own; no need to touch it.
- Everything respects `prefers-reduced-motion`, so it's calm for anyone
  who has that setting on.
- If you want a custom domain or a password gate later, both are doable —
  just ask.
