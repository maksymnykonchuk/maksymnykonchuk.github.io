import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { copy, languages, site } from './src/content.js'
import { projects } from './src/data/projects.js'

function localizedMetadata() {
  return {
    name: 'localized-metadata',
    transformIndexHtml(_html, { path }) {
      const locale = path.startsWith('/en/') || path === '/en' ? 'en' : 'uk'
      const otherLocale = locale === 'uk' ? 'en' : 'uk'
      const { metaTitle, metaDescription, name } = copy[locale]
      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
      const link = (attrs) => ({ tag: 'link', attrs, injectTo: 'head' })
      const og = (property, content) => meta({ property: `og:${property}`, content })
      const tags = [
        { tag: 'title', children: metaTitle, injectTo: 'head' },
        meta({ name: 'description', content: metaDescription }),
        link({ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }),
        og('title', metaTitle),
        og('description', metaDescription),
        og('type', 'website'),
        og('site_name', name.join(' ')),
        og('locale', languages[locale].ogLocale),
        og('locale:alternate', languages[otherLocale].ogLocale),
      ]

      if (site.url) {
        const absolute = (path) => new URL(path, site.url).href
        const canonical = absolute(languages[locale].path)
        tags.push(link({ rel: 'canonical', href: canonical }), og('url', canonical))

        for (const [hrefLang, language] of Object.entries(languages)) {
          tags.push(link({ rel: 'alternate', hreflang: hrefLang, href: absolute(language.path) }))
        }
        tags.push(link({ rel: 'alternate', hreflang: 'x-default', href: absolute(languages.uk.path) }))

        const image = site.socialImage?.[locale]
        if (image) {
          tags.push(og('image', absolute(image.src)), og('image:alt', image.alt))
        }
      }

      return tags
    },
  }
}

const devEntry = {
  name: 'dev-entry',
  apply: 'serve',
  transformIndexHtml() {
    return [{ tag: 'script', attrs: { type: 'module', src: '/src/main.jsx' }, injectTo: 'body' }]
  },
}

const projectViewer = {
  name: 'project-viewer',
  transformIndexHtml: {
    order: 'pre',
    handler() {
      if (projects.some(({ screenshots }) => screenshots.length > 0)) {
        return [{ tag: 'script', attrs: { type: 'module', src: '/src/project-viewer.js' }, injectTo: 'body' }]
      }
    },
  },
}

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), localizedMetadata(), devEntry, projectViewer],
  esbuild: { jsx: 'automatic' },
  build: {
    rollupOptions: {
      input: {
        uk: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
      },
    },
  },
})
