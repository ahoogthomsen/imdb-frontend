This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Set environment variables to connect to your own supabase project:
Create an .env.local or .env file.

Paste these values in to it and populate it with your projects keys.

You can find your projects keys by opening your project on supabase:
**1.** Visit supabase.com and navigate to your project.
**2** Click on the cog at the very bottom of the right side menu.
**3** Click on the API sidemeny option.
**4** Paste Project URL & Project API keys (anon public).
**5** Paste in the keys

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
```

Install dependencies:
`npm i `

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/movies/index.js`. The page auto-updates as you edit the file.
