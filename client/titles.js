const constants = require('./constants')
const Letters = require('./Letters')

module.exports = function (panels) {
  const container = document.querySelector('.titles')
  const titles = panels.map(panel => ({
    element: panel,
    text: panel.dataset.title,
    color: getTitleColor(panel)
  }))
  const letters = new Letters(container, titles)

  function getTitleColor (element) {
    if (element.classList.contains('black')) return constants.white
    if (element.classList.contains('white')) return constants.orange
    if (element.classList.contains('orange')) return constants.black
  }
}
