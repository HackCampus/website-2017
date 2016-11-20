const addThrottledEventListener = require('./addThrottledEventListener')
const ConwayTransition = require('./ConwayTransition')
const Letters = require('./letters')

function $ (selector) {
  return [].slice.call(document.querySelectorAll(selector))
}

function main () {
  const transitions = $('.transition')
  transitions.map(transition => {
    const {hColor, cColor, backgroundColor} = transition.dataset
    return new ConwayTransition(transition, hColor, cColor, backgroundColor)
  })
}
document.addEventListener('DOMContentLoaded', main)
