const express = require('express');
const router = express.Router();

//import controller 
const {newMovie , deleteMovie ,getMovies ,getCurrentMovie , updateWatchCounter} = require('../controllers/movie');

//add movie

router.post('/new',newMovie);


//delete movie

router.delete('/delete/:id',deleteMovie);

//get movies

router.get('/get',getMovies)

//get movies

router.get('/getCurrent/:title',getCurrentMovie)

//update watchCounter movies

router.put('/updateWatch/:id/:watchCounter',updateWatchCounter)



module.exports = router;


    
 