const md = require('../markdownFile')
const companies = require('../shared/companies')
const heroVideo = require('../shared/heroVideo')
const textSection = require('../textSection')
const twoColumnSection = require('../twoColumnSection')

module.exports =
`${textSection('hero', 'HACKCAMPUS', 'orange', md('startups/hero.md'))}
${heroVideo}
${twoColumnSection('studentOrStartup', 'HACKCAMPUS', 'orange', md('home/student.md'), md('home/startup.md'))}`
