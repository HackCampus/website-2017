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

const content =
`<div class="partners">
  <div class="support">
    HackCampus is supported by
    <div class="indexLogo"><img src="/images/logos/indexventures.png" /></div>
  </div>
  <div class="companies">
    ${companies.map(company => `<div class="company"><img src="/images/logos/${company}.jpg" /></div>`).join('')}
  </div>
</div>`

module.exports = textSection('companies', 'PARTNERS', 'white', content)
