const textSection = (name, title, color, content) =>
`<div class="panel ${color} ${name}" data-title="${title}">
  <div class="content">
    ${content}
  </div>
</div>
`

const heroVideo = (name, videoId) =>
`<div class="panel black ${name}" data-title="">
  <div class="videoContainer" data-video-id=${videoId}>
  </div>
</div>`

module.exports = {
  heroVideo,
  textSection,
}
