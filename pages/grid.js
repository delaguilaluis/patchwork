'use strict'

const html = require('choo/html')
const css = require('sheetify')
const prefix = css('../styles.css')

module.exports = (state, prev, send) => {
  const rows = state.grid.rows
  return html`
    <div>
      <table>
        ${rows.map(row => html`
          <tr>
            ${row.map(column => html `
              <td>
                <div class=${prefix}>${column.element}</div>
              </td>
            `)}
          </tr>
        `)}
      </table>
    </div>
  `
}
