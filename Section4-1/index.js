const app = require('./app')
const { PORT } = require('./utils/config')
const { info } = require('./utils/logger')

app.listen(PORT, () => {
  info(`listening on port ${PORT}`)
})
