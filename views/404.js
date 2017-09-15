'use strict'

const html = require('choo/html')

const TITLE = 'Patchwork - route not found'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body class="sans-serif">
    <div class="header">
      <h2>
        404 - route not found
      </h2>
      <a href="/" class="link black underline">
        Back to main
      </a>
    </body>
  `
}
