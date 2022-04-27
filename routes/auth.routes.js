

const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

const saltRounds = 10;


router.get("/register", (req, res, next) => {
    res.send("display form")
    res.render("auth/register");
});

router.post("/register", (req, res, next) => {
    const { username, email, password } = req.body;

   
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
//console.log(`Password hash: ${hashedPassword}`);
        //})
        //.catch(error => next(error));
    //});

return User.create({

    username, 
    email,

    passwordHash: hashedPassword
});
        })
         .then(userfromDB => {
             console.log('new created user is: ', userFromDB);
            

        })
    
    .catch( error => {
        next(error);
        //console.log("error creating account ", error);

    });
    
//LOGIN: display form
router.get("/login", (req, res, next) => {
    res.render("auth/login");
})

//LOGIN: process form
router.post("/login", (req, res, next) => {

    const {email, password} = req.body;

    if( !email || !password){
        res.render("auth/login", {errorMessage: "Please provide email and password"});
        return;
    }

    User.findOne({email: email})
        .then( userFromDB => {
            if( !userFromDB ) {
                //user doesn't exist
               , { errorMessage: 'Incorrect credentials (no user with that email address).' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                res.send("login successful")
            } else {
                //login failed (password doesn't match)
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch( error => {
            console.log("Error getting user details from DB", error);
            next(error);
        });


module.exports = router;

    /*
    //query db is below
    .then( hash => {

        const userDetails = {
            email,
            passwordHash: hash
        }

        return User.create(userDetails)
    })
    .then( userFromDB => {
        res.send("user was created")
    })*/