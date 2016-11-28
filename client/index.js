const addThrottledEventListener = require('./addThrottledEventListener')
const getScrollTop = require('./getScrollTop')
const titles = require('./titles')
const transitions = require('./transitions')

function $ (selector) {
  return [].slice.call(document.querySelectorAll(selector))
}

function heroVideo () {
  const container = document.querySelector('.videoContainer')
  const videoId = container.dataset.videoId
  const video = document.createElement('div')
  video.id = 'heroVideo'
  container.appendChild(video)

  const youtubeScript = document.createElement('script')
  youtubeScript.src = 'https://www.youtube.com/iframe_api'
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(youtubeScript, firstScript)

  window.onYouTubeIframeAPIReady = function () {
    new YT.Player('heroVideo', {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        controls: 1,
        modestbranding: 1,
        showinfo: 0,
      },
      events: {
        onReady: function (event) {
          playWhenVisible(event.target)
        }
      }
    })
  }

  function playWhenVisible (player) {
    const video = player.getIframe()
    const topMargin = 70 // FIXME
    addThrottledEventListener('scroll', e => {
      const {top, bottom} = video.getBoundingClientRect()
      const visible = top <= topMargin && bottom > 0
      if (visible) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    })
  }
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
  heroVideo()
  videos()
}
document.addEventListener('DOMContentLoaded', main)
