const textSection = require('../textSection')

const companies = [
  'creditbenchmark',
  'deliveroo',
  'edited',
  'justpark',
  'myoptique',
  'onefinestay',
  'secretescapes',
  'swiftkey',
  'viagogo',
]

const content = `<div class="companies">${companies.map(company => `<div class="company"><img src="/images/${company}.jpg" /></div>`).join('')}</div>`

module.exports = textSection('companies', 'COMPANIES', 'white', content)
