module.exports = (name, title, color, content) =>
`<div class="panel ${color} ${name}" data-title="${title}">
  <div class="content">
    ${content}
  </div>
</div>
`
