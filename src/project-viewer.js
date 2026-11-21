document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
    return
  }

  const target = event.target
  if (!(target instanceof Element)) return

  const sizeToggle = target.closest('.project-viewer-size')
  if (sizeToggle) {
    const isOriginalSize = sizeToggle.getAttribute('aria-pressed') === 'true'
    sizeToggle.setAttribute('aria-pressed', String(!isOriginalSize))
    return
  }

  const link = target.closest('.project-image')
  if (!link) return

  const viewer = document.querySelector('.project-viewer')
  if (!viewer?.showModal || viewer.open) return

  const thumbnail = link.querySelector('img')
  const image = new Image(
    Number(thumbnail.getAttribute('width')),
    Number(thumbnail.getAttribute('height')),
  )
  image.alt = thumbnail.alt
  image.src = link.href

  const frame = viewer.querySelector('.project-viewer-image')
  frame.replaceChildren(image)
  viewer.querySelector('.project-viewer-size').setAttribute('aria-pressed', 'false')
  viewer.showModal()
  frame.scrollTop = 0
  event.preventDefault()

  viewer.addEventListener('close', () => {
    if (!viewer.open) {
      frame.replaceChildren()
      link.focus({ preventScroll: true })
    }
  }, { once: true })
})
