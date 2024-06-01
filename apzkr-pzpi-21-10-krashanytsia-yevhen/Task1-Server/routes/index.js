const Router = require('express')
const router = new Router()
const guitarRouter = require('./GuitarRouter')
const userRouter = require('./UserRouter')
const orderRouter = require('./OrderRouter')

router.use('/user', userRouter)
router.use('/guitar', guitarRouter)
router.use('/order', orderRouter)

module.exports = router