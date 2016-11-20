module.exports = function step (grid) {
  if (!grid.isGrid) {
    console.error('grid is not a grid g.')
    return
  }
  function neighbors (x, y) {
    return [ grid.get(x - 1, y - 1), grid.get(x  , y - 1), grid.get(x + 1, y - 1)
           , grid.get(x - 1, y    ),                     , grid.get(x + 1, y    )
           , grid.get(x - 1, y + 1), grid.get(x  , y + 1), grid.get(x + 1, y + 1) ]
  }
  return grid.map((alive, x, y) => {
    const lives = neighbors(x, y).filter(living => living).length
    return alive
      ? lives == 2 || lives == 3
      : lives == 3
  })
}
