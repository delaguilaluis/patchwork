'use strict'

const html = require('choo/html')
const stylesMap = require('../styles-map')

module.exports = (state, prev, send) => {
  return html`
    <div>
      <div class="header">
        <h2>Go ahead, click it!</h2>
      </div>

      <table class="grid">
        ${state.grid.map((row, m) => html`
          <tr>
            ${row.map((value, n) => {
              const { element, styleID } = state.grid[m][n]

              return html`
                <td>
                  <div class="${stylesMap[styleID]}" onclick=${() => send('changeBorder', { m, n })}>
                    ${element}
                  </div>
                </td>
              `
            })}
          </tr>
        `)}
      </table>

      <div class="footer">
        <iframe src="https://ghbtns.com/github-btn.html?user=delaguilaluis&repo=patchwork&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
      </div>
    </div>
  `
}
