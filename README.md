# Nexa AI — Production Starter

This package upgrades the Nexa prototype into a production-ready foundation.

## Stack
- React + Vite frontend
- Supabase/Postgres tool database
- Vercel-compatible recommendation API
- Anonymous click analytics table
- Published/draft/archived tool states
- Affiliate URL fields in the database
- Workflows table

## 1. Create Supabase
Create a Supabase project, open SQL Editor and run `supabase/schema.sql`.

Then add the project URL and anon key to `.env`.

## 2. Install
`npm install`

## 3. Run
`npm run dev`

## 4. API deployment
Deploy `/api/recommend.js` as a Vercel serverless function. Add:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY (reserved for the next LLM reranking upgrade)

## 5. Production roadmap
1. Replace demo directory data with Supabase queries.
2. Connect the AI Finder to `/api/recommend`.
3. Add authenticated admin CRUD for tools.
4. Add affiliate tracking + UTM attribution.
5. Add SEO landing pages for every tool/category.
6. Add accounts and saved AI stacks.
7. Add paid Pro billing.
8. Deploy on a custom domain such as nexa.ai if available.

## Important
Do not put the Supabase service-role key or any private API key in frontend code.
