const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const dashboard = (req, res) => {
    if (req.user) {
        user.find({}, function (err, userdetails) {
            if (!err) {
                res.render('dashboard', {
                    data: req.user,
                    details: userdetails
                })
            } else {
                console.log(err);
            }
        })
    }
}


const register = (req, res) => {
    res.render('register', {
        message2: req.flash('message2')
    })
}

const register_create = (req, res) => {
    user({
        userName: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, user) => {
        if (!err) {
            // console.log("User Added Successfully...");
            req.flash("message", "User Added");
            res.redirect("/login");
        } else {
            console.log("User Not Added...", err);
        }
    })

}

const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login', {
        message: req.flash('message'),
        data: loginData
    })
}


const login_create = (req, res) => {
    user.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const haspassword = data.password;
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    username: data.userName
                }, "souvik12345@6789", { expiresIn: '5m' })
                res.cookie("userToken", token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data)
                res.redirect('/dashboard')
            } else {
                req.flash('message2', "Invalide Password");
                res.redirect('/login')
            }
        } else {
            req.flash('message2', "Invalide Email");
            res.redirect('/login')
        }
    })
}

 usersuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next()
    } else {
        console.log(req.user);
        res.redirect('/login')
    }
}

const logout = (req, res) => {
    res.clearCookie("userToken");
    res.redirect('/login')
}

module.exports = {
    register,
    register_create,
    login,
    login_create,
    dashboard,
    usersuth,
    logout
}