const User = require('../models/user')

module.exports = (req,res,next) => {
    User.findById(req.session.userId).then((user) => {
        if (!user) {
            return res.redirect('login')
        }
        next()
    }).catch(error => {
        console.error(error)
    })
}