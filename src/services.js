const Conn = require('./FreeSwitchConn')

async function sGetAllCallingAccount () {
    const client = await Conn()
    const json = (await client.apiSync('show calls as json')).body
    const obj = JSON.parse(json), res = {}
    res.count = obj.row_count
    if (obj.rows && Array.isArray(obj.rows)) {
        res.caller_list = obj.rows.map(obj => obj.cid_num)
        res.callee_list = obj.rows.map(obj => obj.b_callee_num)
    }
    return res
}

module.exports = {
    sGetAllCallingAccount,
}