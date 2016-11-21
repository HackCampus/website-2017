const addThrottledEventListener = require('../addThrottledEventListener')
const letterPixels = require('./pixels')

function randomItem (array) {
  return array[Math.round(Math.random() * (array.length - 1))]
}

function getScrollTop () {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}

function closestIndex (haystack, needle) {
  let closest = 0
  for (let i = 0; i < haystack.length; i++) {
    if (needle >= haystack[i]) closest = i
  }
  return closest
}

function max (xs) {
  let max = -Infinity
  for (let i = 0; i < xs.length; i++) {
    if (max < xs[i]) max = xs[i]
  }
  return max
}

function unlerp (min, max, value) {
  return (value - min) / (max - min)
}

class Letters {
  constructor (container, titles) {
    this.titles = titles

    this.maxLength = max(this.titles.map(title => title.text.length))

    this.offsets = this.getSectionOffsets()

    const canvas = document.createElement('canvas')
    this.c = canvas.getContext('2d')
    container.appendChild(canvas)

    const onScroll = () => {
      this.updateState(getScrollTop())
      this.draw()
    }
    onScroll()
    addThrottledEventListener('scroll', onScroll)

    this.scale = window.devicePixelRatio || 1
    const onResize = () => {
      const height = container.clientHeight
      const width = height * this.maxLength
      this.width = width
      this.height = height
      container.width = width
      canvas.width = width * this.scale
      canvas.height = height * this.scale
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      this.offsets = this.getSectionOffsets()
      window.requestAnimationFrame(() => { this.draw() })
    }
    onResize()
    addThrottledEventListener('resize', onResize)
  }

  updateState (scrollTop) {
    const i = closestIndex(this.offsets, scrollTop)
    const isLastTitle = i >= this.titles.length - 1
    const currentTitle = this.titles[i]
    const nextTitle = isLastTitle ? null : this.titles[i + 1]
    const ratio = isLastTitle ? 0 : unlerp(this.offsets[i], this.offsets[i + 1], scrollTop)

    const getTitleState = title => {
      if (title == null) return
      const {text, color} = title
      let pixels = []
      for (let i = 0; i < this.maxLength; i++) {
        const letter = text[i] || ' '
        const pixelChoices = letterPixels[letter] || letterPixels[' ']
        const choice = randomItem(pixelChoices)
        pixels.push(choice)
      }
      return {
        pixels,
        color,
      }
    }

    const newState = () => ({
      i,
      ratio,
      current: getTitleState(currentTitle),
      next: getTitleState(nextTitle),
    })

    if (!this.state) {
      this.state = newState()
      return
    }

    const old = this.state

    const same = old.i === i
    if (same) {
      this.state.ratio = ratio
      return
    }

    const oneDown = old.i === i - 1
    if (oneDown) {
      this.state = {
        i,
        ratio,
        current: old.next,
        next: getTitleState(nextTitle),
      }
      return
    }

    const severalDown = old.i < i
    if (severalDown) {
      this.state = newState()
      return
    }

    const oneUp = old.i === i + 1
    if (oneUp) {
      this.state = {
        i,
        ratio,
        current: getTitleState(currentTitle),
        next: old.current,
      }
      return
    }

    const severalUp = old.i > i
    if (severalUp) {
      this.state = newState()
      return
    }
  }

  getSectionOffsets () {
    return this.titles.map(x => x.element.offsetTop)
  }

  draw () {
    const letterSize = 8 // letter pixels
    const pixelSize = Math.floor(this.height * this.scale / letterSize) // screen pixels

    this.c.clearRect(0, 0, this.width * this.scale, this.height * this.scale)

    const drawPixel = (x, y, color) => {
      this.c.fillStyle = color
      this.c.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }

    const {i, ratio, current, next} = this.state
    const {color: currentColor, pixels: currentPixels} = current

    const nextProbability = Math.pow(ratio, 6)

    if (ratio === 0) {
      let color = currentColor
      let pixels = currentPixels
      let offset = 0
      for (let letter of pixels) {
        let p = 0
        for (let pixel of letter) {
          if (pixel === '1') {
            const x = p % letterSize
            const y = ~~(p / letterSize)
            drawPixel(offset + x, y, color)
          }
          p++
        }
        offset += letterSize
      }
    } else {
      const {color: nextColor, pixels: nextPixels} = next
      for (let i = 0; i < this.maxLength; i++) {
        const currentLetter = currentPixels[i]
        const nextLetter = nextPixels[i]
        for (let p = 0; p < currentLetter.length; p++) {
          const displayNext = Math.random() < nextProbability
          const color = displayNext ? nextColor : currentColor
          const pixel = displayNext ? nextLetter[p] : currentLetter[p]
          if (pixel === '1') {
            const x = p % letterSize
            const y = ~~(p / letterSize)
            const offset = i * letterSize
            drawPixel(offset + x, y, color)
          }
        }
      }
    }
  }
}

module.exports = Letters
