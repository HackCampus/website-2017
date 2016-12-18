module.exports = ({url, title, description, imageUrl, imageType, imageWidth, imageHeight}) =>
`<meta charset="utf-8" />
<meta property="og:url" content="${url || 'https://hackcampus.github.io/'}" />
<meta property="og:title" content="${title || 'HackCampus'}" />
<meta property="og:description" content="${description || 'We help the brightest students find software engineering internships at London\'s best startups. Apply now!'}" />
<meta property="description" content="${description || 'We help the brightest students find software engineering internships at London\'s best startups. Apply now!'}" />
<meta property="og:image" content="${imageUrl || 'https://hackcampus.github.io/images/cover-light.png'}" />
<meta property="og:image:type" content="${imageType || 'image/png'}" />
<meta property="og:image:width" content="${imageWidth || '1656'}" />
<meta property="og:image:height" content="${imageHeight || '628'}" />
`
