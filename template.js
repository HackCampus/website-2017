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
    <div class="panel black"></div>
    <div class="panel orange">foo bar</div>
    <div class="panel white">foo</div>
    ${/*<div class="navbar">
      <div class="letters"></div>
    </div>
    <main>
      <section>
        ${content('startups.md')}
      </section>
      <section>
        <div style="position:relative;padding-bottom:56.25%;"><iframe src="" frameborder="0" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe></div>
      </section>
      <section>
        ${content('companies.md')}
      </section>
    </main>*/ ''}
    <script src="/hc.js"></script>
    ${/*<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>*/''}
    <script>
      // WebFont.load({
      //   google: {
      //     families: ['Roboto:300,700', 'Roboto Mono:300,400,700']
      //   }
      // });
    </script>
  </body>
</html>`
