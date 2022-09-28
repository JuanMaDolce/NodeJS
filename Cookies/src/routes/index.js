const express = require('express')

const cookieRoutes = require('./cookies/cookies.routes')
const sessionRoutes = require('./session/session.routes')

const router = express.Router()

router.get('/', (req,res)=>{
    res.status(200).json({
        sucess: true,
        message: 'Health Up!'
    })
})
.use('/session', sessionRoutes)
/* .use('/cookies', cookieRoutes) */

module.exports = router;