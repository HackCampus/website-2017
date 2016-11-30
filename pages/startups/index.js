const md = require('../markdown')
const companies = require('../shared/companies')
const heroVideo = require('../shared/heroVideo')
const textSection = require('../textSection')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', md('startups/hero.md'))}
${heroVideo}
${textSection('testimonials', 'TESTIMONIALS', 'orange', md('startups/testimonials.md'))}
${companies}
${textSection('pitch', 'WHY HACKCAMPUS', 'orange', md('startups/pitch.md'))}
${textSection('nextSteps', 'NEXT STEPS', 'black', md('startups/nextSteps.md'))}`
