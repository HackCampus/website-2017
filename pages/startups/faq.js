const renderMarkdown = require('../renderMarkdown')
const facts = require('../facts')

const faq =
`## When is the internship?

The ${facts.year} internship runs for 10 weeks, from ${facts.workStartDate} to ${facts.workEndDate}. Some interns choose to take the internship at different dates, eg. due to conflicting exam schedules, but we will treat this on a case-by-case basis.

## What makes a company eligible to host an intern?

We want to give interns the experience of working for a tech startup in London. Realistically, that means your company should be headquartered in London (or at least have an office with engineers in London) and have at least one dedicated tech team with full-time engineers developing your company's core product.
You don't need to have hosted interns before - in fact, the majority of the companies we have worked with had previously never hosted an intern.

## How does the hiring process work?

We send every company wanting to take part in the programme a short questionnaire about their technical stack, as well as the particular qualities they are looking for in an intern.

Students wishing to apply to the HackCampus programme have until the beginning of January to submit their application form. The application form features questions about past projects, as well as questions about technical implementation and code style. We also ask students to self-assess their skills with various languages/libraries/tools.

We review every application, and match students to roles based on their experience & preferred technologies.

We aim to send companies at most 3-4 student profiles per role, and try to ensure that all hiring criteria have been met.

Companies are expected to perform their own technical & personal assessment.

## How are HackCampus interns selected?

The HackCampus teams vets interns with an application questionnaire featuring technical and personal questions. This ranges from high-level technical design down to a code review. We ask students to submit examples of personal projects that they have worked on, and review the source code of their projects.

Additionally, students are asked to assign themselves a score on a wide range of programming languages, libraries, databases & tools, collected from the tech stacks of the companies we work with. This allows us to closely match every intern's skillset with the requirements of your role.

Once an intern has passed the first stage of the application, we ask them to choose the top companies they would most like to work for.

Based on these criteria, we aim to send your company the profiles of at most 3-4 candidates per role.

If you have specific requirements for interns, please let us know at contact@hackcampus.io, and we will try our best to accommodate them.

## What do companies need to provide interns?

During the internship, we expect your company to provide:

- a meaningful project: this could either be a dedicated project, or be a task related to your existing product or infrastructure. We recommend to companies to give the interns small starter tasks to familiarise them with the codebase and development process, and then working out a feasible project in the following weeks.
- a direct line manager / mentor: this person should be an engineer on your team, who will act as the intern's tech lead, as well as providing assistance with any technical or personal issues the intern may have.
- a place to work: ideally this will be a desk within your tech team's seating area. Experiencing first-hand how real developers work day to day is probably the most useful experience that an intern will get from this programme.
- a salary: we expect every intern to be paid the same salary.

## What is the cost?

We expect companies to pay every intern £400/week. This salary should be paid directly to the intern.
Additionally, HackCampus will charge £2500 per intern, which covers the intern's accommodation for the summer.

## Can companies hire more than one intern?

Of course! If the size of your team allows for it, we recommend taking on 2 or more interns. Companies who have taken on 2 interns have found that this actually reduced their technical management effort considerably, since the interns were able to help each other with technical issues, eg. by pair-programming.

## What does HackCampus provide interns?

HackCampus provides every intern with a single room in student accommodation in central London. We have chosen the accommodation to be within easy travelling distance to the participating companies' offices, as well as providing a shared social space for the interns to get to know each other and make lasting valuable connections.

We will organise to show the interns around the London startup scene throughout the internship. For example, we have organised Q&A sessions with partners at Index Ventures and office visits to participating companies. We also encourage the students to go to tech meetups, to really get a feel for the London startup scene.

## I have further questions. How can I reach you?

You can always email us at contact@hackcampus.io.

## Where do I sign up?

[Apply here](${facts.companyApplicationUrl}) to take on interns in the programme.
`

module.exports = renderMarkdown(faq)
