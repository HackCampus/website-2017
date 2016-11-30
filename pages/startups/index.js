const {heroVideo, textSection} = require('../../partials')
const content = require('../content')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', content('startups/hero.md'))}
${heroVideo('heroVideo', '0f0RXeZUM4k')}
${textSection('testimonials', 'TESTIMONIALS', 'orange', content('startups/testimonials.md'))}
${textSection('companies', 'COMPANIES', 'white', content('startups/companies.md'))}
${textSection('pitch', 'WHY HACKCAMPUS', 'orange', content('startups/pitch.md'))}
${textSection('nextSteps', 'NEXT STEPS', 'black', content('startups/nextSteps.md'))}`
