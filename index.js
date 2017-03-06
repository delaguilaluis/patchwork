'use strict'

const choo = require('choo')
const xtend = require('xtend')
const css = require('sheetify')
const stylesMap = require('./styles-map')

css('css-wipe')
css('./styles.css')
const app = choo()

const width = 8
const height = 8
const stylesMapLength = Object.keys(stylesMap).length
const grid = []

for (let m = 0; m < height; m += 1) {
  const column = []
  for (let n = 0; n < width; n += 1) {
    column.push({
      element: '',
      styleID: 0
    })
  }

  grid.push(column)
}

app.model({
  state: { grid },
  reducers: {
    changeBorder: (state, { m, n }) => {
      const newState = xtend(state)
      const nextID = newState.grid[m][n].styleID + 1

      if (nextID === stylesMapLength) {
        newState.grid[m][n].styleID = 0
      } else {
        newState.grid[m][n].styleID += 1
      }

      return newState
    }
  }
})

app.router([
  ['/', require('./pages/grid')]
])

const tree = app.start()
document.body.appendChild(tree)
