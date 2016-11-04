const content = require('./content')

module.exports = () =>
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HackCampus</title>
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    <header>
    </header>
    <div class="navbar">
      <div class="letters"></div>
    </div>
    <main>
      <section>
        ${content('students.md')}
      </section>
      <section>
        ${content('companies.md')}
      </section>
      <section>
        ${content('startups.md')}
      </section>
    </main>
    <script src="/hc.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
      WebFont.load({
        google: {
          families: ['Roboto:300,700', 'Roboto Mono:300,400,700']
        }
      });
    </script>
  </body>
</html>`
