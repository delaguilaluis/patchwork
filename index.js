'use strict'

const choo = require('choo')
const css = require('sheetify')
const styles = require('./catalogs/styles')
const lastColor = require('./catalogs/colors').length - 1

css('css-wipe')
css('tachyons')
css('./styles.css')

const app = choo()
app.use(require('choo-service-worker')())
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-log')())
}

app.use(patchwork)
app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app

function patchwork (state, emitter) {
  state.grid = makeGrid(8, 8)
  state.colorPicker = { selectionID: 0 }
  state.canvasColorPicker = { selectionID: lastColor }

  emitter.on('changeStyle', function ({ m, n, colorID }) {
    const stylesLength = Object.keys(styles).length
    const nextID = state.grid[m][n].styleID + 1

    if (nextID === stylesLength) { // Cycle
      state.grid[m][n].styleID = 0
    } else {
      state.grid[m][n].styleID += 1
    }

    state.grid[m][n].colorID = state.colorPicker.selectionID
    state.grid[m][n].canvasColorID = state.canvasColorPicker.selectionID

    emitter.emit('render')
  })

  emitter.on('changeColor', function ({ selectionID }) {
    state.colorPicker.selectionID = selectionID

    emitter.emit('render')
  })

  emitter.on('changeCanvasColor', function ({ selectionID }) {
    state.canvasColorPicker.selectionID = selectionID

    emitter.emit('render')
  })
}

function makeGrid (width, height) {
  const grid = []

  for (let m = 0; m < height; m += 1) {
    const column = []
    for (let n = 0; n < width; n += 1) {
      column.push({
        element: '',
        styleID: 0,
        colorID: 0,
        canvasColorID: lastColor
      })
    }

    grid.push(column)
  }

  return grid
}
