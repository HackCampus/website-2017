const fs = require('fs')
const path = require('path')
const markdown = require('markdown-it')({
  html: true
})

module.exports = function (...paths) {
  const filePath = path.join(__dirname, ...paths)
  const content = fs.readFileSync(filePath, 'utf8')
  return markdown.render(content)
}
