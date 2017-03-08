'use strict'

const html = require('choo/html')
const styles = require('../catalogs/styles')
const colors = require('../catalogs/colors')


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
              const { element, styleID, colorID } = state.grid[m][n]
              const color = colors[colorID]

              return html`
                <td>
                  <div class="bg-${color} b--${color} ${styles[styleID]}" onclick=${changeStyle(m, n)}>
                    ${element}
                  </div>
                </td>
              `
            })}
          </tr>
        `)}
      </table>

      <table class="color-picker">
        <tr>
          ${colors.map((color, colorID) => {
            const border = colorID === state.colorPicker.selectionID ? 'ba bw1 b--gray' : ''
            return html`
              <td>
                <div class="fl w-10 color-box bg-${color} ${border}" onclick=${changeColor(colorID)}></div>
              </td>
            `
          })}
        </tr>
      </table>

      <div class="footer">
        <iframe src="https://ghbtns.com/github-btn.html?user=delaguilaluis&repo=patchwork&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
      </div>
    </div>
  `

  function changeStyle (m, n) {
    return () => send('changeStyle', { m, n })
  }

  function changeColor (colorID) {
    return () => send('changeColor', { selectionID: colorID })
  }
}
