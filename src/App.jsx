import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import NeonCursor from "./component/NeonCursor";
import profileImg from "./assets/portfolio.jpeg";
import "./App.css";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.12 * i, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

function Button({ variant = "primary", href, onClick, children }) {
  const cls = variant === "primary" ? "btn btnPrimary" : "btn btnGhost";

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} type="button">
      {children}
    </button>
  );
}


function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="sectionHead">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function SkillBar({ label, value }) {
  return (
    <div className="skillRow">
      <div className="skillTop">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="bar">
        <motion.div
          className="barFill"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tags = [] }) {
  return (
    <motion.div
      className="card neon item"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="shine" />
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="tags">
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <input required placeholder="Your Name" />
        <input required type="email" placeholder="Your Email" />
        <textarea required placeholder="Your Message" />
        <motion.button
          className="btn btnPrimary"
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          type="submit"
        >
          Send Message
        </motion.button>
      </form>

      <div className={`toast ${sent ? "show" : ""}`}>✅ Message sent (demo)</div>
    </>
  );
}

export default function App() {
  // Typing effect
  const words = useMemo(() => ["Neon UI", "Web Apps", "Android Apps", "REST APIs"], []);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const speed = del ? 40 : 65;

    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, typed.length + 1);
        setTyped(next);
        if (next === word) setTimeout(() => setDel(true), 700);
      } else {
        const next = word.slice(0, Math.max(0, typed.length - 1));
        setTyped(next);
        if (next === "") {
          setDel(false);
          setIdx((x) => (x + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [typed, del, idx, words]);

  const downloadCV = () => {
    alert("Tip: Put CV.pdf inside /public and open /CV.pdf");
  };

  return (
    <div className="page">
      {/* ✅ Mouse pointer effect */}
      <NeonCursor />

      {/* animated background */}
      <div className="bg" />
      <div className="noise" />
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      {/* Nav */}
      <div className="nav">
        <div className="navInner">
          <div className="brand">
            <span className="dot" />
            <span>
               Data<span className="muted">ByAakif</span>
            </span>
          </div>
          <div className="links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      <div className="wrap">
        {/* Hero */}
        <div className="hero">
          <motion.div className="card neon heroLeft" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <div className="shine" />
            <h1>
              Hi, I’m <span className="accent">Aakif Ahamed H</span> 👋
              <br />
              <span className="hSub">
                I build <span className="typing">{typed}</span>
              </span>
            </h1>

            <p className="sub">
              Student developer focused on <b>React</b>, <b>Spring Boot</b>, <b>Android</b> and <b>Data Science</b>. I
              like clean UX with smooth animations and neon highlights.
            </p>

            <div className="actions">
              <Button variant="primary" href="#projects">
                ⚡ View Projects
              </Button>
              <Button variant="ghost" href="#contact">
                ✉️ Contact
              </Button>
              <Button
                variant="ghost"
                href={`${import.meta.env.BASE_URL}Aakif_Ahamed_CV.pdf`}
              >
                ⬇️ Download CV
              </Button>

            </div>

            <div className="miniGrid">
              <div className="mini">
                <b>React</b>
                <span>Frontend UI</span>
              </div>
              <div className="mini">
                <b>Spring Boot</b>
                <span>REST APIs</span>
              </div>
              <div className="mini">
                <b>Android</b>
                <span>Kotlin Apps</span>
              </div>
              <div className="mini">
                <b>Data Science</b>
                <span>Python, ML</span>
              </div>
              <div className="mini">
                <b>MERN</b>
                <span>Full-Stack</span>
              </div>
              <div className="mini">
                <b>Databases</b>
                <span>SQL, NoSQL</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="card neon heroRight" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <div className="shine" />

            <div className="avatar">
              <img src={profileImg} alt="Aakif Profile" />
            </div>

            <h3 className="cardTitle">Profile</h3>

            <p className="sub" style={{ marginTop: 0 }}>
              I enjoy building modern apps with strong UI/UX and animation.
            </p>

            <div className="pillRow">
              <span className="pill">Sri Lanka</span>
              <span className="pill">SLIIT</span>
              <span className="pill">Undergraduate Student</span>
              <span className="pill">Data Science</span>
              <span className="pill">Full-Stack</span>
              <span className="pill">UI Animation</span>
              <span className="pill">AI Enthusiast</span>
            </div>

            <div className="innerBox">
              <h4 style={{ margin: 0 }}>Quick Links</h4>

              <p className="sub">
                GitHub:{" "}
                <a
                  className="valueLink"
                  href="https://github.com/Aakif-byte"
                  target="_blank"
                  rel="noreferrer"
                >
                  Aakif-byte
                </a>
                <br />

                LinkedIn:{" "}
                <a
                  className="valueLink"
                  href="https://www.linkedin.com/in/aakif-ahamed-h-9a5ab2265/"
                  target="_blank"
                  rel="noreferrer"
                >
                  aakif-ahamed-h-9a5ab2265
                </a>
                <br />

                Email:{" "}
                <a className="valueLink" href="mailto:aakifahamed02012003@gmail.com">
                  aakifahamed02012003@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* About */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <Section id="about" title="About" subtitle="Who I am">
            <div className="card neon">
              <div className="shine" />
              <p className="sub" style={{ margin: 0 }}>
               Hello! I'm Aakif, a final-year Data Science student at SLIIT passionate about turning data into clear insights. I spend my time writing Python code, building machine learning models, and creating visualizations to solve real-world problems. As I complete my degree in 2026, I am eager to launch my career and help organizations make data-driven decisions. I thrive on learning new tools and am ready to bring my technical expertise and SLIIT-honed skills to a professional team.
               Currently, I am focusing on Deep Learning and advanced statistical analysis. When I'm not coding in Python, you'll find me exploring new Kaggle datasets or visualizing global trends.
              </p>
            </div>
          </Section>
        </motion.div>

        {/* Skills */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <Section id="skills" title="Skills" subtitle="Animated bars">
            <div className="card neon">
              <div className="shine" />
              <SkillBar label="React / Frontend" value={85} />
              <SkillBar label="Spring Boot / REST API" value={80} />
              <SkillBar label="Android (Kotlin)" value={75} />
              <SkillBar label="Data Science / ML Basics" value={65} />
              <SkillBar label="Python, R, C++, Java, C" value={70} />
              <SkillBar label="SQL / Database" value={60} />
              <SkillBar label="Power BI / Visualization" value={55} />
              <SkillBar label="Git / Version Control" value={80} />
              <SkillBar label="AWS, Azure Basics" value={50} />
            </div>
          </Section>
        </motion.div>

        {/* Projects */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <Section id="projects" title="Projects" subtitle="Hover neon cards">
            <div className="grid">
              <ProjectCard
                title="Breast Cancer Prediction"
                desc="Built a Random Forest model to predict breast cancer with 95% accuracy."
                tags={["React", "Python", "Full-Stack"]}
              />
              <ProjectCard
                title="ShutterSpace"
                desc="Photography platform with media uploads, user interactions, and clean UI."
                tags={["React", "Spring Boot", "Media"]}
              />
              <ProjectCard
                title="Productivity App"
                desc="Android app: tasks, reminders, stopwatch, notifications, widgets."
                tags={["Android", "Kotlin", "Notifications"]}
              />
              <ProjectCard
                title="Rainfall Prediction"
                desc="Machine Learning, regression models to forecast rainfall using weather data."
                tags={["React", "Python", "Full-Stack"]}
              />
              <ProjectCard
                title="Summarization Tool"
                desc="Developed a tool to summarize long articles into concise briefs and youtube links."
                tags={["React", "Python", "NLP"]}
              />
              <ProjectCard
                title="Data Warehousing and Business Intelligence"
                desc="Hotel Booking Analysis Interactive dashboard visualizing hotel booking trends over the last 5 years."
                tags={["Data Science", "Power BI", "Visualization", "ETL", "SQL"]}
              />
              <ProjectCard
                title="FOOD Production Management System"
                desc="FOOD Production Management System is a comprehensive application designed to streamline and optimize the entire food production process, from ingredient sourcing to final product delivery."
                tags={["MERN Stack", "Full-Stack"]}
              />
            </div>
          </Section>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <Section id="contact" title="Contact" subtitle="Send a message (demo)">
            <div className="card neon">
              <div className="shine" />
              <Contact />
              <div className="footer">© {new Date().getFullYear()} AAkif — Dark Neon Portfolio</div>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  );
}
