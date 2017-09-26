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
        <div id="canvas" class="absolute left-0 right-0 center">
          <table class="center ba bw1">
            ${state.grid.map((row, m) => html`
              <tr>
                ${row.map((value, n) => {
                  const { canvasColorID } = state.grid[m][n]
                  const color = colors[canvasColorID]

                  return html`
                    <td>
                      <div class="box bg-${color} b--${color}"></div>
                    </td>
                  `
                })}
              </tr>
            `)}
          </table>
        </div>

        <div id="patchwork" class="relative">
          <table class="center ba bw1">
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
      </div>

      <div id="color-picker" class="mt3 mb1">
        <table class="center">
          <tr>
            ${colors.map((color, colorID) => {
              const border = colorID === state.colorPicker.selectionID ? 'mh1 bw1 b--silver' : 'b--black-30'
              return html`
                <td>
                  <div class="fl pa3 bg-${color} ba ${border}" onclick=${changeColor(colorID)}></div>
                </td>
              `
            })}
          </tr>
        </table>
      </div>

      <div id="canvas-picker" class="mb3 mt1">
        <table class="center">
          <tr>
            ${colors.map((color, colorID) => {
              const border = colorID === state.canvasColorPicker.selectionID ? 'mh1 bw1 b--silver' : 'b--black-30'
              return html`
                <td>
                  <div class="fl pa3 bg-${color} ba ${border}" onclick=${changeCanvasColor(colorID)}></div>
                </td>
              `
            })}
          </tr>
        </table>
      </div>

      <div class="tc ma3" id="footer">
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

  function changeCanvasColor (colorID) {
    return () => emit('changeCanvasColor', { selectionID: colorID })
  }
}
