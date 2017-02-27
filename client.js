'use strict'

const choo = require('choo')
const app = choo()

const width = 8
const height = 8

app.model({
  state: {
    grid: {
      rows: Array.from({ length: width })
        .map(item => Array.from({ length: height })
          .map((/* item */) => ({ element: 'x' }))
        )
    }
  }
})

app.router([
  ['/', require('./pages/grid')]
])

const tree = app.start()
document.body.appendChild(tree)
