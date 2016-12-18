const fonts = require('./fonts')
const googleAnalytics = require('./googleAnalytics')
const metaTags = require('./metaTags')

module.exports = (content, pagePath) =>
`<!DOCTYPE html>
<html>
  <head>
    ${metaTags({url: `https://hackcampus.github.io/${pagePath}`})}
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
