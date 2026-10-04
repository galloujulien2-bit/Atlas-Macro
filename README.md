# 📦 Atlas Macro — Download folder

This folder is served by Next.js at the URL: **`/download/`**

## Where to put your .zip file

Place your file here, named exactly:

```
public/download/Atlas-Macro.zip
```

⚠️ The name must be **exactly** `Atlas-Macro.zip` (with the hyphen between "Atlas" and "Macro"). The download buttons in the site are hard-coded to look for this exact filename.

Once deployed, the file will be available at:

```
/download/Atlas-Macro.zip
```

## How it works

- Files in `public/` are served statically by Next.js — no server code needed.
- When a user clicks "Download for free" or "Download for Windows", the site:
  1. Does a `HEAD` request to check if the file exists
  2. If yes → triggers a real browser download of `Atlas-Macro.zip`
  3. If no → shows a red error toast telling the user the file is missing

## Before deploying

Make sure `Atlas-Macro.zip` is in this folder before you push to GitHub / deploy to Vercel. Otherwise visitors will see the error toast when they click download.
