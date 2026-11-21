import { copy, languages, site } from './content'
import { contacts } from './data/contacts'
import { projects } from './data/projects'

function Header({ locale, text }) {
  const sections = [
    ['work', text.workNav],
    ['services', text.services],
    ['about', text.about],
    ['contact', text.contact],
  ]

  return (
    <header id="top" className="site-header">
      <div className="shell header-inner grid items-center">
        <a className="brand inline-flex items-center" href="#top">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>{text.name.join(' ')}</span>
        </a>
        <nav className="site-nav" aria-label={text.navigation}>
          <ul className="flex flex-wrap items-center">
            {sections.map(([id, name]) => <li key={id}><a href={`#${id}`}>{name}</a></li>)}
          </ul>
        </nav>
        <nav className="language" aria-label={text.language}>
          <ul className="flex items-center">
            {Object.entries(languages).map(([key, language]) => (
              <li key={key}>
                <a
                  href={language.path}
                  lang={key}
                  hrefLang={key}
                  aria-label={language.name}
                  aria-current={locale === key ? 'page' : undefined}
                >
                  {language.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero({ locale, text, contactHref }) {
  const { portrait } = site

  return (
    <section className="shell hero" aria-labelledby="hero-heading">
      <div className="hero-layout grid items-center">
        <div className="hero-copy">
          <p className="hero-role mono"><span aria-hidden="true" />{text.role}</p>
          <h1 id="hero-heading">
            <span>{text.name[0]}</span>{' '}
            <span>{text.name[1]}</span>
          </h1>
          <p className="hero-description">{text.introduction}</p>
          <div className="hero-actions flex flex-wrap">
            <a className="button button-primary" href="#work">{text.workAction}</a>
            <a className="button button-secondary" href={contactHref}>{text.contactAction}</a>
          </div>
        </div>
        {portrait ? (
          <img
            className="hero-portrait"
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt[locale]}
            style={{ objectPosition: portrait.position }}
            fetchPriority="high"
          />
        ) : (
          <div className="hero-monogram" aria-hidden="true">M<span>N</span></div>
        )}
      </div>
    </section>
  )
}

function ProjectImage({ image, locale, text }) {
  const widePreview = image.preview === 'wide-top'

  return (
    <a
      className={widePreview ? 'project-image project-image-wide' : 'project-image'}
      href={image.src}
      aria-haspopup="dialog"
      aria-label={`${text.enlargeScreenshot} — ${image.alt[locale]}`}
    >
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt[locale]}
        loading="lazy"
        decoding="async"
      />
    </a>
  )
}

function Project({ project, locale, text }) {
  const { id, inDevelopment, link, screenshots, technologies } = project
  const { type, description, role, availability, tasks } = project.content[locale]
  const cover = screenshots[0]
  const gallery = screenshots.slice(1, 5)
  const name = project.name[locale]
  const headingId = `project-${id}`
  const summaryId = `${headingId}-summary`

  return (
    <article className={`project${project.featured ? ' project-featured' : ''}`} aria-labelledby={headingId}>
      <div className="project-overview grid">
        <div>
          <p className="project-type mono">
            {type}
            {inDevelopment && (
              <span className="project-status"><span aria-hidden="true"> · </span>{text.inDevelopment}</span>
            )}
          </p>
          <h3 id={headingId}>{name}</h3>
          <p className="project-description">{description}{availability && ` ${availability}`}</p>
        </div>
        <dl className="project-meta">
          <div>
            <dt className="mono">{text.projectRole}</dt>
            <dd>{role}</dd>
          </div>
          {technologies.length > 0 && (
            <div>
              <dt className="mono">{text.technologies}</dt>
              <dd>{technologies.join(' · ')}</dd>
            </div>
          )}
        </dl>
      </div>
      {cover && <div className="project-cover"><ProjectImage image={cover} locale={locale} text={text} /></div>}
      <details className="project-details">
        <summary aria-labelledby={`${summaryId} ${headingId}`}>
          <span id={summaryId}>{text.projectDetails}</span>
        </summary>
        <div className="project-details-body">
          <h4>{text.projectTasks}</h4>
          <ul className="project-tasks">
            {tasks.map((task) => <li key={task}>{task}</li>)}
          </ul>
          {gallery.length > 0 && (
            <>
              <h4>{text.screenshots}</h4>
              <ul className="project-gallery grid" role="list">
                {gallery.map((image) => (
                  <li key={image.src}><ProjectImage image={image} locale={locale} text={text} /></li>
                ))}
              </ul>
            </>
          )}
          {link && <a className="text-link" href={link.href}>{link.label[locale]}</a>}
        </div>
      </details>
    </article>
  )
}

function Work({ locale, text }) {
  return (
    <section id="work" className="shell section" aria-labelledby="work-heading">
      <h2 id="work-heading" className="section-heading">{text.work}</h2>
      <div className="project-grid grid">
        {projects.map((project) => <Project key={project.id} project={project} locale={locale} text={text} />)}
      </div>
      {projects.some(({ screenshots }) => screenshots.length > 0) && (
        <dialog className="project-viewer" aria-label={text.screenshotViewer}>
          <form method="dialog" className="project-viewer-toolbar">
            <button type="button" className="project-viewer-size" aria-pressed="false">{text.originalScreenshotSize}</button>
            <button type="submit" autoFocus>{text.closeScreenshot}</button>
          </form>
          <div className="project-viewer-image" role="region" aria-label={text.screenshots} tabIndex={0} />
        </dialog>
      )}
    </section>
  )
}

function Services({ text }) {
  return (
    <section id="services" className="shell section editorial-grid grid" aria-labelledby="services-heading">
      <h2 id="services-heading" className="section-heading">{text.services}</h2>
      <dl className="service-list">
        {text.serviceItems.map(([title, description]) => (
          <div className="service-row grid" key={title}>
            <dt>{title}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function About({ text }) {
  return (
    <section id="about" className="shell section editorial-grid grid" aria-labelledby="about-heading">
      <h2 id="about-heading" className="section-heading">{text.about}</h2>
      <div>
        <p className="bio">{text.bio}</p>
        <p className="bio-details">{text.bioDetails}</p>
      </div>
    </section>
  )
}

function Contact({ text, links }) {
  const hasLinks = links.length > 0

  return (
    <section id="contact" className="shell contact-section" aria-labelledby="contact-heading">
      <div className="contact-panel grid">
        <div>
          <h2 id="contact-heading" className="section-heading">{hasLinks ? text.contactHeading : text.contact}</h2>
          {hasLinks && <p>{text.contactText}</p>}
        </div>
        {hasLinks ? (
          <dl>
            {links.map(({ id, label, value, href }) => (
              <div className="contact-row grid items-baseline" key={id}>
                <dt>{label}</dt>
                <dd><a href={href}>{value}</a></dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="contact-intro">{text.contactText}</p>
        )}
      </div>
    </section>
  )
}

export function App({ locale }) {
  const text = copy[locale]
  const links = contacts.filter(({ value, href }) => value && href)
  const telegram = links.find(({ id }) => id === 'telegram')

  return (
    <>
      <a className="skip-link" href="#main">{text.skip}</a>
      <Header locale={locale} text={text} />
      <main id="main" tabIndex={-1}>
        <Hero locale={locale} text={text} contactHref={telegram?.href ?? '#contact'} />
        <Work locale={locale} text={text} />
        <Services text={text} />
        <About text={text} />
        <Contact text={text} links={links} />
      </main>
      <footer className="shell site-footer flex flex-wrap items-center justify-between">
        <p>{text.name.join(' ')}</p>
        <a href="#top">{text.home}</a>
      </footer>
    </>
  )
}
