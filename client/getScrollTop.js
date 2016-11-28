module.exports = function getScrollTop () {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}
