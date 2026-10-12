
import { lazy, Suspense, useState } from 'react'
import './App.css'

import {
  FaCode,
  FaDatabase,
  FaMobileAlt,
  FaCss3Alt,
} from 'react-icons/fa'

import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiHtml5,
  SiPostman,
  SiCplusplus,
  SiMysql,
} from 'react-icons/si'

const Hero3D = lazy(() => import('./components/Hero3D'))

const API_URL = `${
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
}/api/contact`

const skills = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#68A063' },
  { name: 'Express.js', icon: SiExpress, color: '#FFFFFF' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MongoDB Atlas', icon: SiMongodb, color: '#47A248' },
  { name: 'REST APIs', icon: FaCode, color: '#A78BFA' },
  { name: 'Git & GitHub', icon: SiGithub, color: '#FFFFFF' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'Responsive Design', icon: FaMobileAlt, color: '#38BDF8' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'SQL & NoSQL', icon: FaDatabase, color: '#60A5FA' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
]

const projects = [
  {
    title: 'Urban Cart',
    category: 'E-Commerce Website',
    description:
      'An e-commerce web application focused on online shopping and a responsive user interface.',
    technologies: ['React', 'JavaScript', 'CSS'],
    status: 'completed',
    link: 'https://ecommerce-arns.vercel.app/',
    cover: 'urban-cart',
    coverLabel: 'SHOP SMARTER',
    coverIcon: '🛍️',
  },
  {
    title: 'AI JobTrack',
    category: 'AI-Powered Job Platform',
    description:
      'A job application tracker with application status management and interview features.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    status: 'In Progress',
    cover: 'ai-jobtrack',
    coverLabel: 'YOUR CAREER JOURNEY',
    coverIcon: '🎯',
  },
  {
    title: 'DevConnect',
    category: 'Developer Collaboration',
    description:
      'A developer collaboration platform focused on projects and connecting developers.',
    technologies: ['React', 'Express', 'MongoDB'],
    status: 'In Progress',
    cover: 'devconnect',
    coverLabel: 'BUILD TOGETHER',
    coverIcon: '💻',
  },
  {
    title: 'School Management System',
    category: 'Management Application',
    description:
      'A school management application being developed to organize school records and workflows.',
    technologies: ['Node.js', 'Express', 'MongoDB Atlas'],
    status: 'In Progress',
    cover: 'school-management',
    coverLabel: 'SMARTER SCHOOL OPERATIONS',
    coverIcon: '🎓',
  },
  {
    title: 'AI Smart Tower Travel & Tourism System',
    category: 'AI-Based Travel & Tourism',
    description:
      'A full-stack tourism project focused on AI-assisted travel planning and tourism experiences.',
    technologies: [
      'React',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Postman',
    ],
    status: 'In Progress',
    cover: 'smart-tourism',
    coverLabel: 'EXPLORE THE WORLD',
    coverIcon: '🌍',
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
    period: '23 July 2026 – 23 September 2026',
    status: 'Completed',
    description:
      'Completed technical training focused on full-stack web development and the MERN stack.',
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
          <div className="about-content">
            <p className="eyebrow">01 / ABOUT ME</p>

            <h2>
              Turning ideas into
              <br />
              <span>useful web experiences.</span>
            </h2>

            <p className="section-description">
              I&apos;m a Software Engineering graduate interested in developing
              practical web applications and improving user experiences. I
              focus on clean code, responsive interfaces, and reliable
              full-stack functionality while continuing to improve my
              development skills.
            </p>

            <div className="about-highlights">
              <span>React.js</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </div>

          <div className="about-portrait">
            <div className="portrait-scene">
              <div className="portrait-orbit portrait-orbit-one" />
              <div className="portrait-orbit portrait-orbit-two" />
              <div className="portrait-orbit portrait-orbit-three" />
              <div className="portrait-glow" />

              <div className="about-portrait-ring">
                <img
                  src="/images/profile%20pic.jpeg"
                  alt="Zohaib Waqar"
                  className="about-portrait-image"
                  loading="lazy"
                />
              </div>

              <div className="portrait-badge">
                <span className="portrait-badge-dot" />
                Open to Opportunities
              </div>
            </div>

            <h3 className="portrait-name">M. Zohaib Waqar</h3>
            <p className="portrait-role">MERN Stack Developer</p>
          </div>
        </section>

        <section className="section-container section-block" id="skills">
          <p className="eyebrow">02 / TECH STACK</p>
          <h2>Tools I work with.</h2>

          <p className="section-description">
            Technologies and tools I use for frontend, backend, databases,
            and web development.
          </p>

          <div className="skills-grid">
            {skills.map((skill) => {
              const SkillIcon = skill.icon

              return (
                <div className="skill-card" key={skill.name}>
                  <span
                    className="skill-icon"
                    style={{ '--skill-color': skill.color }}
                    aria-hidden="true"
                  >
                    <SkillIcon />
                  </span>

                  <span className="skill-name">{skill.name}</span>
                </div>
              )
            })}
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
                <p className="project-category">
                  {item.role === 'MERN Stack Developer Trainee'
                    ? 'Professional Training'
                    : 'Experience'}
                </p>

                <h3>{item.role}</h3>
                <p>{item.organization}</p>

                {item.period && <p>{item.period}</p>}

                {item.status && (
                  <p className="project-status">{item.status}</p>
                )}

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
                <div className={`project-cover ${project.cover}`}>
                  <div className="project-cover-top">
                    <span>ZW.</span>
                    <span>PROJECT PREVIEW</span>
                  </div>

                  <div className="project-cover-content">
                    <span className="project-cover-icon" aria-hidden="true">
                      {project.coverIcon}
                    </span>

                    <p>{project.coverLabel}</p>
                    <h3>{project.title}</h3>
                  </div>

                  <span className="project-cover-bottom">
                    REACT · NODE · BUILD
                  </span>
                </div>

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

      <a
        className="whatsapp-float"
        href="https://wa.me/923167918426"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .21 5.34.21 11.9c0 2.1.55 4.15 1.6 5.96L.1 24l6.3-1.65a11.9 11.9 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.49-8.42ZM12.1 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.87 9.87 0 0 1 2.91 7.01c0 5.47-4.45 9.9-9.94 9.9Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
        </svg>
      </a>
    </div>
  )
}

export default App
