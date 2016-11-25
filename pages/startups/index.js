const {textSection, vimeoPlayer} = require('../../partials')
const content = require('../content')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', content('startups/hero.md'))}
${vimeoPlayer('mainVideo', '192979531')}
${textSection('testimonials', 'TESTIMONIALS', 'orange', content('startups/testimonials.md'))}
${textSection('companies', 'COMPANIES', 'white', content('startups/companies.md'))}
${textSection('process', 'THE PROCESS', 'orange', content('startups/process.md'))}
${textSection('nextSteps', 'NEXT STEPS', 'black', content('startups/nextSteps.md'))}`
