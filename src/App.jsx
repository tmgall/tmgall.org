import { useEffect, useMemo, useState } from 'react'
import { profile } from './data/siteContent'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import ExperiencePage from './pages/Experience'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import ProjectsPage from './pages/Projects'

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/experience': ExperiencePage,
  '/projects': ProjectsPage,
  '/contact': ContactPage,
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

const normalizePath = (path) => {
  if (!path) return '/'
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1)
  }
  return path
}

function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40)
    }

    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname))
      setMobileNavOpen(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('popstate', handlePopState)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handlePopState)
    }
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

    const revealNodes = document.querySelectorAll('.reveal')
    revealNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [path])

  const CurrentPage = useMemo(() => routes[path] ?? NotFoundPage, [path])

  const navigate = (event, nextPath) => {
    event.preventDefault()
    const normalizedNextPath = normalizePath(nextPath)
    if (normalizedNextPath === path) {
      setMobileNavOpen(false)
      return
    }

    window.history.pushState({}, '', normalizedNextPath)
    setPath(normalizedNextPath)
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className={navScrolled ? 'scrolled' : ''}>
        <div className="container">
<<<<<<< HEAD
          <a href="#" className="nav-logo" onClick={(e) => scrollTo(e, '#')}>
            Tyler Gall
=======
          <a href="/" className="nav-logo" onClick={(event) => navigate(event, '/')}>
            tmgall
>>>>>>> ceb8d4c (Add projects page, torus animation, and Lexicon project entry)
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-links${mobileNavOpen ? ' open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={path === item.path ? 'active' : ''}
                  onClick={(event) => navigate(event, item.path)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="page-main">
        <CurrentPage onNavigate={navigate} />
      </main>

      <footer>
        <div className="container">
          <p className="footer-text">&copy; {new Date().getFullYear()} {profile.name}</p>
          <p className="footer-text">
            Built with <span>care</span>
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
