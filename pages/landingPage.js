const fonts = require('./fonts')
const googleAnalytics = require('./googleAnalytics')
const metaTags = require('./metaTags')

module.exports = content =>
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    ${metaTags}
    <title>HackCampus</title>
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    <div class="titles"></div>
    ${content}
    <script src="/hc.js"></script>
    ${fonts}
    ${googleAnalytics}
  </body>
</html>`
