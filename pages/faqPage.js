module.exports = content =>
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HackCampus</title>
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  <body>
    <div class="faq white">
      <div class="content">
        ${content}
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>WebFont.load({google:{families:['Roboto:300,700','Roboto Mono:300,400,700']}});</script>
  </body>
</html>`
