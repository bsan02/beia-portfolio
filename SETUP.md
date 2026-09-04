# beia-portfolio — setup notes

## 0. One-time cleanup (only needed the first time)
While building this with you I hit a permission quirk installing packages
through the remote bridge, so node_modules on disk is a little messy.
Run this once in your own Terminal (not through Claude) to get a clean start:

    cd ~/Documents/beia-portfolio
    rm -rf node_modules .git package.json.tmp package-lock.json
    npm install


## 1. Run it locally
    npm run dev
Then open http://localhost:3000

## 2. Where things live
- src/app/            → one folder per page (experience, builds, leadership, creative)
- src/components/      → Nav, Footer, Placeholder, ClusterGallery
- src/data/            → all your real content (edit these, not the pages, to update text)
- public/              → put real images here when ready

## 3. Swapping a placeholder for a real photo
Each colored tile is a <Placeholder hue={...} /> component. To use a real photo instead,
add the file to /public/images/... and replace it with:
    <img src="/images/leadership/your-photo.jpg" alt="..." className="h-16 w-20 rounded-lg object-cover" />

## 4. Push to GitHub
    git init
    git add -A
    git commit -m "portfolio site"
    gh repo create beia-portfolio --public --source=. --push
    (or create the repo on github.com and follow its "push an existing repo" instructions)

## 5. Deploy on Vercel
    Go to vercel.com → New Project → import the beia-portfolio GitHub repo → Deploy
    (no config needed, it auto-detects Next.js)
