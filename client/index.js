const Letters = require('./letters')

function addThrottledEventListener (eventName, listener, target = window) {
  var inProgress = false
  target.addEventListener(eventName, event => {
    if (inProgress) return
    inProgress = true
    window.requestAnimationFrame(() => {
      listener(event)
      inProgress = false
    })
  })
}

function navbar () {
  const navbar = document.querySelector('.navbar')

  const spacer = document.createElement('div')
  navbar.parentElement.insertBefore(spacer, navbar)

  const lettersContainer = document.querySelector('.letters')
  const letters = new Letters(lettersContainer)
  letters.start()

  addThrottledEventListener('scroll', function (e) {
    if (window.scrollY < window.innerHeight - navbar.clientHeight) {
      navbar.classList.remove('sticky')
      spacer.classList.remove('spacer')
    } else {
      navbar.classList.add('sticky')
      spacer.classList.add('spacer')
    }
  })
}

function main () {
  navbar()

}
document.addEventListener('DOMContentLoaded', main)
