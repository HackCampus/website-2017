const fs = require('fs')
const {PNG} = require('pngjs')
const pull = require('pull-stream')
const flatmap = require('pull-flatmap')
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function pixels (path, done) {
  fs.createReadStream(path).pipe(new PNG()).on('parsed', function () {
    let letter = ''
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const i = (this.width * y + x) * 4 // 4 channels: r,g,b,a
        const a = this.data[i + 3] // pixels are either transparent or black - channel a
        letter += a == 0 ? '0' : '1'
      }
    }
    done(letter)
  })
}

pull(
  pull.values([].slice.call(letters)),
  flatmap(letter => {
    let a = []
    for (let i = 1; i < 10; i++) {
      a.push([letter, i])
    }
    return a
  }),
  pull.asyncMap(([letter, number], done) => {
    pixels(`${letter}/${number}.png`, binary => {
      done(null, [letter, binary])
    })
  }),
  pull.collect((err, letters) => {
    const obj = {}
    letters.forEach(([letter, binary]) => {
      obj[letter] = obj[letter] || []
      obj[letter].push(binary)
    })
    console.log(obj)
  })
)
