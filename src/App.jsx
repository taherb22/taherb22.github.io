import { useState, useEffect, useRef } from "react";

const data = {
  name: "Mohamed Taher Boudrigua",
  title: "Applied AI Engineer · MLOps · NLP Research",
  subtitle: "Final-year Engineering Student @ SUPCOM",
  bio: "Applied AI engineer with a background spanning the full stack — from training language models and building NLP pipelines to deploying cloud infrastructure and securing distributed systems. I work at the intersection of AI, MLOps, and DevOps, building systems that are not just technically sound but production-ready.",
  interests: [
    "Applied AI & NLP Systems",
    "MLOps & Model Deployment",
    "LLM Fine-Tuning & Pretraining",
    "Cloud Infrastructure & DevOps",
    "AI for Software Engineering",
    "Data Engineering & Pipelines",
  ],
  experience: [
    {
      company: "PCP Consulting",
      role: "ML Engineer — End-of-Studies Research Project",
      period: "Feb 2025 – Present",
      location: "Toulouse, France",
      points: [
        "Pretraining a 100M-parameter autoregressive Transformer SLM from scratch for DevOps automation",
        "Custom BPE tokenizer grounded in GPT-2, StarCoder, and SantaCoder literature",
        "Adapted split optimizer: AdamW for embeddings/scalars, Muon for weight matrices",
        "BOS-aligned sequence packing, compute-optimal tokens-to-params ratio of 10.5",
      ],
      tags: ["PyTorch", "Hugging Face", "BPE", "LLaMA"],
    },
    {
      company: "PCP Consulting",
      role: "Part-Time Machine Learning Engineer",
      period: "Dec 2024 – Present",
      location: "Toulouse, France",
      points: [
        "Constructed domain-specific pretraining corpus (~3.5B tokens) from IaC sources",
        "End-to-end data pipelines with multi-layered quality validation",
        "Synthetic data generation via Qwen 2.5 Coder on GCP Vertex AI",
      ],
      tags: ["GCP Vertex AI", "Docker", "NLP Pipelines", "Python"],
    },
    {
      company: "ELYADATA",
      role: "Software Data Engineer Intern",
      period: "Jul 2024 – Sep 2024",
      location: "Tunis, Tunisia",
      points: [
        "Multi-agent AI system using LangChain + LangGraph for CI/CD security analysis",
        "FastAPI backend integrated directly into Jenkins pipelines",
      ],
      tags: ["LangChain", "LangGraph", "FastAPI", "Jenkins"],
    },
    {
      company: "6NLG Security",
      role: "Cloud Security Intern",
      period: "Sep 2025 – Dec 2025",
      location: "Tunis, Tunisia",
      points: [
        "Implemented a Cloud Access Security Broker (CASB) to enforce data protection policies across cloud applications",
        "Developed Data Loss Prevention (DLP) rules to secure sensitive data flows in cloud environments",
      ],
      tags: ["CASB", "DLP", "Cloud Security"],
    },
  ],
  projects: [
    {
      title: "Efficient Fine-Tuning of LLaMA 3B",
      description:
        "Systematic investigation of LoRA and QLoRA for domain adaptation under constrained compute. 4-bit quantization, PEFT, Unsloth. Full analysis documented.",
      tags: ["LoRA", "QLoRA", "bitsandbytes", "PEFT"],
      link: "https://www.kaggle.com/code/taherboudriga/fine-tunning-notebook",
      linkLabel: "Kaggle Notebook",
    },
    {
      title: "AI-Powered Jenkins Pipeline Auditor",
      description:
        "Multi-agent CI/CD security analysis system. LangGraph orchestration, FastAPI backend, integrated into Jenkins pipelines.",
      tags: ["LangGraph", "LangChain", "FastAPI", "Docker"],
      link: "https://github.com/taherb22/AI-powered-jenkins-pipeline-auditor",
      linkLabel: "GitHub Repo",
    },
    {
      title: "Domain-Specific Pretraining Corpus",
      description:
        "End-to-end pipeline producing ~3.5B tokens from AWS, Azure, GCP, Kubernetes, Terraform docs. Multi-layered quality validation + synthetic augmentation.",
      tags: ["Data Engineering", "NLP", "GCP", "Python"],
      link: null,
      linkLabel: null,
    },
    {
      title: "Automated Kubernetes Cluster on Azure",
      description:
        "End-to-end automated Kubernetes cluster deployment on Azure using Infrastructure as Code — Terraform for provisioning, Ansible for configuration management, Jenkins pipelines for orchestration.",
      tags: ["Terraform", "Ansible", "Azure", "Kubernetes", "Jenkins", "Docker"],
      link: "https://github.com/taherb22/kubernetes-azure-automation",
      linkLabel: "GitHub Repo",
    },
  ],
  skills: {
    "Languages": ["Python", "C/C++", "SQL", "Bash"],
    "ML / NLP": ["PyTorch", "Hugging Face", "LLM Pretraining", "BPE Tokenization", "PEFT", "RAG"],
    "AI Frameworks": ["LangChain", "LangGraph"],
    "Cloud & DevOps": ["GCP Vertex AI", "Docker", "Jenkins", "FastAPI", "Git"],
  },
  achievements: [
    { rank: "27th", event: "Tunisian Collegiate Programming Contest (TCPC) 2024" },
    { rank: "30th", event: "Tunisian Collegiate Programming Contest (TCPC) 2025" },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/taher-boudriga-848233283/",
    github: "https://github.com/taherb22",
    codeforces: "https://codeforces.com/profile/taherboudriga23",
    kaggle: "https://www.kaggle.com/taherboudriga",
    email: "mohamedtaher.boudrigua@supcom.tn",
  },
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const navItems = ["about", "experience", "projects", "skills", "contact"];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...navItems].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#ffffff",
      color: "#1a1a1a",
      minHeight: "100vh",
      lineHeight: 1.7,
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #2a6496; border-radius: 2px; }
        ::selection { background: rgba(42,100,150,0.12); }
        a { color: #2a6496; text-decoration: none; transition: color 0.2s; }
        a:hover { color: #1a4070; }

        .nav-link {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aaa;
          cursor: pointer;
          transition: color 0.2s;
          padding: 6px 0;
          background: none;
          border: none;
        }
        .nav-link:hover, .nav-link.active { color: #2a6496; }

        .section { padding: 80px 0; }

        .section-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #2a6496;
          margin-bottom: 8px;
        }

        .section-title {
          font-size: clamp(24px, 3vw, 36px);
          font-weight: normal;
          color: #1a1a1a;
          margin-bottom: 48px;
          border-bottom: 1px solid #eee;
          padding-bottom: 16px;
        }

        .tag {
          display: inline-block;
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          padding: 3px 8px;
          border: 1px solid #c5d8ea;
          color: #2a6496;
          border-radius: 2px;
          margin: 2px;
          background: #f0f6fb;
        }

        .card {
          border: 1px solid #eee;
          border-left: 3px solid #2a6496;
          padding: 24px 28px;
          margin-bottom: 24px;
          background: #fafafa;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          border-color: #2a6496;
          background: #f0f6fb;
          box-shadow: 0 2px 16px rgba(42,100,150,0.07);
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }
        .exp-company { font-size: 18px; color: #1a3a5c; }
        .exp-period {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #bbb;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        .exp-role { color: #2a6496; font-size: 14px; margin-bottom: 16px; font-style: italic; }
        .exp-points { list-style: none; padding: 0; margin-bottom: 16px; }
        .exp-points li {
          font-size: 14px;
          color: #555;
          padding: 3px 0 3px 16px;
          position: relative;
        }
        .exp-points li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #2a6496;
        }

        .project-title { font-size: 18px; color: #1a1a1a; margin-bottom: 10px; }
        .project-desc { font-size: 14px; color: #666; margin-bottom: 16px; line-height: 1.8; }
        .project-link {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: #2a6496;
          border-bottom: 1px solid rgba(42,100,150,0.3);
          padding-bottom: 1px;
        }
        .project-link:hover { color: #1a4070; border-color: #2a6496; }

        .skill-group { margin-bottom: 20px; }
        .skill-group-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 10px;
        }

        .achievement {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        .achievement-rank {
          font-size: 22px;
          color: #2a6496;
          font-weight: normal;
          min-width: 60px;
        }
        .achievement-event { font-size: 14px; color: #666; }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }
        .contact-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: #bbb;
          min-width: 90px;
        }

        .hero-name {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: normal;
          letter-spacing: -1px;
          color: #1a1a1a;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .hero-title {
          font-family: 'Courier New', monospace;
          font-size: clamp(11px, 1.5vw, 14px);
          letter-spacing: 3px;
          color: #2a6496;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .hero-sub {
          font-size: 14px;
          color: #aaa;
          font-style: italic;
          margin-bottom: 32px;
        }
        .hero-bio {
          font-size: 16px;
          color: #555;
          max-width: 560px;
          line-height: 1.9;
          margin-bottom: 40px;
        }

        .interest-chip {
          display: inline-block;
          font-size: 12px;
          color: #666;
          border: 1px solid #ddd;
          padding: 6px 14px;
          margin: 4px;
          border-radius: 20px;
          transition: all 0.2s;
          background: #fafafa;
        }
        .interest-chip:hover {
          border-color: #2a6496;
          color: #2a6496;
          background: #f0f6fb;
        }

        @media (max-width: 768px) {
          .exp-header { flex-direction: column; }
          .two-col { grid-template-columns: 1fr !important; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #eee",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "56px",
      }}>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "12px", letterSpacing: "2px", color: "#2a6496",
        }}>MTB</span>
        <div style={{ display: "flex", gap: "32px" }}>
          {navItems.map(id => (
            <button key={id} className={`nav-link ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}>{id}</button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 32px" }}>

        {/* HERO */}
        <section id="about" className="section" style={{ paddingTop: "120px", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            width: "80px", height: "80px",
            borderRadius: "50%",
            border: "2px solid #2a6496",
            marginBottom: "32px",
            background: "#f0f6fb",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#2a6496", fontSize: "24px",
            overflow: "hidden",
          }}>
            <img  src="/profile.jpg" alt="Mohamed Taher Boudrigua "
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "none" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <span style={{ fontFamily: "Georgia", fontStyle: "italic" }}>M</span>
          </div>

          <div style={{ animation: "fadeUp 0.8s ease forwards" }}>
            <p className="hero-title">{data.title}</p>
            <h1 className="hero-name">{data.name}</h1>
            <p className="hero-sub">{data.subtitle}</p>
            <p className="hero-bio">{data.bio}</p>
          </div>

          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "3px", color: "#2a6496", textTransform: "uppercase", marginBottom: "12px" }}>
              Research Interests
            </p>
            <div>
              {data.interests.map(i => <span key={i} className="interest-chip">{i}</span>)}
            </div>
          </FadeIn>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <FadeIn>
            <p className="section-label">Research & Professional</p>
            <h2 className="section-title">Experience</h2>
          </FadeIn>
          {data.experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card">
                <div className="exp-header">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <p className="exp-role">{exp.role} · {exp.location}</p>
                <ul className="exp-points">
                  {exp.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <div>{exp.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <FadeIn>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Projects</h2>
          </FadeIn>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {data.projects.map((proj, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card" style={{ height: "100%" }}>
                  <p className="project-title">{proj.title}</p>
                  <p className="project-desc">{proj.description}</p>
                  <div style={{ marginBottom: proj.link ? "16px" : "0" }}>
                    {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      ↗ {proj.linkLabel}
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <FadeIn>
            <p className="section-label">Technical</p>
            <h2 className="section-title">Skills</h2>
          </FadeIn>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            {Object.entries(data.skills).map(([group, items], i) => (
              <FadeIn key={group} delay={i * 0.08}>
                <div className="skill-group">
                  <p className="skill-group-label">{group}</p>
                  <div>{items.map(s => <span key={s} className="tag">{s}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: "48px" }}>
              <p className="section-label" style={{ marginBottom: "16px" }}>Competitive Programming</p>
              {data.achievements.map((a, i) => (
                <div key={i} className="achievement">
                  <span className="achievement-rank">#{a.rank}</span>
                  <span className="achievement-event">{a.event}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <FadeIn>
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">Contact</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            {[
              { label: "EMAIL", value: data.links.email, href: `mailto:${data.links.email}` },
              { label: "LINKEDIN", value: "taher-boudriga", href: data.links.linkedin },
              { label: "GITHUB", value: "taherb22", href: `https://github.com/taherb22` },
              { label: "KAGGLE", value: "taherboudriga", href: data.links.kaggle },
              { label: "CODEFORCES", value: "taherboudriga23", href: data.links.codeforces },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <span className="contact-label">{item.label}</span>
                <a href={item.href} target="_blank" rel="noopener noreferrer">{item.value}</a>
              </div>
            ))}
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer style={{
          padding: "40px 0",
          borderTop: "1px solid #eee",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "2px", color: "#ccc" }}>
            MOHAMED TAHER BOUDRIGUA · 2025
          </span>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "2px", color: "#ccc" }}>
            APPLIED AI ENGINEER · MLOPS · NLP RESEARCH
          </span>
        </footer>

      </div>
    </div>
  );
}