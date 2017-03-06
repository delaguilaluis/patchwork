'use strict'

const html = require('choo/html')
const stylesMap = require('../styles-map')

module.exports = (state, prev, send) => {
  return html`
    <div>
      <table>
        ${state.grid.map((row, m) => html`
          <tr>
            ${row.map((value, n) => {
              const { element, styleID } = state.grid[m][n]

              return html`
                <td>
                  <div class=${stylesMap[styleID]} onclick=${() => send('changeBorder', { m, n })}>
                    ${element}
                  </div>
                </td>
              `
            })}
          </tr>
        `)}
      </table>
    </div>
  `
}
