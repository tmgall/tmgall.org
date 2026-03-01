import { experienceItems } from '../data/siteContent'

function ExperiencePage() {
  return (
    <section>
      <div className="container">
        <div className="page-header reveal">
          <p className="section-label">Experience</p>
          <h1 className="page-title">Where I have worked</h1>
        </div>
        <ul className="timeline">
          {experienceItems.map((item) => (
            <li key={`${item.date}-${item.role}`} className="timeline-item reveal">
              <span className="timeline-date">{item.date}</span>
              <div>
                <h2 className="timeline-role">{item.role}</h2>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ExperiencePage
