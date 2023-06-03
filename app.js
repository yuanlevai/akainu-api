require('dotenv').config();

const use_apm = process.env.USE_APM || false
const apm = require('elastic-apm-node').start({
    serviceName: process.env.APP_NAME,
    environment: 'development',
    active: use_apm
})


const express = require('express')
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const logger = require('morgan')
const app = express()

const opt = {
    dsn: process.env.SENTRY_DSN,
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
}

Sentry.init(opt);

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

const fs = require('fs')

// import repositories
const ItemRepository = require('./repository/item')
const UserRepository = require('./repository/user')

// import use cases
const ItemUseCase = require('./usecase/item')
const AuthUseCase = require('./usecase/auth')

// import routers
const itemRouter = require('./routes/item')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const fileRouter = require('./routes/file')

// init repositories and use cases
const itemUC = new ItemUseCase(new ItemRepository())
const authUC = new AuthUseCase(new UserRepository())

// json
app.use(express.json())

const LOG_FILE = process.env.LOG_FILE || './logs/access.log'

app.use(logger('combined', {
    stream: fs.createWriteStream(LOG_FILE, {flags: 'a'})
}))

// inject use cases
app.use((req,res,next) => {
    req.itemUC = itemUC
    req.authUC = authUC
    next()
})

app.get('/', function (req, res) {
    // #swagger.ignore = true
    res.send('Hello World')
})

app.get("/debug-sentry", function mainHandler(req, res) {
    // throw new Error("My first Sentry error!");
    res.send('Hello World')
});

// init routers
app.use('/item', itemRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/file', fileRouter)

// documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/docs.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

module.exports = app

