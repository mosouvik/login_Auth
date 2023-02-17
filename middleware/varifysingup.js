const usermodel=require('../model/user');

exports.CheckDuplicate=(req,res,next)=>{
    usermodel.findOne({
        email:req.body.email
    }).exec((err,email)=>{
        if (err) {
            console.log(err);
            return
        }
        if (email) {
            req.flash('message2',"Email Already Exisist");
           return res.redirect('/')
        }

        const password=req.body.password
        const confirm=req.body.confirmpassword
        if (password !== confirm) {
            req.flash('message2',"Password & Confirm Password are NOT Matched")
            return res.redirect('/')
        }
        next()
    })
}