const textSection = (name, title, color, content) =>
`<div class="panel ${color} ${name}" data-title="${title}">
  <div class="content">
    ${content}
  </div>
</div>
`

const vimeoPlayer = (name, videoId) =>
`<div class="panel black vimeo ${name}" data-title="">
  <iframe src="https://player.vimeo.com/video/${videoId}?badge=0&byline=0&color=ff9600&portrait=0&title=0" frameborder="0" style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></iframe>
</div>`

module.exports = {
  textSection,
  vimeoPlayer,
}
