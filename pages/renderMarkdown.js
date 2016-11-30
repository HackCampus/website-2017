const markdown = require('markdown-it')({
  html: true
})

module.exports = content =>
  markdown.render(content)
