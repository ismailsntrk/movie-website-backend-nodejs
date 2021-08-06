const express = require('express');
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../controllers/passport");
const cookieParserInstance = require("cookie-parser");

router.use(cookieParserInstance());

//import controller 
const { addLastWatched , getLastWatched } = require('../controllers/lastWatched');



router.get('/getLastWatched', passport.authenticate("jwt", { session: false }),getLastWatched)


//get movies

router.post('/addLastWatched', passport.authenticate("jwt", { session: false }),addLastWatched)

module.exports = router;


    
 