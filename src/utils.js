exports.promisify = (func, self) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            args.push((...value) => {
                return resolve(...value)
            })
            func.call(self || this, ...args)
        })
    }
}

exports.timeout = function (promise, ms) {
    function timeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`${ms} ms timeout`)), ms)
        })
    }

    return Promise.race([
        promise,
        timeout(ms),
    ])
}