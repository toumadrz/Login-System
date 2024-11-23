module.exports = (req, res) => {
    let email = ""
    let password = ""
    let username = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        email = data.email
        username = data.username
        password = data.password
    }


    res.render('register',{
        errors: req.flash('validationErrors'),
        email:email,
        username:username,
        password:password
    })
}