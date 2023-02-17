const jwt=require('jsonwebtoken');

exports.authjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,"souvik12345@6789",(err,data)=>{
            req.user=data
            next();
        })
    } else {
        next();
    }
}