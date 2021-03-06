const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const log4js = require('./utils/log4j')
// const index = require('./routes/index')
const users = require('./routes/users')
const router = require('koa-router')()

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(()=>{
//   ctx.body = 'hello'
// })

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  // const start = new Date()
  await next()
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post body:${JSON.stringify(ctx.request.body)}`)
  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.prefix("/api")
router.use(users.routes(), users.allowedMethods())
// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
  console.error('server error', err, ctx)
});

module.exports = app
