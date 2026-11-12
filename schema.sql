create extension if not exists pgcrypto;

create table if not exists public.ai_tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  company text not null,
  description text not null,
  category text not null,
  tags text[] default '{}',
  pricing text,
  pricing_url text,
  website_url text not null,
  affiliate_url text,
  rating numeric(2,1) default 0,
  logo_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_tools_category_idx on public.ai_tools(category);
create index if not exists ai_tools_status_idx on public.ai_tools(status);
create index if not exists ai_tools_tags_idx on public.ai_tools using gin(tags);

create table if not exists public.tool_clicks (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid references public.ai_tools(id) on delete cascade,
  source text,
  page text,
  created_at timestamptz not null default now()
);

create table if not exists public.workflows (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  steps jsonb not null default '[]'::jsonb,
  status text not null default 'published',
  created_at timestamptz not null default now()
);

alter table public.ai_tools enable row level security;
alter table public.workflows enable row level security;
alter table public.tool_clicks enable row level security;

create policy "published tools are public"
on public.ai_tools for select
using (status = 'published');

create policy "published workflows are public"
on public.workflows for select
using (status = 'published');

create policy "anonymous click tracking"
on public.tool_clicks for insert
with check (true);

insert into public.ai_tools
(slug,name,company,description,category,tags,pricing,website_url,rating,status,featured)
values
('chatgpt','ChatGPT','OpenAI','Write, brainstorm, analyse files, code and research from one workspace.','Writing',array['Writing','Research','Coding'],'Free / Plus','https://chatgpt.com/',4.9,'published',true),
('claude','Claude','Anthropic','Thoughtful AI for writing, analysis, coding and complex problem solving.','Writing',array['Writing','Coding','Research'],'Free / Pro','https://claude.ai/',4.9,'published',true),
('midjourney','Midjourney','Midjourney','Create striking AI images, concepts, characters and visual campaigns.','Image',array['Image','Design'],'Paid','https://www.midjourney.com/',4.8,'published',true),
('runway','Runway','Runway','Generate and transform video with powerful creative AI models.','Video',array['Video','Image'],'Free / Paid','https://runwayml.com/',4.7,'published',true),
('canva','Canva','Canva','Design presentations, social posts, ads and brand assets with AI.','Design',array['Design','Image','Business'],'Free / Pro','https://www.canva.com/',4.8,'published',true),
('perplexity','Perplexity','Perplexity','AI-powered search and research with cited answers and sources.','Research',array['Research','Writing'],'Free / Pro','https://www.perplexity.ai/',4.8,'published',true),
('elevenlabs','ElevenLabs','ElevenLabs','Create natural AI voices, narration, dubbing and audio content.','Audio',array['Audio','Video'],'Free / Paid','https://elevenlabs.io/',4.7,'published',true),
('cursor','Cursor','Cursor','AI-first code editor that helps you build and understand software faster.','Coding',array['Coding','Business'],'Free / Pro','https://www.cursor.com/',4.8,'published',true),
('zapier','Zapier','Zapier','Connect apps and automate repetitive business workflows with AI.','Automation',array['Automation','Business'],'Free / Paid','https://zapier.com/',4.7,'published',true),
('gamma','Gamma','Gamma','Turn ideas into polished presentations, documents and webpages.','Design',array['Design','Business','Writing'],'Free / Paid','https://gamma.app/',4.7,'published',true)
on conflict (slug) do nothing;
