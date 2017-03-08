'use strict'

const choo = require('choo')
const xtend = require('xtend')
const css = require('sheetify')
const styles = require('./catalogs/styles')
css('css-wipe')
css('tachyons')
css('./styles.css')
const app = choo()

const width = 8
const height = 8
const grid = []
const stylesLength = Object.keys(styles).length

for (let m = 0; m < height; m += 1) {
  const column = []
  for (let n = 0; n < width; n += 1) {
    column.push({
      element: '',
      styleID: 0,
      colorID: 0
    })
  }

  grid.push(column)
}

app.model({
  state: {
    grid,
    colorPicker: {
      selectionID: 0
    }
  },
  reducers: {
    changeStyle: (state, { m, n, colorID }) => {
      const newState = xtend(state)
      const nextID = newState.grid[m][n].styleID + 1

      if (nextID === stylesLength) {
        newState.grid[m][n].styleID = 0
      } else {
        newState.grid[m][n].styleID += 1
      }

      newState.grid[m][n].colorID = state.colorPicker.selectionID

      return newState
    },

    changeColor: (state, { selectionID }) => {
      const newState = xtend(state)
      newState.colorPicker.selectionID = selectionID

      return newState
    }
  }
})

app.router([
  ['/', require('./pages/main')]
])

const tree = app.start()
document.body.appendChild(tree)
