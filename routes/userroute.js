const express=require('express');
const route=express.Router();
const constroller=require('../controller/usercontroller');
const verify=require('../middleware/varifysingup')

route.get('/',constroller.register)
route.post('/register',[verify.CheckDuplicate],constroller.register_create)
route.get('/login',constroller.login)
route.post('/login/create',constroller.login_create)
route.get('/dashboard',constroller.usersuth, constroller.dashboard)
route.get('/logout',constroller.logout)


module.exports=route;