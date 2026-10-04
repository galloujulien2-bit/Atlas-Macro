# 📦 Atlas Macro — Download folder

This folder is served by Next.js at the URL: **`/download/`**

## How to use it

1. Place your Atlas Macro `.zip` file in this folder.
2. Name it exactly: **`AtlasMacro.zip`**
3. The download buttons on the website will automatically serve this file.

## Expected file

```
public/download/AtlasMacro.zip
```

URL once deployed:

```
/download/AtlasMacro.zip
```

## Notes

- Files in `public/` are served statically by Next.js — no server code needed.
- You can also place other versions (e.g. `AtlasMacro-v2.4.0.zip`) and update the link in `src/app/page.tsx` if needed.
- If the file is missing, the download button will return a 404 — make sure to upload the `.zip` before going live.
