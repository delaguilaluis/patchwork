'use strict'

const html = require('choo/html')
const stylesMap = require('../styles-map')

module.exports = (state, prev, send) => {
  return html`
    <div>
      <table class="grid">
        ${state.grid.map((row, m) => html`
          <tr>
            ${row.map((value, n) => {
              const { element, styleID } = state.grid[m][n]

              return html`
                <td>
                  <div class="box ${stylesMap[styleID]}" onclick=${() => send('changeBorder', { m, n })}>
                    ${element}
                  </div>
                </td>
              `
            })}
          </tr>
        `)}
      </table>

      <div class="footer">
        <a href="https://twitter.com/delaguilaluis">@delaguilaluis</a>
      </div>
    </div>
  `
}
