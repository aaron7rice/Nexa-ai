import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Search,
  Sparkles,
  Check,
  Code2,
  Mic2,
  BarChart3,
  Wand2,
  ExternalLink,
  Menu,
  Image,
  Video,
  Zap,
  Brain
} from "lucide-react";
import "./styles.css";

const tools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    cat: "Writing",
    icon: "✦",
    desc: "Write, brainstorm, analyse files, code and research from one workspace.",
    price: "Free / Plus",
    rating: 4.9,
    tags: ["Writing", "Research", "Coding"],
    url: "https://chatgpt.com/"
  },
  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    cat: "Writing",
    icon: "◉",
    desc: "Thoughtful AI for writing, analysis, coding and complex problem solving.",
    price: "Free / Pro",
    rating: 4.9,
    tags: ["Writing", "Coding", "Research"],
    url: "https://claude.ai/"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    company: "Midjourney",
    cat: "Image",
    icon: "✺",
    desc: "Create striking AI images, concepts, characters and visual campaigns.",
    price: "Paid",
    rating: 4.8,
    tags: ["Image", "Design"],
    url: "https://www.midjourney.com/"
  },
  {
    id: "runway",
    name: "Runway",
    company: "Runway",
    cat: "Video",
    icon: "▶",
    desc: "Generate and transform video with powerful creative AI models.",
    price: "Free / Paid",
    rating: 4.7,
    tags: ["Video", "Image"],
    url: "https://runwayml.com/"
  },
  {
    id: "canva",
    name: "Canva",
    company: "Canva",
    cat: "Design",
    icon: "C",
    desc: "Design presentations, social posts, ads and brand assets with AI.",
    price: "Free / Pro",
    rating: 4.8,
    tags: ["Design", "Image", "Business"],
    url: "https://www.canva.com/"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    company: "Perplexity",
    cat: "Research",
    icon: "⌁",
    desc: "AI-powered search and research with cited answers and sources.",
    price: "Free / Pro",
    rating: 4.8,
    tags: ["Research", "Writing"],
    url: "https://www.perplexity.ai/"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    company: "ElevenLabs",
    cat: "Audio",
    icon: "◒",
    desc: "Create natural AI voices, narration, dubbing and audio content.",
    price: "Free / Paid",
    rating: 4.7,
    tags: ["Audio", "Video"],
    url: "https://elevenlabs.io/"
  },
  {
    id: "cursor",
    name: "Cursor",
    company: "Cursor",
    cat: "Coding",
    icon: "⌘",
    desc: "AI-first code editor that helps you build and understand software faster.",
    price: "Free / Pro",
    rating: 4.8,
    tags: ["Coding", "Business"],
    url: "https://www.cursor.com/"
  },
  {
    id: "zapier",
    name: "Zapier",
    company: "Zapier",
    cat: "Automation",
    icon: "⚡",
    desc: "Connect apps and automate repetitive business workflows with AI.",
    price: "Free / Paid",
    rating: 4.7,
    tags: ["Automation", "Business"],
    url: "https://zapier.com/"
  },
  {
    id: "gamma",
    name: "Gamma",
    company: "Gamma",
    cat: "Design",
    icon: "◆",
    desc: "Turn ideas into polished presentations, documents and webpages.",
    price: "Free / Paid",
    rating: 4.7,
    tags: ["Design", "Business", "Writing"],
    url: "https://gamma.app/"
  }
];

const categories = [
  { name: "Writing", icon: <Wand2 size={18} />, copy: "Copy, content & ideas" },
  { name: "Image", icon: <Image size={18} />, copy: "Generate & edit visuals" },
  { name: "Video", icon: <Video size={18} />, copy: "Create & transform video" },
  { name: "Research", icon: <Search size={18} />, copy: "Search & understand" },
  { name: "Coding", icon: <Code2 size={18} />, copy: "Build software faster" },
  { name: "Audio", icon: <Mic2 size={18} />, copy: "Voice, music & sound" },
  { name: "Design", icon: <Sparkles size={18} />, copy: "Design without the grind" },
  { name: "Automation", icon: <Zap size={18} />, copy: "Automate your workflow" }
];

