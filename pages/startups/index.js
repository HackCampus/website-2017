const {heroVideo, textSection} = require('../../partials')
const content = require('../content')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', content('startups/hero.md'))}
${heroVideo('heroVideo', 'M1Lc8rrRSoI')}
${textSection('testimonials', 'TESTIMONIALS', 'orange', content('startups/testimonials.md'))}
${textSection('companies', 'COMPANIES', 'white', content('startups/companies.md'))}
${textSection('process', 'THE PROCESS', 'orange', content('startups/process.md'))}
${textSection('nextSteps', 'NEXT STEPS', 'black', content('startups/nextSteps.md'))}`
