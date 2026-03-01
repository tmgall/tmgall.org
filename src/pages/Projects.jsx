import { useState } from 'react'
import RandomWalkDemo from '../components/RandomWalkDemo'
import { projectItems } from '../data/siteContent'

function ProjectsPage() {
  const [expandedProjects, setExpandedProjects] = useState(() => ({}))

  const toggleExpanded = (name) => {
    setExpandedProjects((current) => ({ ...current, [name]: !current[name] }))
  }

  return (
    <section>
      <div className="container">
        <div className="projects-grid projects-grid-single">
          {projectItems.map((project) => {
            const isExpanded = Boolean(expandedProjects[project.name])
            return (
            <article key={project.name} className={`project-card${isExpanded ? ' expanded' : ''}`}>
              <h2 className="project-name">{project.name}</h2>
              {project.showDemo ? <RandomWalkDemo /> : null}
              <button
                type="button"
                className="project-expand-btn"
                onClick={() => toggleExpanded(project.name)}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? 'Hide details' : 'Learn more about this project'}</span>
                <span className={`project-expand-icon${isExpanded ? ' open' : ''}`}>▾</span>
              </button>

              {!isExpanded ? <p className="project-collapsed-note">Click to expand and view full research details, results, and links.</p> : null}

              {isExpanded ? (
                <div className="project-details">
                  <p className="project-desc">
                    {project.description}
                    {project.liveUrl ? <> Play at <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{project.liveUrl.replace('https://', '')}</a>.</> : null}
                  </p>
                  {project.context ? <p className="project-desc">{project.context}</p> : null}

                  {project.methods?.length ? (
                    <div className="project-section">
                      <h3 className="project-subtitle">What I built</h3>
                      <ul className="project-list">
                        {project.methods.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {project.outcomes?.length ? (
                    <div className="project-section">
                      <h3 className="project-subtitle">Key outcomes</h3>
                      <ul className="project-list">
                        {project.outcomes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {project.stack?.length ? <p className="project-meta">Tech: {project.stack.join(' • ')}</p> : null}

                  <div className="project-links">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live
                      </a>
                    ) : null}
                    {project.sourceUrl ? (
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Repository
                      </a>
                    ) : null}
                    {project.paperUrl ? (
                      <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        {project.paperLabel ?? 'Paper'}
                      </a>
                    ) : null}
                    {!project.liveUrl && !project.sourceUrl ? <span className="project-meta">Private/internal project</span> : null}
                  </div>
                </div>
              ) : null}
            </article>
          )})}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage
