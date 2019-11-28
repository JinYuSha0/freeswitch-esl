const esl = require('modesl')
const { promisify, timeout } = require('./utils')

const freeSwitchConn = {
    client: null,
    connecting: false,
}

function FreeSwitchConn() {
    return new Promise((resolve, reject) => {
        if (freeSwitchConn.client) {
            resolve(freeSwitchConn.client)
            return
        }

        if (freeSwitchConn.connecting) {
            reject(new Error('FreeSwitch esl connecting'))
            return
        }

        freeSwitchConn.connecting = true
        const _conn = new esl.Connection('127.0.0.1', 8021, 'ClueCon')
        function onReady() {
            freeSwitchConn.client = this
            freeSwitchConn.connecting = false
            resolve(this)
        }
        function onError(error) {
            freeSwitchConn.client = null
            freeSwitchConn.connecting = false
            reject(error)
        }
        _conn.once('esl::ready', onReady)
        _conn.once('error', onError)
        _conn.apiSync = (...args) => timeout(
            promisify(_conn.api, _conn).apply(_conn, args),
            5000,
        )
    })
}

module.exports = FreeSwitchConn