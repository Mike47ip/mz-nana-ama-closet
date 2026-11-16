# Mz Nana Ama Closet (Next.js + Tailwind)

## Jump start
    npm install
    npm run dev
- Store: http://localhost:3000
- Admin: http://localhost:3000/admin  (password is in `.env.local`, default `ChangeMe123`; change it)

## Push to GitHub
    git init && git add . && git commit -m "Initial commit"
    gh repo create mz-nana-ama-closet --private --source=. --push
(or create the repo on github.com and run `git remote add origin ...` then `git push -u origin main`)

## Admin
Log in at `/admin` to add, edit and delete products and upload photos (JPG, PNG, WebP, up to 8 MB each).
Products are saved in `data/products.json`; uploaded photos in `data/uploads/`. Both appear on the store immediately.
Back up the whole `data/` folder.

## Structure
    app/(site)/          store pages: / , /shop , /shop/[id] , /about , /contact , /cart
    app/admin/           admin pages (login + product list/forms)
    app/api/admin/       admin APIs (login, logout, upload, products)
    app/uploads/[name]   serves uploaded photos
    components/          Header, Footer, ProductCard, ProductForm, ...
    lib/                 store.js (data), auth.js, validate.js, products.js (constants)
    middleware.js        protects /admin and /api/admin

## Deploying
Data is stored on disk, so deploy somewhere with a persistent disk (a VPS, Render, Railway or Fly with a volume), run
`npm run build && npm start`, and set a strong `ADMIN_PASSWORD` as an environment variable.
Serverless hosts such as Vercel have no writable disk: move `lib/store.js` to a database and the uploads to object storage first.

## Still to connect
- Checkout and payments (TODO in `app/(site)/cart/page.js`)
- Contact form and newsletter (see `components/ContactForm.js`)
