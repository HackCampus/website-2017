const addThrottledEventListener = require('./addThrottledEventListener')
const titles = require('./titles')
const transitions = require('./transitions')

function $ (selector) {
  return [].slice.call(document.querySelectorAll(selector))
}

function videos () {
  const elements = $('a.video')
  const player = document.createElement('div')
  player.className = 'videoPlayer'
  player.onclick = event => {
    hide(player)
  }
  hide(player)
  document.body.appendChild(player)

  elements.forEach(element => {
    element.onclick = event => {
      event.preventDefault()
      show(player)
      const videoUrl = event.target.attributes.href.value
      const videoId = videoUrl.match(/watch\?v=(.+)/)[1]
      const width = window.innerWidth < 720 ? window.innerWidth : 720
      const height = width * 0.5625
      player.innerHTML = `<iframe width="${width}" height="${height}" src="https://www.youtube-nocookie.com/embed/${videoId}?controls=0&amp;showinfo=0;autoplay=1" frameborder="0" style="margin:auto" allowfullscreen></iframe>`
    }
  })

  function show (player) {
    player.style.visibility = 'visible'
    player.style.opacity = 1
  }

  function hide (player) {
    player.style.visibility = 'hidden'
    player.style.opacity = 0
    player.innerHTML = ''
  }
}

function main () {
  const panels = $('.panel')
  transitions(panels)
  titles(panels)
  videos()
}
document.addEventListener('DOMContentLoaded', main)
