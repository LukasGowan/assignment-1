import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Resume", id: "resume" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const PROJECTS = [
  {
    title: "Echoes of the Rift",
    stack: "Unity · C# · HLSL",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=500&fit=crop&auto=format",
    alt: "Game development setup with dual monitors showing code",
    description:
      "A 2D action-platformer set in a fractured dimension where the player manipulates time echoes to solve environmental puzzles and defeat enemies. Features a custom shader system for the visual split-reality effect and a fully procedural level generator.",
    lessons:
      "Designing around a core mechanic taught me to cut features ruthlessly. The echo system started as seven distinct abilities — by launch, two remained, but they were deeply expressive. Scope discipline is its own craft.",
    github: "#",
  },
  {
    title: "Hollow Grid",
    stack: "Godot 4 · GDScript · SQLite",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=500&fit=crop&auto=format",
    alt: "MacBook Pro displaying source code",
    description:
      "A turn-based tactical RPG built in Godot 4, featuring a grid-based combat engine with line-of-sight, cover mechanics, and a branching dialogue system backed by SQLite. The campaign spans 14 handcrafted maps with persistent world state.",
    lessons:
      "Godot's scene tree architecture pushed me to think in composition over inheritance far earlier than Unity had. The dialogue system was rewritten twice — the second time entirely data-driven — which cut authoring time for new content by 70%.",
    github: "#",
  },
  {
    title: "Voxel Drift",
    stack: "C++ · OpenGL · Custom Engine",
    image:
      "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=500&fit=crop&auto=format",
    alt: "Code editor showing source code",
    description:
      "An infinite voxel sandbox built on a custom C++ engine with chunk-based streaming, greedy mesh generation, and a compute-shader driven lighting model. Started as a weekend experiment in rendering; grew into a six-month deep dive into low-level graphics programming.",
    lessons:
      "Writing a renderer from scratch is the fastest way to understand why existing engines make the choices they do. I gained more practical graphics knowledge in two months than in two years of using Unity's built-in pipeline.",
    github: "#",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s",
        background: scrolled ? "rgba(12,12,12,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #6b1e2e" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#e8e4df",
            letterSpacing: "-0.02em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Alex<span style={{ color: "#6b1e2e" }}>.</span>Chen
        </button>

        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: "#7a7470",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#5ecfbf")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#7a7470")
              }
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "#e8e4df",
                borderRadius: 1,
                transition: "transform 0.2s",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "#141414",
            borderTop: "2px solid #6b1e2e",
            padding: "1rem 2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollTo(link.id);
                setMenuOpen(false);
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                color: "#e8e4df",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                textTransform: "uppercase",
                padding: "4px 0",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Burgundy side strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 6,
          height: "100%",
          background: "#6b1e2e",
          pointerEvents: "none",
        }}
      />
      {/* Burgundy bottom band */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #6b1e2e, #8f2a3e, #6b1e2e)",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "8rem 2rem 4rem",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "#5ecfbf",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          &#47;&#47; Portfolio · 2026
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#e8e4df",
            margin: 0,
            marginBottom: "0.25rem",
          }}
        >
          Alex Chen
        </h1>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#6b1e2e",
            margin: 0,
            marginBottom: "2.5rem",
          }}
        >
          Game Developer.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontWeight: 300,
            color: "#7a7470",
            maxWidth: 560,
            lineHeight: 1.7,
            margin: 0,
            marginBottom: "3rem",
          }}
        >
          Programmer, systems thinker, and indie game developer based in
          Seattle, WA. I build games and the tools to build them — from
          custom rendering pipelines to procedural world generators.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "#6b1e2e",
              color: "#e8e4df",
              border: "none",
              padding: "0.85rem 2rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "#8f2a3e")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "#6b1e2e")
            }
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#5ecfbf",
              border: "1px solid #5ecfbf",
              padding: "0.85rem 2rem",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#5ecfbf";
              (e.target as HTMLElement).style.color = "#0c0c0c";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "#5ecfbf";
            }}
          >
            Get In Touch
          </button>
        </div>

        {/* Skill tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "4rem",
          }}
        >
          {[
            "C++",
            "C#",
            "Unity",
            "Godot 4",
            "OpenGL",
            "HLSL/GLSL",
            "Python",
            "Rust",
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: "#7a7470",
                border: "1px solid #2a2a2a",
                padding: "3px 10px",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#141414",
        borderTop: "3px solid #6b1e2e",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "7rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left column */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "#5ecfbf",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            01 / About
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#e8e4df",
              margin: 0,
              marginBottom: "2rem",
            }}
          >
            Building worlds,
            <br />
            <span style={{ color: "#6b1e2e" }}>one system at a time.</span>
          </h2>
          <img
            src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=600&h=400&fit=crop&auto=format"
            alt="Developer at workstation"
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              display: "block",
              filter: "grayscale(20%) contrast(1.05)",
            }}
          />
        </div>

        {/* Right column */}
        <div style={{ paddingTop: "3.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#c8c4bf",
              marginBottom: "1.5rem",
            }}
          >
            I'm a software engineer and indie game developer with seven years of
            experience across the full game development stack — from low-level
            engine programming to high-level gameplay systems, tools development,
            and technical art pipelines.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#c8c4bf",
              marginBottom: "1.5rem",
            }}
          >
            My background in computer science and a lifelong obsession with
            games pushed me toward the intersection of the two. I shipped my
            first commercial title at 22, and I've been refining my craft ever
            since — working at mid-sized studios by day and pursuing personal
            projects nights and weekends.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#c8c4bf",
              marginBottom: "2.5rem",
            }}
          >
            This portfolio documents the work I'm most proud of — projects
            where technical ambition and design clarity reinforced each other
            rather than competing. I'm currently open to senior gameplay
            engineer and engine programmer roles, as well as collaborations on
            ambitious indie projects.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            {[
              { label: "Projects Shipped", value: "12+" },
              { label: "Years Experience", value: "7" },
              { label: "Languages", value: "8" },
              { label: "Game Jams Won", value: "4" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  borderLeft: "3px solid #6b1e2e",
                  paddingLeft: "1rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  background: "rgba(107,30,46,0.08)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: "#e8e4df",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "#7a7470",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

function ResumeSection() {
  return (
    <section
      id="resume"
      style={{
        background: "#100810",
        borderTop: "3px solid #6b1e2e",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "7rem 2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "#5ecfbf",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              02 / Resume
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#e8e4df",
                margin: 0,
              }}
            >
              Professional Record
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 3fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="resume-grid"
        >
          {/* Experience */}
          <div>
            <SectionLabel>Experience</SectionLabel>

            <ResumeEntry
              title="Senior Gameplay Engineer"
              org="Ironveil Studios — Seattle, WA"
              period="2022 – Present"
              bullets={[
                "Led gameplay systems team of 4 engineers on an unannounced AAA action-RPG",
                "Architected a data-driven ability system handling 300+ distinct player abilities with zero GC allocations per frame",
                "Implemented procedural animation blending system reducing animator workload by 40%",
                "Wrote custom profiling tooling integrated into the editor that cut average frame time investigations from 4 hours to 30 minutes",
              ]}
            />
            <ResumeEntry
              title="Gameplay Programmer"
              org="Dusk Interactive — Remote"
              period="2019 – 2022"
              bullets={[
                "Shipped Meridian: Edge of Time (PC/Console, 2021) — 87 on Metacritic",
                "Designed and implemented real-time cloth simulation for character cloaks using Verlet integration",
                "Built a node-based visual scripting tool for narrative designers, adopted by the full content team",
                "Mentored two junior engineers through their first shipped title",
              ]}
            />
            <ResumeEntry
              title="Junior Programmer"
              org="Cascade Software — Bellevue, WA"
              period="2017 – 2019"
              bullets={[
                "Developed game client features for two free-to-play mobile titles with 500K+ DAU",
                "Optimized asset loading pipeline, reducing average level load time by 38%",
                "Contributed to internal SDK for third-party analytics and A/B testing integration",
              ]}
            />
          </div>

          {/* Right column: Education + Skills */}
          <div>
            <SectionLabel>Education</SectionLabel>
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: "#e8e4df",
                  fontSize: "1rem",
                  marginBottom: "0.2rem",
                }}
              >
                B.S. Computer Science
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "#7a7470",
                  marginBottom: "0.1rem",
                }}
              >
                University of Washington
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "#5ecfbf",
                  letterSpacing: "0.05em",
                }}
              >
                2013 – 2017 · GPA 3.8
              </div>
            </div>

            <SectionLabel>Core Skills</SectionLabel>
            <div style={{ marginBottom: "3rem" }}>
              {[
                { area: "Languages", items: "C++, C#, Python, Rust, HLSL, GDScript" },
                { area: "Engines", items: "Unity, Unreal Engine 5, Godot 4" },
                { area: "Graphics", items: "OpenGL, Vulkan (learning), shader authoring" },
                { area: "Tools", items: "Git, Perforce, Jira, Rider, VS Code" },
                { area: "Systems", items: "ECS architecture, data-driven design, profiling" },
              ].map((s) => (
                <div
                  key={s.area}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "0.6rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "#6b1e2e",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                      paddingTop: "0.15rem",
                      minWidth: 80,
                    }}
                  >
                    {s.area}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      color: "#c8c4bf",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.items}
                  </span>
                </div>
              ))}
            </div>

            <SectionLabel>Highlights</SectionLabel>
            <div>
              {[
                "GDC 2023 speaker — Procedural Animation on a Budget",
                "1st place, Global Game Jam 2022 (Regional)",
                "Open source: voxel-mesher (1.2k GitHub stars)",
                "Technical blog: 40k monthly readers",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "#c8c4bf",
                    lineHeight: 1.6,
                    paddingLeft: "1rem",
                    borderLeft: "1px solid #2a2a2a",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .resume-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#5ecfbf",
        borderBottom: "2px solid #6b1e2e",
        paddingBottom: "0.5rem",
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

function ResumeEntry({
  title,
  org,
  period,
  bullets,
}: {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.2rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "1rem",
            color: "#e8e4df",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "#5ecfbf",
            letterSpacing: "0.06em",
          }}
        >
          {period}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "#7a7470",
          marginBottom: "0.75rem",
        }}
      >
        {org}
      </div>
      <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
        {bullets.map((b) => (
          <li
            key={b}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "#c8c4bf",
              lineHeight: 1.7,
              marginBottom: "0.25rem",
            }}
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        background: "#141414",
        borderTop: "3px solid #6b1e2e",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "7rem 2rem",
        }}
      >
        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "#5ecfbf",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            03 / Projects
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#e8e4df",
              margin: 0,
            }}
          >
            Selected Work
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: expanded ? "#1e1e1e" : "#141414",
        border: "1px solid #2a2a2a",
        transition: "background 0.2s",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.75rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#6b1e2e",
            letterSpacing: "0.1em",
            minWidth: 24,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 700,
            color: "#e8e4df",
            flex: 1,
          }}
        >
          {project.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#7a7470",
            letterSpacing: "0.05em",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {project.stack}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: expanded ? "#5ecfbf" : "#7a7470",
            marginLeft: "0.5rem",
            transition: "transform 0.3s, color 0.2s",
            display: "inline-block",
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            borderTop: "1px solid #2a2a2a",
          }}
          className="project-expanded"
        >
          <div
            style={{
              background: "#0c0c0c",
              position: "relative",
              minHeight: 280,
            }}
          >
            <img
              src={project.image}
              alt={project.alt}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                objectFit: "cover",
                display: "block",
                filter: "grayscale(15%) contrast(1.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(107,30,46,0.3) 0%, transparent 70%)",
              }}
            />
          </div>

          <div style={{ padding: "2rem" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "#c8c4bf",
                marginBottom: "1.5rem",
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                borderLeft: "2px solid #5ecfbf",
                paddingLeft: "1rem",
                marginBottom: "1.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "#5ecfbf",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Lessons Learned
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "#a0a09a",
                  margin: 0,
                }}
              >
                {project.lessons}
              </p>
            </div>

            <a
              href={project.github}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#e8e4df",
                textDecoration: "none",
                border: "1px solid #2a2a2a",
                padding: "0.6rem 1.2rem",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget).style.borderColor = "#6b1e2e";
                (e.currentTarget).style.color = "#6b1e2e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.borderColor = "#2a2a2a";
                (e.currentTarget).style.color = "#e8e4df";
              }}
            >
              <GithubIcon size={12} />
              View on GitHub
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .project-expanded { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        background: "#0c0c0c",
        borderTop: "3px solid #6b1e2e",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "7rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="contact-grid"
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "#5ecfbf",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            04 / Contact
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#e8e4df",
              margin: 0,
              marginBottom: "1.5rem",
            }}
          >
            Let's build
            <br />
            <span style={{ color: "#6b1e2e" }}>something together.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "#7a7470",
              maxWidth: 400,
            }}
          >
            I'm available for full-time roles, contract work, and creative
            collaborations. Reach out directly or find me on the platforms
            below — I respond to everything.
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "#7a7470",
              marginBottom: "0.5rem",
            }}
          >
            Direct contact
          </div>
          <a
            href="mailto:alex.chen@example.com"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "#e8e4df",
              textDecoration: "none",
              display: "block",
              marginBottom: "3rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget).style.color = "#5ecfbf")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget).style.color = "#e8e4df")
            }
          >
            alex.chen@example.com
          </a>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {[
              {
                label: "GitHub",
                handle: "@alexchen-dev",
                href: "#",
                icon: <GithubIcon size={18} />,
                color: "#e8e4df",
              },
              {
                label: "LinkedIn",
                handle: "Alex Chen",
                href: "#",
                icon: <LinkedinIcon size={18} />,
                color: "#0a66c2",
              },
              {
                label: "YouTube",
                handle: "Alex Chen Devlog",
                href: "#",
                icon: <YoutubeIcon size={18} />,
                color: "#ff0000",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  marginBottom: 1,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.borderColor = "#6b1e2e";
                  (e.currentTarget).style.background = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.borderColor = "#2a2a2a";
                  (e.currentTarget).style.background = "#141414";
                }}
              >
                <span style={{ color: link.color, display: "flex" }}>
                  {link.icon}
                </span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "#7a7470",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "#e8e4df",
                    }}
                  >
                    {link.handle}
                  </span>
                </span>
                <span style={{ color: "#7a7470", fontSize: "0.8rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #2a2a2a",
          padding: "1.5rem 2rem",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "#4a4a44",
          }}
        >
          © 2026 Alex Chen · All rights reserved
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            color: "#4a4a44",
          }}
        >
          Built with React + Vite
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        background: "#0c0c0c",
        color: "#e8e4df",
        minHeight: "100%",
      }}
    >
      <Nav />
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
