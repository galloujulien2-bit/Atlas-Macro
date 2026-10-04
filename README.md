# Atlas Macro — Website

The official download page for **Atlas Macro**, a discreet Blade Ball macro.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **shadcn/ui**.

---

## 🚀 Quick deploy on Vercel (free, ~5 minutes)

### 1. Put your .zip file

Place your `Atlas-Macro.zip` file in:

```
public/download/Atlas-Macro.zip
```

⚠️ The filename must be **exactly** `Atlas-Macro.zip` (with the hyphen).

### 2. Push to GitHub

```bash
cd website
git init
git add .
git commit -m "Atlas Macro - initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/atlas-macro.git
git push -u origin main
```

### 3. Deploy on Vercel

1. Go to https://vercel.com/signup
2. Click **"Sign Up With GitHub"**
3. Authorize Vercel
4. Choose the **Hobby** plan (free, forever)
5. Click **"Add New..." → "Project"**
6. Click **"Import"** next to your `atlas-macro` repository
7. Vercel auto-detects Next.js — keep default settings
8. Click **"Deploy"**

Wait ~2 minutes — your site is live at `https://atlas-macro.vercel.app` 🎉

---

## 💻 Run locally (optional)

```bash
cd website
npm install        # or: bun install
npm run dev        # or: bun run dev
```

Open http://localhost:3000

---

## 📁 Project structure

```
website/
├── public/
│   ├── download/
│   │   ├── Atlas-Macro.zip     ← PUT YOUR .ZIP HERE
│   │   └── README.md
│   ├── logo.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── globals.css         (navy theme + animations)
│   │   ├── layout.tsx          (HTML shell + particle field)
│   │   ├── page.tsx            (the homepage)
│   │   └── api/route.ts
│   ├── components/
│   │   ├── particles.tsx       (animated background)
│   │   └── ui/                 (shadcn/ui components)
│   ├── hooks/
│   └── lib/
├── package.json
├── next.config.ts
├── tsconfig.json
└── ...
```

---

## 🔄 Update the site later

After editing files:

```bash
git add .
git commit -m "your message"
git push
```

Vercel will automatically redeploy in ~30 seconds.

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Download button shows error toast | Put `Atlas-Macro.zip` in `public/download/` |
| Blank page after deploy | Check Vercel build logs in Deployments tab |
| Build fails | Often a TypeScript error — check logs |
| Want a custom domain (atlasmacro.com) | Vercel → Settings → Domains |

---

© 2026 Atlas Macro. All rights reserved.
