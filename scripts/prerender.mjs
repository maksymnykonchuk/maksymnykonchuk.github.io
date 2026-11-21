import { readFile, writeFile } from 'node:fs/promises'
import { render } from '../.prerender/render.js'
import { languages } from '../src/content.js'

await Promise.all(Object.entries(languages).map(async ([locale, { path }]) => {
  const file = new URL(`../dist${path}index.html`, import.meta.url)
  const html = await readFile(file, 'utf8')
  const root = '<div id="root"></div>'

  if (!html.includes(root)) {
    throw new Error(`Could not find the React root in ${path}index.html`)
  }

  await writeFile(file, html.replace(root, () => `<div id="root">${render(locale)}</div>`))
}))
