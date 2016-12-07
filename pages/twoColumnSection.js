module.exports = (name, title, color, leftContent, rightContent) =>
`<div class="panel ${color} ${name}" data-title="${title}">
  <div class="content">
    <div class="twoColumn">
      ${leftContent}
    </div>
    <div class="twoColumn">
      ${rightContent}
    </div>
  </div>
</div>
`
