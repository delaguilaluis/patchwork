'use strict'

const html = require('choo/html')
const styles = require('../catalogs/styles')
const colors = require('../catalogs/colors')

var TITLE = 'Patchwork'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body>
      <header class="center ma3">
        <h2 class="tc f4 sans-serif">Go ahead, click it!</h2>
      </header>

      <div id="grid" class="ma3">
        <table class="center ba bw1 b--black">
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
      </div>

      <div id="color-picker" class="ma3">
        <table class="center">
          <tr>
            ${colors.map((color, colorID) => {
              const border = colorID === state.colorPicker.selectionID ? 'ma1 bw1 b--silver' : 'b--black-30'
              return html`
                <td>
                  <div class="fl pa3 bg-${color} ba ${border}" onclick=${changeColor(colorID)}></div>
                </td>
              `
            })}
          </tr>
        </table>
      </div>

      <div class="tc ma4" id="footer">
        <iframe src="https://ghbtns.com/github-btn.html?user=delaguilaluis&repo=patchwork&type=star&count=true" frameborder="0" scrolling="0" width="80px" height="20px"></iframe>
      </div>
    </body>
  `

  function changeStyle (m, n) {
    return () => emit('changeStyle', { m, n })
  }

  function changeColor (colorID) {
    return () => emit('changeColor', { selectionID: colorID })
  }
}
