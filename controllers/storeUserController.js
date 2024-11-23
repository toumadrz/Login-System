const User = require('../models/user')

module.exports = (req,res) => {
    User.create(req.body).then(()=>{
        console.log("register successfully")
        res.redirect('/')
    }).catch((error) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}