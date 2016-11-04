const pixels = require('./pixels')

function randomItem (array) {
  return array[Math.round(Math.random() * (array.length - 1))]
}

class Letters {
  constructor (container, text = 'HACKCAMPUS', fps = 10) {
    this.text = text
    this.fps = fps

    this.state = this.getState()

    const canvas = document.createElement('canvas')
    this.c = canvas.getContext('2d')
    container.appendChild(canvas)

    this.scale = window.devicePixelRatio || 1
    const setSize = () => {
      const width = container.clientWidth
      const height = width / this.text.length // square letters
      this.width = width
      this.height = height
      canvas.width = width * this.scale
      canvas.height = height * this.scale
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      window.requestAnimationFrame(() => { this.draw() })
    }
    setSize()
    window.addEventListener('resize', setSize)
  }

  start () {
    this.started = true
    const render = () => {
      if (!this.started) return
      this.state = this.getState()
      this.draw()
      window.setTimeout(() => {
        // this.fps /= 1.1
        window.requestAnimationFrame(render)
      }, 1000 / this.fps)
    }
    window.requestAnimationFrame(render)
  }

  stop () {
    this.started = false
  }

  getState () {
    return [].map.call(this.text, letter => randomItem(pixels[letter]))
  }

  draw () {
    const letterSize = 8 // letter pixels
    const pixelSize = Math.floor(this.height * this.scale / letterSize) // screen pixels

    this.c.clearRect(0, 0, this.width * this.scale, this.height * this.scale)

    this.c.fillStyle = 'white'
    const drawPixel = (x, y) => {
      this.c.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }

    let offset = 0
    for (let letter of this.state) {
      let i = 0
      for (let pixel of letter) {
        if (pixel === '1') {
          const x = i % letterSize
          const y = Math.floor(i / letterSize)
          drawPixel(offset + x, y)
        }
        i++
      }
      offset += letterSize
    }
  }
}

module.exports = Letters
