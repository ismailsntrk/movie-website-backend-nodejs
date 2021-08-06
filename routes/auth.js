const express = require('express');
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../controllers/passport");
const cookieParserInstance = require("cookie-parser");

router.use(cookieParserInstance());
//import controller 
const {signup , activateAccount,isAuthenticated,logout,signin,forgotPassword,resetPassword} = require('../controllers/auth');

router.post('/signup',signup);
router.post('/email-activate',activateAccount);
router.post('/signin',passport.authenticate("local", { session: false }),signin);
router.get('/logout',passport.authenticate("jwt", { session: false }),logout);
router.get('/authenticated',passport.authenticate("jwt", { session: false }),isAuthenticated);

//reset pass

router.put('/forgot-password',forgotPassword)
router.put('/reset-password', resetPassword)

module.exports = router;


    
 