const fs = require('fs')
const path = require('path')

const renderMarkdown = require('./renderMarkdown')

module.exports = function (...paths) {
  const filePath = path.join(__dirname, ...paths)
  const content = fs.readFileSync(filePath, 'utf8')
  return renderMarkdown(content)
}
