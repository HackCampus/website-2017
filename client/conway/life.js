function life (board) {
  const alives = {}
  let minX = 0
  let minY = 0
  let maxX = 0
  let maxY = 0
  board.forEach(([x, y]) => {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
    alives[y] = alives[y] || {}
    alives[y][x] = true
  })
  const next = []
  for (let y = minY - 1; y <= maxY + 1; y++) {
    const top = alives[y - 1] || {}
    const middle = alives[y] || {}
    const bottom = alives[y + 1] || {}
    let left
      = ~~top[minX - 2]
      + ~~middle[minX - 2]
      + ~~bottom[minX - 2]
    let current
      = ~~top[minX - 1]
      + ~~middle[minX - 1]
      + ~~bottom[minX - 1]
    for (let x = minX - 1; x <= maxX + 1; x++) {
      const right
        = ~~top[x + 1]
        + ~~middle[x + 1]
        + ~~bottom[x + 1]
      const alive = middle[x]
      const liveCount = left + current + right - ~~alive
      if (liveCount === 3 || alive && liveCount === 2) {
        next.push([x, y])
      }
      left = current
      current = right
    }
  }
  return next
}

module.exports = life

const initial = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
const expected = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]]
const actual = life(initial)
console.log('expected', expected)
console.log('actual', actual)
console.log(JSON.stringify(expected) === JSON.stringify(actual))
