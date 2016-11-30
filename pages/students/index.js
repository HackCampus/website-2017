const md = require('../markdown')
const companies = require('../shared/companies')
const heroVideo = require('../shared/heroVideo')
const textSection = require('../textSection')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', md('students/hero.md'))}
${heroVideo}
${textSection('testimonials', 'TESTIMONIALS', 'orange', md('students/testimonials.md'))}
${companies}
${textSection('pitch', 'WHY HACKCAMPUS', 'orange', md('students/pitch.md'))}
${textSection('nextSteps', 'NEXT STEPS', 'black', md('students/nextSteps.md'))}`
