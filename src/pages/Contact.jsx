import { profile } from '../data/siteContent'

function ContactPage() {
  return (
    <section>
      <div className="container">
        <div className="page-header reveal center">
          <p className="section-label">Contact</p>
          <h1 className="page-title">Let&apos;s connect</h1>
        </div>
        <div className="contact-content card reveal">
          <p>
            I&apos;m always open to interesting conversations, collaborations, and new opportunities. Feel free to reach
            out.
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="contact-link">
              Email
            </a>
            <a href={profile.github} className="contact-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
