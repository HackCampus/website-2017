const addThrottledEventListener = require('./addThrottledEventListener')
const Conway = require('./conway')
const Letters = require('./letters')

function hero () {
  const header = document.querySelector('header')
  const container = document.createElement('div')
  container.className = 'conway'
  header.appendChild(container)
  const conway = new Conway(container)
  conway.start()
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
  hero()
  navbar()
}
document.addEventListener('DOMContentLoaded', main)
