const Grid = require('./WrappingGrid')
const step = require('./step')

class ConwayTransition {
  constructor (container, hColor = '#ff9600', cColor = 'white', backgroundColor = 'black', generations = 128) {
    this.container = container
    this.hColor = hColor
    this.cColor = cColor
    this.backgroundColor = backgroundColor
    this.generations = generations
    this.cellSize = 120
    
    this.scale = window.devicePixelRatio || 1
    this.offsetTop = 0
    this.scrollAmount = 0

    this.nextElement = container.nextElementSibling

    this.container.style.height = '100vh'
    this.container.style.backgroundColor = this.backgroundColor

    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.zIndex = '1'
    canvas.style.pointerEvents = 'none' // allow click through
    this.c = canvas.getContext('2d')
    container.appendChild(canvas)

    const getScrollAmount = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      const scrollAmount = (scrollTop - this.offsetTop) / window.innerHeight
      return scrollAmount
    }

    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      this.width = width * this.scale
      this.height = height * this.scale

      canvas.width = this.width
      canvas.height = this.height
      canvas.style.top = 0
      canvas.style.left = 0
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'

      container.style.height = height + 'px'
      this.offsetTop = container.offsetTop

      this.nextElementHeight = this.nextElement.clientHeight

      this.makeGames()

      this.scrollAmount = getScrollAmount()
      window.requestAnimationFrame(() => { this.draw() })
    }
    onResize()
    window.addEventListener('resize', onResize)

    const onScroll = event => {
      this.scrollAmount = getScrollAmount()
      window.requestAnimationFrame(() => { this.draw() })
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
  }

  makeGames () {
    this.gameWidth = Math.ceil(this.width / this.cellSize) + 2
    this.gameHeight = Math.ceil(this.height / this.cellSize) + 2

    const grid = () => new Grid(this.gameWidth, this.gameHeight)

    // center
    const [x, y] = [Math.floor(this.gameWidth / 2) - 2, Math.floor(this.gameHeight / 2) - 3]

    let hGame = grid()
    let cGame = grid()
    let trail = grid()

    hGame.set(x-1, y-1)
         .set(x-1, y  ).set(x  , y  )
         .set(x-1, y+1)              .set(x+1, y+1)

    cGame                            .set(x+1, y  ).set(x+2, y  )
                       .set(x  , y+1)
                                     .set(x+1, y+2).set(x+2, y+2)

    this.hGames = [hGame]
    this.cGames = [cGame]
    this.trails = [trail]

    for (let i = 1; i < this.generations; i++) {
      hGame = step(hGame)
      cGame = step(cGame)
      trail = trail.map((alreadyAlive, x, y) => {
        const born = hGame.get(x, y)
        return alreadyAlive || born
      })
      this.hGames.push(hGame)
      this.cGames.push(cGame)
      this.trails.push(trail)
    }
  }

  draw () {
    this.c.clearRect(0, 0, this.width * this.scale, this.height * this.scale)

    const fixNextElement = () => {
      this.nextElement.style.position = 'fixed'
      this.nextElement.style.top = 0
      this.nextElement.style.left = 0
      this.nextElement.style.width = '100%'
      this.container.style.height = `calc(100vh + ${this.nextElementHeight}px)`
    }

    const resetFixNextElement = () => {
      this.nextElement.style.cssText = ''
      this.container.style.height = '100vh'
      this.container.style.backgroundColor = this.backgroundColor
    }

    const offScreen = this.scrollAmount < -1 || this.scrollAmount >= 1
    if (offScreen) {
      resetFixNextElement()
      this.c.globalAlpha = 0
      return
    }

    let generation = 0, alpha = 0
    if (this.scrollAmount >= -1 && this.scrollAmount < 0) {
      resetFixNextElement()

      alpha = Math.pow(this.scrollAmount + 1, 4)
      generation = 0
    } else if (this.scrollAmount >= 0 && this.scrollAmount < 1) {
      fixNextElement()

      this.c.save()
      this.c.globalAlpha = Math.pow(1 - this.scrollAmount, 4)
      this.c.fillStyle = this.backgroundColor
      this.c.fillRect(0, 0, this.width * this.scale, this.height * this.scale)
      this.c.restore()

      alpha = 1 - Math.pow(this.scrollAmount, 4)
      generation = Math.floor(this.scrollAmount * this.generations)
    }

    this.c.globalAlpha = alpha

    const hGame = this.hGames[generation]
    const cGame = this.cGames[generation]
    const trail = this.trails[generation]
    for (let y = 0; y < this.gameHeight; y++) {
      for (let x = 0; x < this.gameWidth; x++) {
        const c = cGame.get(x, y)
        if (c) {
          this.drawCell(x, y, this.cColor)
          continue
        }
        const h = hGame.get(x, y)
        if (h) {
          this.drawCell(x, y, this.hColor)
          continue
        }
        const alreadyAlive = trail.get(x, y)
        if (!alreadyAlive) {
          this.drawCell(x, y, this.backgroundColor)
          continue
        }
      }
    }
  }

  drawCell (x, y, color) {
    const centerOffsetLeft = -(this.width % this.cellSize) / 2
    const centerOffsetTop = -(this.height % this.cellSize) / 2
    this.c.fillStyle = color
    this.c.fillRect(centerOffsetLeft + x * this.cellSize, centerOffsetTop + y * this.cellSize, this.cellSize, this.cellSize)
  }
}

module.exports = ConwayTransition
