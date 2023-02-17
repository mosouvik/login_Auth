const express=require('express');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const cookiparser=require('cookie-parser');
const userAuth=require('./middleware/userAuth')

const app=express();

app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(cookiparser());
app.use(session({
    cookie:{maxAge:50000},
    secret:'souvikm',
    resave:false,
    saveUninitialized:false,
}))




app.set('view engine','ejs')
app.set('views','views')

app.use(userAuth.authjwt)

const uroute=require('./routes/userroute')
app.use(uroute)


port=process.env.PORT||300;
const DBcon="mongodb+srv://nodeClassjan:BrnrXRpwEfvb35kG@cluster0.4axmojt.mongodb.net/gitAuthor";
mongoose.connect(DBcon,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(result=>{
    app.listen(port,()=>{
        console.log("DB connected....");
        console.log(`server running http://localhost:${port}`)
    })
}).catch(err=>{
    console.log(err);
})