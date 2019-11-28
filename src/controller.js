const { sGetAllCallingAccount } = require('./services')

async function getAllCallingAccount (ctx, next) {
    const res = await sGetAllCallingAccount()
    ctx.body = {
        code: 200,
        bo: res,
    }
}

module.exports = {
    getAllCallingAccount,
}