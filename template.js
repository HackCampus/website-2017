const content = require('./content')

const textSection = (name, title, color) =>
`<div class="panel ${color} ${name}" data-title="${title}">
  <div class="content">
    ${content(`${name}.md`)}
  </div>
</div>
`

const vimeoPlayer = (name, videoId) =>
`<div class="panel black vimeo ${name}" data-title="">
  <iframe src="https://player.vimeo.com/video/${videoId}?badge=0&byline=0&color=ff9600&portrait=0&title=0" frameborder="0" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>
</div>`

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
    ${textSection('hero', 'HACKCAMPUS', 'orange')}
    ${vimeoPlayer('mainVideo', '192979531')}
    ${textSection('about', 'ABOUT US', 'orange')}
    ${textSection('companies', 'COMPANIES', 'white')}
    ${textSection('process', 'THE PROCESS', 'orange')}
    ${textSection('nextSteps', 'NEXT STEPS', 'black')}
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
