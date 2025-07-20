import jwt from 'jsonwebtoken';
function isLoggedIn(req, res, next){
    const token = req.cookies.user;
    if(!token) return res.json({
        error: 'No user exists!'
    })

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded){
        if(err) return res.json({
            error : 'Authorization Failed!'
        })
        res.locals.userid = decoded.id;
        next();
    });
}

export default isLoggedIn;