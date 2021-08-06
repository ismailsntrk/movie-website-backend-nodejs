const express = require('express');
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../controllers/passport");
const cookieParserInstance = require("cookie-parser");

router.use(cookieParserInstance());

//import controller 
const {addToList, getList ,deleteListItem } = require('../controllers/list');

//add movie

router.post('/addList',passport.authenticate("jwt", { session: false }),addToList);

//delete movie

router.delete('/delete/:id',passport.authenticate("jwt", { session: false }),deleteListItem);

//get movies

router.get('/movies', passport.authenticate("jwt", { session: false }),getList)



module.exports = router;


    
 