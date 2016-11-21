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
    <div class="titles"></div>
    <div class="panel black" data-title="HACKCAMPUS"></div>
    <div class="panel orange" data-title="ABOUT">foo bar</div>
    <div class="panel black" data-title="TESTIMONIALS">foo</div>
    <div class="panel orange" data-title="FAQ">foo</div>
    <div class="panel white" data-title="ANOTHER ONE">foo</div>
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
