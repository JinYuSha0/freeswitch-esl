const router =  require('koa-router')()
const controller = require('./controller')

router.get('/api/getAllCallingAccount', controller.getAllCallingAccount)

module.exports = router