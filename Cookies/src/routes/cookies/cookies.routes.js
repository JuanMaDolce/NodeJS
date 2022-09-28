/* const express = require('express')

const router = express.Router()

router.post('/save', async (req,res)=>{
    try{
        const {name,value, expire} = req.body;
        if(!name || !value){
            res.status(400).json({
                sucess: false,
                message: 'Error nombre o valor de cookie'
            })
        }
        let config ={}
        config['signed'] = true
        if(expire){
            config['maxAge'] = parseInt(expire) * 1000
        }
        res.cookie(name,value,config)
        res.status(200).json({
            sucess: true,
            message: 'Cookie guardada'
        })
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/', async(req,res)=>{
    try{
        const {signedCookies} = req;
        res.status(200).json(signedCookies)
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/:cookieName', async(req,res)=>{
    try{
        const {cookieName} = req.params
        req.clearCookie(cookieName)
        res.status(200).json({
            success: true,
            message: `Cookie ${cookieName} borrada`
        })
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router; */