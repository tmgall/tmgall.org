import { aboutParagraphs, experienceItems, profile, projectItems } from '../data/siteContent'

function HomePage({ onNavigate }) {
  const featuredExperience = experienceItems[0]
  const featuredProjects = projectItems.slice(0, 2)

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="hero-label reveal">{profile.role}</p>
          <h1 className="reveal">Hi, I&apos;m {profile.name}</h1>
          <p className="hero-description reveal">{profile.summary}</p>
          <div className="hero-cta reveal">
            <a href="/contact" className="btn btn-primary" onClick={(event) => onNavigate(event, '/contact')}>
              Get in touch
            </a>
            <a href="/experience" className="btn btn-secondary" onClick={(event) => onNavigate(event, '/experience')}>
              View experience
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header reveal">
            <p className="section-label">Highlights</p>
            <h2 className="section-title">Main things to know</h2>
          </div>
          <div className="home-grid">
            <article className="card reveal">
              <h3>About</h3>
              <p>{aboutParagraphs[0]}</p>
              <a href="/about" className="text-link" onClick={(event) => onNavigate(event, '/about')}>
                Read full background
              </a>
            </article>
            <article className="card reveal">
              <h3>Current focus</h3>
              <p>{featuredExperience.description}</p>
              <a href="/experience" className="text-link" onClick={(event) => onNavigate(event, '/experience')}>
                See complete timeline
              </a>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-header reveal">
            <p className="section-label">Featured projects</p>
            <h2 className="section-title">Selected work</h2>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <article key={project.name} className="project-card reveal">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
              </article>
            ))}
          </div>
          <div className="section-actions reveal">
            <a href="/projects" className="btn btn-secondary" onClick={(event) => onNavigate(event, '/projects')}>
              View all projects
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
