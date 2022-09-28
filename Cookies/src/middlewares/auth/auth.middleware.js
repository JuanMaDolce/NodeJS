const authMiddleware = async (req,res,next) =>{
    const {username} = req.session;
    if(username){
        req.session.visits = req.session.visits ? ++req.session.visits : 1
        return res.status(200).render('login',{
            username
        })
    }
    return next()
};

module.exports = authMiddleware;