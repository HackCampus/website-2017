const constants = require('./constants')
const ConwayTransition = require('./ConwayTransition')

module.exports = function (panels) {
  for (let i = 0; i < panels.length - 1; i++) {
    const current = panels[i]
    const next = panels[i + 1]
    const backgroundColor = getColor(current)
    const hColor = getColor(next)
    const cColor = getComplement(backgroundColor, hColor)
    const transition = document.createElement('div')
    next.parentElement.insertBefore(transition, next)
    new ConwayTransition(transition, hColor, cColor, backgroundColor)
  }

  function getColor (element) {
    if (element.classList.contains('black')) return constants.black
    if (element.classList.contains('white')) return constants.white
    if (element.classList.contains('orange')) return constants.orange
  }

  function getComplement (colorOne, colorTwo) {
    const colors = [constants.black, constants.white, constants.orange]
    for (let color of colors) {
      if (color !== colorOne && color !== colorTwo) return color
    }
  }
}
