import { aboutParagraphs, profile } from '../data/siteContent'

function AboutPage() {
  return (
    <section>
      <div className="container">
        <div className="page-header reveal">
          <p className="section-label">About</p>
          <h1 className="page-title">Background and focus</h1>
        </div>
        <div className="about-content">
          <div className="about-text card reveal">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="about-details card reveal">
            <div className="detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">{profile.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Focus</span>
              <span className="detail-value">{profile.focus}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Languages</span>
              <span className="detail-value">{profile.languages}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Education</span>
              <span className="detail-value">{profile.education}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
