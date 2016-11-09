module.exports = function addThrottledEventListener (eventName, listener, target = window) {
  var inProgress = false
  target.addEventListener(eventName, function (event) {
    if (inProgress) return
    inProgress = true
    window.requestAnimationFrame(function () {
      listener(event)
      inProgress = false
    })
  })
}
