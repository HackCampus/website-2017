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
      <div class="content">
        <h1>HackCampus helps the brightest students find software engineering internships at London's leading technology startups</h1>
        <a class="button" href="https://hackers.hackcampus.io/" target="_blank">Apply now</a>
        <a class="button" href="#">Watch the video</a>
      </div>
    </header>
    <div class="navbar">
      <div class="letters"></div>
    </div>
    <main>
      <section>
        ${content('startups.md')}
      </section>
      <section>
        <div style="position:relative;padding-bottom:56.25%;"><iframe src="https://player.vimeo.com/video/191644164" frameborder="0" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe></div>
      </section>
      <section>
        ${content('companies.md')}
      </section>
    </main>
    <script src="/hc.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
      // WebFont.load({
      //   google: {
      //     families: ['Roboto:300,700', 'Roboto Mono:300,400,700']
      //   }
      // });
    </script>
  </body>
</html>`
