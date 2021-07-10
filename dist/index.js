
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./arjs-react.cjs.production.min.js')
} else {
  module.exports = require('./arjs-react.cjs.development.js')
}
