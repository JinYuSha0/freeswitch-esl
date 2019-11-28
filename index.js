const Koa = require('koa')
const https = require('https')
const fs = require('fs')
const sslify = require('koa-sslify').default
const cors = require('koa2-cors')
const router = require('./src/routes')

const app = new Koa()

app.use(sslify())

app.use(cors({
    origin: (ctx) => ('*'),
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['*'],
}))

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.body = {
            code: 500,
            msg: err.message,
        }
    }
})

app
    .use(router.routes())
    .use(router.allowedMethods())

const httpsOptions = {
    cert: fs.readFileSync('./cert/server.83.crt'),
    key: fs.readFileSync('./cert/server.83.key'),
}
https.createServer(httpsOptions, app.callback()).listen(3003, function () {
    console.log('Running on port 3003')
})