const fonts = require('./fonts')
const googleAnalytics = require('./googleAnalytics')
const metaTags = require('./metaTags')

module.exports = content =>
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    ${metaTags}
    <title>HackCampus - FAQ</title>
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    <div class="faq white">
      <div class="content">
        ${content}
      </div>
    </div>
    ${fonts}
    ${googleAnalytics}
  </body>
</html>`