const workflows = [
  {
    title: "Launch a TikTok ad",
    time: "20 min",
    steps: ["ChatGPT", "Canva", "ElevenLabs", "Runway"]
  },
  {
    title: "Start a small business",
    time: "1 afternoon",
    steps: ["Perplexity", "ChatGPT", "Gamma", "Zapier"]
  },
  {
    title: "Build a content system",
    time: "30 min",
    steps: ["ChatGPT", "Canva", "Runway", "Zapier"]
  },
  {
    title: "Build your first website",
    time: "1 hour",
    steps: ["ChatGPT", "Cursor", "Gamma"]
  }
];

function ToolCard({ tool, onCompare, compared }) {
  return (
    <article className="tool-card">
      <div className="tool-top">
        <div className="tool-icon">{tool.icon}</div>

        <div className="tool-meta">
          <h3>{tool.name}</h3>
          <span>{tool.company}</span>
        </div>

        <button
          className={"compare-btn " + (compared ? "selected" : "")}
          onClick={() => onCompare(tool.id)}
        >
          {compared ? <Check size={15} /> : "+"}
          {compared ? "Added" : "Compare"}
        </button>
      </div>

      <p>{tool.desc}</p>

      <div className="tags">
        {tool.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="tool-bottom">
        <span className="price">{tool.price}</span>

        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [menu, setMenu] = useState(false);
  const [compared, setCompared] = useState([]);
  const [finder, setFinder] = useState("");
  const [finderResults, setFinderResults] = useState([]);

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        category === "All" ||
        tool.cat === category ||
        tool.tags.includes(category);

      const q = query.toLowerCase();

      return (
        matchesCategory &&
        (!q ||
          [
            tool.name,
            tool.company,
            tool.cat,
            tool.desc,
            ...tool.tags
          ]
            .join(" ")
            .toLowerCase()
            .includes(q))
      );
    });
  }, [query, category]);

  function toggleCompare(id) {
    setCompared((current) =>
      current.includes(id)
        ? current.filter((x) => x !== id)
        : current.length < 3
        ? [...current, id]
        : current
    );
  }
