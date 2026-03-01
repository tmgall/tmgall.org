function NotFoundPage({ onNavigate }) {
  return (
    <section>
      <div className="container">
        <div className="empty-state card reveal">
          <p className="section-label">404</p>
          <h1 className="page-title">Page not found</h1>
          <p>The page you requested does not exist in this site.</p>
          <a href="/" className="btn btn-primary" onClick={(event) => onNavigate(event, '/')}>
            Go home
          </a>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
