const express = require('express')
const authMiddleware = require('../../middlewares/auth/auth.middleware')
const counterMiddleware = require ('../../middlewares/count/count.middleware')
const router = express.Router()

router.get('/login', authMiddleware, async (req,res)=>{
    try{
        res.status(200).render('main')
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/login', async (req,res)=>{
    try{
       const {username} = req.body;
           req.session.username = username,
           req.session.admin = true
           return res.status(200).render('login',{
               username,
           })

   } catch (err){
       res.status(500).json({
           success: false,
           message: err.message
       })
   } 
})


router.post('/logout', async (req,res)=>{
   try{
    req.session.destroy(err =>{
        if(err){
            return res.status(500).send('<h1>No se pudo cerrar sesión</h1>')
        }
        function redireccionar(){
            return res.status(200).redirect('./login')
        }
        setTimeout(redireccionar, 2000);
        })
    } catch (err){
       res.status(500).json({
           success: false,
           message: err.message
       })
   }
})


module.exports = router