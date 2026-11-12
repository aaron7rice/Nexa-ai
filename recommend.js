import { createClient } from '@supabase/supabase-js';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

export default async function handler(req, res) {
  Object.entries(cors).forEach(([k,v]) => res.setHeader(k,v));
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});

  try {
    const { goal = '', limit = 5 } = req.body || {};
    if (!goal.trim()) return res.status(400).json({error:'goal is required'});

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: tools, error } = await supabase
      .from('ai_tools')
      .select('id,name,company,description,category,tags,pricing_url,website_url,affiliate_url,rating')
      .eq('status','published');

    if (error) throw error;

    // Lightweight baseline ranking that works without an LLM.
    // Replace/add an embeddings or LLM reranker later without changing the frontend contract.
    const words = goal.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2);
    const scored = (tools || []).map(t => {
      const hay = [
        t.name, t.company, t.description, t.category,
        ...(t.tags || [])
      ].join(' ').toLowerCase();
      const score = words.reduce((n,w) => n + (hay.includes(w) ? 1 : 0), 0);
      return {...t, score};
    }).sort((a,b) => b.score - a.score || (b.rating || 0) - (a.rating || 0));

    const results = scored.slice(0, Math.min(Number(limit) || 5, 10));
    return res.status(200).json({goal, results});
  } catch (e) {
    console.error(e);
    return res.status(500).json({error:'Recommendation service unavailable'});
  }
}
