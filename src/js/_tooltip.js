export function createTooltip(element, text) {
  const tooltipElem = document.createElement('div')
  tooltipElem.className = 'tooltip'
  tooltipElem.innerText = text
  document.body.append(tooltipElem)
  const coords = element.getBoundingClientRect()
  let left = coords.left + (element.offsetWidth - tooltipElem.offsetWidth) / 2
  const top = coords.top + element.offsetHeight + 5
  if (left < 0) {
    left = 0
  }
  tooltipElem.style.left = `${left}px`
  tooltipElem.style.top = `${top}px`
  setTimeout(() => tooltipElem.remove(), 3000)
}