async function runFinder() {
  const q = finder.trim();

  if (!q) {
    setFinderResults([]);
    return;
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: q
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Nexa AI request failed"
      );
    }

    setFinderResults([
      {
        id: "nexa-response",
        name: "Nexa AI",
        company: "Nexa AI",
        cat: "AI",
        icon: "✦",
        desc: data.reply || "Nexa couldn't generate a response.",
        price: "Nexa AI",
        rating: 5,
        tags: ["AI", "Recommendation"],
        url: "#"
      }
    ]);
  } catch (error) {
    console.error("Nexa AI error:", error);

    setFinderResults([
      {
        id: "nexa-error",
        name: "Nexa AI",
        company: "Nexa AI",
        cat: "AI",
        icon: "✦",
        desc: "Nexa couldn't connect to its AI brain. Please try again.",
        price: "Error",
        rating: 0,
        tags: ["Nexa"],
        url: "#"
      }
    ]);
  }
}
  function nav(nextPage) {
    setPage(nextPage);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => nav("home")}
          >
            <span className="brand-mark">N</span>
            <span>
              NEXA<span>AI</span>
            </span>
          </button>

          <nav className={menu ? "mobile-open" : ""}>
            <button onClick={() => nav("directory")}>
              Explore
            </button>

            <button onClick={() => nav("workflows")}>
              Workflows
            </button>

            <button onClick={() => nav("compare")}>
              Compare
            </button>

            <button onClick={() => nav("pricing")}>
              Pricing
            </button>
          </nav>

          <div className="nav-actions">
            <button className="login">Log in</button>

            <button
              className="nav-cta"
              onClick={() => nav("finder")}
            >
              Find my AI
              <ArrowRight size={15} />
            </button>
          </div>

          <button
            className="menu-btn"
            onClick={() => setMenu(!menu)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="hero">
            <div className="glow g1"></div>
            <div className="glow g2"></div>

            <div className="eyebrow">
              <Sparkles size={14} />
              THE AI DISCOVERY PLATFORM
            </div>

            <h1>
              Stop searching for AI.
              <br />
              <em>Start finding it.</em>
            </h1>

            <p className="hero-copy">
              Tell Nexa what you want to get done.
              We’ll help you find the AI tools that
              actually fit the job.
            </p>

            <div
              className="hero-search"
              onClick={() => nav("finder")}
            >
              <Search size={20} />
              <span>
                What do you want AI to help you do?
              </span>
              <kbd>⌘ K</kbd>
            </div>

            <div className="chips">
              {[
                "Create TikTok videos",
                "Automate my business",
                "Build a website",
                "Analyse a spreadsheet"
              ].map((text) => (
                <button
                  key={text}
                  onClick={() => {
                    setFinder(text);
                    nav("finder");
                  }}
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="hero-proof">
              <span>
                <Check size={15} />
                Curated tools
              </span>

              <span>
                <Check size={15} />
                Real use cases
              </span>

              <span>
                <Check size={15} />
                No endless scrolling
              </span>
            </div>
          </section>

          <section className="section light">
            <div className="section-head">
              <div>
                <div className="eyebrow dark">
                  EXPLORE
                </div>

                <h2>
                  One place for the <span>AI stack.</span>
                </h2>
              </div>

              <button
                className="text-btn"
                onClick={() => nav("directory")}
              >
                View all tools
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="category-grid">
              {categories.map((categoryItem) => (
                <button
                  className="category"
                  key={categoryItem.name}
                  onClick={() => {
                    setCategory(categoryItem.name);
                    nav("directory");
                  }}
                >
                  <span className="cat-icon">
                    {categoryItem.icon}
                  </span>

                  <strong>{categoryItem.name}</strong>

                  <small>
                    {categoryItem.copy}
                  </small>

                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </section>

          <section className="section dark-section">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  CURATED FOR YOU
                </div>

                <h2>
                  Tools worth <span>knowing.</span>
                </h2>
              </div>

              <button
                className="text-btn inverse"
                onClick={() => nav("directory")}
              >
                Explore directory
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="tools-grid">
              {tools.slice(0, 6).map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onCompare={toggleCompare}
                  compared={compared.includes(tool.id)}
                />
              ))}
            </div>
          </section>

          <section className="finder-banner">
            <div className="banner-orb">
              <Brain size={30} />
            </div>

            <div>
              <div className="eyebrow dark">
                NEXA AI FINDER
              </div>

              <h2>
                Don’t know which tool to use?
              </h2>

              <p>
                Describe the outcome. Nexa handles
                the shortlist.
              </p>
            </div>

            <button onClick={() => nav("finder")}>
              Try AI Finder
              <ArrowRight size={16} />
            </button>
          </section>

          <section className="section light workflows-preview">
            <div className="section-head">
              <div>
                <div className="eyebrow dark">
                  WORKFLOWS
                </div>

                <h2>
                  AI works better <span>together.</span>
                </h2>
              </div>

              <button
                className="text-btn"
                onClick={() => nav("workflows")}
              >
                See workflows
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="workflow-grid">
              {workflows.map((workflow) => (
                <div
                  className="workflow"
                  key={workflow.title}
                >
                  <div className="workflow-head">
                    <span className="workflow-time">
                      {workflow.time}
                    </span>

                    <Zap size={18} />
                  </div>

                  <h3>{workflow.title}</h3>

                  <div className="flow-tools">
                    {workflow.steps.map((step) => (
                      <span key={step}>{step}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => nav("workflows")}
                  >
                    Open workflow
                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="cta">
            <div className="eyebrow">
              BUILD YOUR AI STACK
            </div>

            <h2>
              Find less.
              <br />
              <span>Do more.</span>
            </h2>

            <p>
              Join the next generation of people
              building with AI.
            </p>

            <button
              onClick={() => nav("finder")}
              className="big-btn"
            >
              Find my AI
              <ArrowRight />
            </button>
          </section>
        </main>
      )}

      {page === "directory" && (
        <Page
          title="AI Directory"
          kicker="EXPLORE"
          sub="Search the tools, categories and capabilities that matter to you."
        >
          <div className="directory-controls">
            <div className="search-input">
              <Search size={18} />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search AI tools..."
              />
            </div>

            <div className="filter-row">
              <button
                className={
                  category === "All"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory("All")
                }
              >
                All
              </button>

              {categories.map((item) => (
                <button
                  className={
                    category === item.name
                      ? "active"
                      : ""
                  }
                  key={item.name}
                  onClick={() =>
                    setCategory(item.name)
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="tools-grid directory-grid">
            {filtered.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onCompare={toggleCompare}
                compared={compared.includes(tool.id)}
              />
            ))}
          </div>

          {!filtered.length && (
            <div className="empty">
              No tools found. Try another search.
            </div>
          )}
        </Page>
      )}

      {page === "finder" && (
        <Page
          title="AI Finder"
          kicker="NEXA AI FINDER"
          sub="Tell us the outcome. We’ll give you a practical shortlist."
        >
          <div className="finder-box">
            <div className="finder-icon">
              <Sparkles />
            </div>

            <textarea
              value={finder}
              onChange={(e) =>
                setFinder(e.target.value)
              }
              placeholder="e.g. I want to make short-form videos for my business without hiring an editor."
            />

            <button onClick={runFinder}>
              Find my tools
              <ArrowRight />
            </button>
          </div>

          <div className="chips finder-chips">
            {[
              "Create social content",
              "Build a website",
              "Research a topic",
              "Automate admin"
            ].map((text) => (
              <button
                key={text}
                onClick={() => {
                  setFinder(text);
                  setFinderResults([]);
                }}
              >
                {text}
              </button>
            ))}
          </div> 

          <div style={{
  marginBottom: "28px",
  padding: "22px",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.03)"
}}>
  <div style={{
    fontSize: "12px",
    letterSpacing: "1.5px",
    color: "#b7ff21",
    fontWeight: "700",
    marginBottom: "10px"
  }}>
    NEXA RECOMMENDS
  </div>

  <div style={{
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#aaa"
  }}>
    {finderResults.length > 0
  ? `For "${finder}", Nexa selected these tools to help you achieve your goal. Start with ${finderResults[0].name}, then use the others to complete the workflow.`
  : "These tools were selected based on the outcome you described."}
  </div>
</div>

          {finderResults.length > 0 && (
            <>
              <div className="result-title">
                <span>YOUR SHORTLIST</span>
                <h2>Start with these.</h2>
              </div>

              <div className="tools-grid">
                {finderResults.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onCompare={toggleCompare}
                    compared={compared.includes(tool.id)}
                  />
                ))}
              </div>
            </>
          )}
        </Page>
      )}

      {page === "compare" && (
        <Page
          title="Compare AI tools"
          kicker="COMPARE"
          sub="Put the tools side by side before you commit."
        >
          {compared.length === 0 ? (
            <div className="empty compare-empty">
              <BarChart3 size={36} />

              <h3>
                Your comparison is empty
              </h3>

              <p>
                Add up to three tools from the directory.
              </p>

              <button
                onClick={() => nav("directory")}
                className="big-btn small"
              >
                Browse tools
                <ArrowRight />
              </button>
            </div>
          ) : (
            <div className="compare-wrap">
              <div className="compare-table">
                <div className="compare-row labels">
                  <div>TOOL</div>

                  {compared.map((id) => (
                    <div key={id}>
                      {
                        tools.find(
                          (tool) => tool.id === id
                        ).name
                      }
                    </div>
                  ))}
                </div>

                {[
                  "Category",
                  "Best for",
                  "Pricing",
                  "Rating"
                ].map((field) => (
                  <div
                    className="compare-row"
                    key={field}
                  >
                    <div>{field}</div>

                    {compared.map((id) => {
                      const tool = tools.find(
                        (item) => item.id === id
                      );

                      const value =
                        field === "Category"
                          ? tool.cat
                          : field === "Best for"
                          ? tool.desc
                          : field === "Pricing"
                          ? tool.price
                          : `${tool.rating}/5`;

                      return (
                        <div key={id}>
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div className="compare-row">
                  <div></div>

                  {compared.map((id) => (
                    <div key={id}>
                      <a
                        className="visit"
                        href={
                          tools.find(
                            (tool) =>
                              tool.id === id
                          ).url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit tool
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Page>
      )}

      {page === "workflows" && (
        <Page
          title="AI Workflows"
          kicker="WORKFLOWS"
          sub="Stop using AI tools one at a time. Combine them into repeatable systems."
        >
          <div className="workflow-grid full">
            {workflows.map((workflow) => (
              <div
                className="workflow big-workflow"
                key={workflow.title}
              >
                <div className="workflow-head">
                  <span className="workflow-time">
                    {workflow.time}
                  </span>

                  <span className="workflow-label">
                    NEXA PLAYBOOK
                  </span>
                </div>

                <h2>{workflow.title}</h2>

                <div className="flow-chain">
                  {workflow.steps.map(
                    (step, index) => (
                      <React.Fragment key={step}>
                        <span>{step}</span>

                        {index <
                          workflow.steps.length -
                            1 && (
                          <ArrowRight size={14} />
                        )}
                      </React.Fragment>
                    )
                  )}
                </div>

                <button
                  className="text-btn"
                  onClick={() =>
                    nav("finder")
                  }
                >
                  Build this workflow
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </Page>
      )}

      {page === "pricing" && (
        <Page
          title="Simple pricing"
          kicker="PRICING"
          sub="Start free. Upgrade when Nexa becomes part of how you work."
        >
          <div className="pricing-grid">
            <Plan
              name="Free"
              price="€0"
              desc="For discovering what AI can do."
              features={[
                "AI Finder",
                "AI directory",
                "Tool comparisons",
                "Curated workflows"
              ]}
              button="Start exploring"
              onClick={() =>
                nav("finder")
              }
            />

            <Plan
              featured
              name="Nexa Pro"
              price="€9.99"
              suffix="/ month"
              desc="For people who use AI every week."
              features={[
                "Everything in Free",
                "Personal AI stack",
                "Saved tools & workflows",
                "Advanced recommendations",
                "Early access"
              ]}
              button="Coming soon"
              onClick={() => {}}
            />

            <Plan
              name="Teams"
              price="Custom"
              desc="For teams building with AI."
              features={[
                "Shared AI stack",
                "Team workflows",
                "Admin controls",
                "Usage insights",
                "Priority support"
              ]}
              button="Talk to us"
              onClick={() => {}}
            />
          </div>
        </Page>
      )}

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">N</span>
          <strong>NEXA AI</strong>
          <p>
            The AI Discovery Platform.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Product</strong>

            <button
              onClick={() =>
                nav("directory")
              }
            >
              Explore
            </button>

            <button
              onClick={() =>
                nav("finder")
              }
            >
              AI Finder
            </button>

            <button
              onClick={() =>
                nav("workflows")
              }
            >
              Workflows
            </button>
          </div>

          <div>
            <strong>Company</strong>
            <button>About</button>
            <button>Contact</button>
            <button>Privacy</button>
          </div>
        </div>

        <div className="copyright">
          © 2026 Nexa AI. Built for the AI era.
        </div>
      </footer>
    </div>
  );
}

function Page({
  title,
  kicker,
  sub,
  children
}) {
  return (
    <main className="page">
      <div className="page-hero">
        <div className="eyebrow dark">
          {kicker}
        </div>

        <h1>{title}</h1>

        <p>{sub}</p>
      </div>

      {children}
    </main>
  );
}

function Plan({
  name,
  price,
  suffix,
  desc,
  features,
  button,
  featured,
  onClick
}) {
  return (
    <div
      className={
        "plan " +
        (featured ? "featured" : "")
      }
    >
      <div className="plan-top">
        {featured && (
          <span className="popular">
            MOST POPULAR
          </span>
        )}

        <h3>{name}</h3>

        <div>
          <strong>{price}</strong>

          {suffix && (
            <small>{suffix}</small>
          )}
        </div>

        <p>{desc}</p>
      </div>

      <ul>
        {features.map((feature) => (
          <li key={feature}>
            <Check size={16} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={
          featured
            ? "big-btn"
            : "outline-btn"
        }
      >
        {button}
      </button>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
