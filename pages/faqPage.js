const fonts = require('./fonts')
const googleAnalytics = require('./googleAnalytics')
const metaTags = require('./metaTags')

module.exports = (content, pagePath) =>
`<!DOCTYPE html>
<html>
  <head>
    ${metaTags({url: `https://hackcampus.github.io/${pagePath}`, title: 'HackCampus - FAQ'})}
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
