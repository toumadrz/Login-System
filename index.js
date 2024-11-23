const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//connect mongodb 
mongoose.connect('mongodb+srv://admin:1234@cluster0.gx66z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser:true
})

global.loggedIn = null

const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homecontroller')

// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')
const updateUserController = require('./controllers/updateUserController')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*",(req,res,next) => {
    loggedIn =req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.put('/updateuser', updateUserController)

app.get('/', indexController)
app.get('/home',authMiddleware,homeController)
app.get('/login', redirectIfAuth,loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth,storeController)
app.post('/user/login', redirectIfAuth,loginUserController)
app.get('/logout',logoutController)


app.listen(8000, () => {
    console.log("start at port 8000")
})

