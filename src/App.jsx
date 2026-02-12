import { useEffect, useRef, useState } from 'react'

function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const revealRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const scrollTo = (e, id) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileNavOpen(false)
  }

  return (
    <>
      {/* Navigation */}
      <nav className={navScrolled ? 'scrolled' : ''}>
        <div className="container">
          <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, '#')}>
            tmgall
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-links${mobileNavOpen ? ' open' : ''}`}>
            <li><a href="#about" onClick={(e) => scrollTo(e, '#about')}>About</a></li>
            <li><a href="#experience" onClick={(e) => scrollTo(e, '#experience')}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => scrollTo(e, '#projects')}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <p className="hero-label">Software Engineer</p>
          <h1>Hi, I'm T.M. Gall</h1>
          <p className="hero-description">
            I build thoughtful, reliable software. Currently focused on creating
            tools and systems that make complex problems feel simple.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary" onClick={(e) => scrollTo(e, '#contact')}>
              Get in touch
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </a>
            <a href="#experience" className="btn btn-secondary" onClick={(e) => scrollTo(e, '#experience')}>View resume</a>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider"></div></div>

      {/* About */}
      <section id="about">
        <div className="container">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">01 — About</p>
            <h2 className="section-title">A bit about me</h2>
          </div>
          <div className="about-content reveal" ref={addRevealRef}>
            <div className="about-text">
              <p>
                I'm a software engineer who cares about writing clean, maintainable code
                and building products that people actually enjoy using. I believe in
                simplicity, clear thinking, and shipping work that matters.
              </p>
              <p>
                When I'm not writing code, you'll find me exploring new technologies,
                contributing to open-source projects, and continuously learning about
                the craft of software engineering.
              </p>
            </div>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">Your City, ST</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Focus</span>
                <span className="detail-value">Full Stack</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Languages</span>
                <span className="detail-value">TS, Python, Go</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Education</span>
                <span className="detail-value">B.S. Computer Science</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider"></div></div>

      {/* Experience */}
      <section id="experience">
        <div className="container">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">02 — Experience</p>
            <h2 className="section-title">Where I've worked</h2>
          </div>
          <ul className="timeline reveal" ref={addRevealRef}>
            <li className="timeline-item">
              <span className="timeline-date">2023 — Present</span>
              <div>
                <h3 className="timeline-role">Senior Software Engineer</h3>
                <p className="timeline-company">Company Name</p>
                <p className="timeline-desc">
                  Led development of core platform features serving thousands of users.
                  Architected scalable backend services and mentored junior engineers.
                </p>
                <div className="timeline-tags">
                  <span className="tag">TypeScript</span>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">AWS</span>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-date">2021 — 2023</span>
              <div>
                <h3 className="timeline-role">Software Engineer</h3>
                <p className="timeline-company">Previous Company</p>
                <p className="timeline-desc">
                  Built and maintained full-stack web applications. Improved CI/CD
                  pipelines and reduced deployment times by 40%.
                </p>
                <div className="timeline-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Django</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Docker</span>
                </div>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-date">2019 — 2021</span>
              <div>
                <h3 className="timeline-role">Junior Developer</h3>
                <p className="timeline-company">First Company</p>
                <p className="timeline-desc">
                  Developed internal tools and customer-facing features.
                  Contributed to code reviews and adopted agile methodologies.
                </p>
                <div className="timeline-tags">
                  <span className="tag">JavaScript</span>
                  <span className="tag">Vue.js</span>
                  <span className="tag">MySQL</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="container"><div className="divider"></div></div>

      {/* Projects */}
      <section id="projects">
        <div className="container">
          <div className="section-header reveal" ref={addRevealRef}>
            <p className="section-label">03 — Projects</p>
            <h2 className="section-title">Things I've built</h2>
          </div>
          <div className="projects-grid reveal" ref={addRevealRef}>
            <div className="project-card">
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
              </div>
              <h3 className="project-name">Project One</h3>
              <p className="project-desc">A brief description of what this project does and the problem it solves. Replace with your real project.</p>
              <div className="project-links">
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l-1.757 1.757a4.5 4.5 0 010 6.364l4.5-4.5a4.5 4.5 0 00-6.364-6.364" /></svg>
                  Live
                </a>
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  Source
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
              </div>
              <h3 className="project-name">Project Two</h3>
              <p className="project-desc">Another project description. Highlight the tech stack, the impact, and what made it interesting.</p>
              <div className="project-links">
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l-1.757 1.757a4.5 4.5 0 010 6.364l4.5-4.5a4.5 4.5 0 00-6.364-6.364" /></svg>
                  Live
                </a>
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  Source
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              </div>
              <h3 className="project-name">Project Three</h3>
              <p className="project-desc">A third project. Maybe an open-source contribution, a side project, or a tool you built for yourself.</p>
              <div className="project-links">
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  Source
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="project-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <h3 className="project-name">Project Four</h3>
              <p className="project-desc">Another project. Keep these concise — highlight the what, the why, and the tech.</p>
              <div className="project-links">
                <a href="#" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l-1.757 1.757a4.5 4.5 0 010 6.364l4.5-4.5a4.5 4.5 0 00-6.364-6.364" /></svg>
                  Live
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider"></div></div>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <div className="section-header reveal" ref={addRevealRef} style={{ textAlign: 'center' }}>
            <p className="section-label">04 — Contact</p>
            <h2 className="section-title">Let's connect</h2>
          </div>
          <div className="contact-content reveal" ref={addRevealRef}>
            <p>
              I'm always open to interesting conversations, collaborations,
              and new opportunities. Feel free to reach out.
            </p>
            <div className="contact-links">
              <a href="mailto:hello@tmgall.org" className="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Email
              </a>
              <a href="https://github.com/tmgall" className="contact-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/tmgall" className="contact-link" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p className="footer-text">&copy; 2026 T.M. Gall</p>
          <p className="footer-text">Built with <span>care</span></p>
        </div>
      </footer>
    </>
  )
}

export default App
