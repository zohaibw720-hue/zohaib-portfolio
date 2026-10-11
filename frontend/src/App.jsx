
import { lazy, Suspense, useState } from 'react'
import './App.css'

const Hero3D = lazy(() => import('./components/Hero3D'))

const API_URL = `${
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
}/api/contact`

const skills = [
  'React.js',
  'JavaScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Git & GitHub',
  'HTML5',
  'CSS3',
  'Responsive Design',
  'C++',
  'SQL & NoSQL',
]

const projects = [
  {
    title: 'Urban Cart',
    category: 'E-Commerce Website',
    description:
      'An e-commerce web application focused on online shopping and a responsive user interface.',
    technologies: ['React', 'JavaScript', 'CSS'],
    status: 'In Progress',
    link: 'https://ecommerce-arns.vercel.app/',
  },
  {
    title: 'AI JobTrack',
    category: 'AI-Powered Job Platform',
    description:
      'A job application tracker with application status management and interview features.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    status: 'In Progress',
  },
  {
    title: 'DevConnect',
    category: 'Developer Collaboration',
    description:
      'A developer collaboration platform focused on projects and connecting developers.',
    technologies: ['React', 'Express', 'MongoDB'],
    status: 'In Progress',
  },
  {
    title: 'School Management System',
    category: 'Management Application',
    description:
      'A school management application being developed to organize school records and workflows.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    status: 'In Progress',
  },
]

const education = [
  {
    title: 'BS Software Engineering',
    institution: 'University of Gujrat',
    details: 'Bachelor’s degree in Software Engineering.',
  },
  {
    title: 'Intermediate in ICS',
    institution: 'Paradise College, Shakargarh',
    details: 'Intermediate education in Computer Science.',
  },
  {
    title: 'Matriculation — Science',
    institution: 'Rising Star School, Shakargarh',
    details: 'Secondary education in Science.',
  },
]

const experience = [
  {
    role: 'MERN Stack Developer Trainee',
    organization: 'ExD / NAVTTC',
    description:
      'Technical training focused on full-stack web development and the MERN stack.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    role: 'Computer & Mathematics Teacher',
    organization: 'Allied School',
    description:
      'Teaching computer science and mathematics to school students.',
    technologies: ['Computer Science', 'Mathematics'],
  },
]

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState({
    type: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormStatus({ type: '', message: '' })
    setIsSubmitting(true)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your message.')
      }

      setFormStatus({
        type: 'success',
        message: 'Your message was sent successfully. Thank you!',
      })

      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message:
          error.message === 'Failed to fetch'
            ? 'Could not connect to the server. Please try again later.'
            : error.message || 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="portfolio">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Zohaib home">
          ZW<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="#contact">
          Let&apos;s Talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              MERN STACK DEVELOPER
            </p>

            <h1>
              Building digital
              <br />
              experiences with
              <br />
              <span>modern web tech.</span>
            </h1>

            <p className="hero-description">
              I&apos;m Zohaib, a Software Engineering graduate and MERN Stack
              Developer focused on building responsive web applications with
              React, Node.js, Express, and MongoDB.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore My Work <span aria-hidden="true">↗</span>
              </a>

              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>

              <a
                className="button button-secondary"
                href="/Zohaib_Waqar_CV.pdf"
                download
              >
                Download CV ↓
              </a>
            </div>

            <div className="hero-meta">
              <span>Based in Pakistan</span>
              <span className="meta-divider" />
              <span>Open to opportunities</span>
            </div>
          </div>

          <div className="hero-visual">
            <Suspense
              fallback={<div className="hero-3d-fallback" aria-hidden="true" />}
            >
              <Hero3D />
            </Suspense>

            <div className="visual-label visual-label-top">
              <span>01</span> FULL STACK
            </div>

            <div className="visual-label visual-label-bottom">
              REACT · NODE · MONGO
            </div>
          </div>
        </section>

        <section className="about section-container section-block" id="about">
          <p className="eyebrow">01 / ABOUT ME</p>

          <h2>
            Turning ideas into
            <br />
            <span>useful web experiences.</span>
          </h2>

          <p className="section-description">
            I&apos;m a Software Engineering graduate interested in developing
            practical web applications and improving user experiences. I focus
            on clean code, responsive interfaces, and reliable full-stack
            functionality while continuing to improve my development skills.
          </p>
        </section>

        <section className="section-container section-block" id="skills">
          <p className="eyebrow">02 / TECH STACK</p>
          <h2>Tools I work with.</h2>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                <span className="skill-indicator" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="section-container section-block" id="education">
          <p className="eyebrow">03 / EDUCATION</p>
          <h2>My educational background.</h2>

          <div className="projects-grid">
            {education.map((item) => (
              <article className="project-card" key={item.title}>
                <p className="project-category">Education</p>
                <h3>{item.title}</h3>
                <p>{item.institution}</p>
                <p>{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-container section-block" id="experience">
          <p className="eyebrow">04 / EXPERIENCE</p>
          <h2>My professional journey.</h2>

          <div className="projects-grid">
            {experience.map((item) => (
              <article className="project-card" key={item.role}>
                <p className="project-category">Experience &amp; Training</p>
                <h3>{item.role}</h3>
                <p>{item.organization}</p>
                <p>{item.description}</p>

                <div className="technology-list">
                  {item.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-container section-block" id="projects">
          <p className="eyebrow">05 / SELECTED WORK</p>
          <h2>Projects I&apos;m building.</h2>

          <p className="section-description">
            Explore my web development projects and the technologies used
            to build them.
          </p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top">
                  <span className="project-index">
                    PROJECT / {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="project-status">{project.status}</span>
                </div>

                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                {project.link && (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <span aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          className="section-container section-block contact-section"
          id="contact"
        >
          <p className="eyebrow">06 / CONTACT</p>

          <h2>
            Have a project or
            <br />
            <span>an opportunity in mind?</span>
          </h2>

          <p className="section-description">
            I&apos;m interested in junior developer roles, internships,
            and opportunities to build useful web applications.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                autoComplete="name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={handleChange}
                maxLength={3000}
                rows={6}
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              className="button button-primary contact-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message ↗'}
            </button>

            {formStatus.message && (
              <p
                className={`form-feedback ${
                  formStatus.type === 'success'
                    ? 'form-feedback-success'
                    : 'form-feedback-error'
                }`}
                role="status"
                aria-live="polite"
              >
                {formStatus.message}
              </p>
            )}
          </form>

          <div className="contact-actions">
            <a
              className="button button-secondary"
              href="mailto:zohaibw720@gmail.com"
            >
              Email Me ↗
            </a>

            <a
              className="button button-secondary"
              href="tel:+923167918426"
            >
              Call Me ↗
            </a>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/zohaibw720-hue"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/zohaib-waqar-086572382"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <p className="contact-email">
            Email:{' '}
            <a href="mailto:zohaibw720@gmail.com">
              zohaibw720@gmail.com
            </a>
          </p>

          <p className="contact-phone">
            Phone: <a href="tel:+923167918426">0316 7918426</a>
          </p>
        </section>
      </main>

      <footer className="footer section-container">
        <a className="brand" href="#home" aria-label="Back to home">
          ZW<span>.</span>
        </a>

        <p>Designed and built with React.</p>

        <div className="footer-socials">
          <a
            href="https://github.com/zohaibw720-hue"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/zohaib-waqar-086572382"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
