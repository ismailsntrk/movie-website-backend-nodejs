const Movie = require("../models/movie");
const _ = require("lodash");
const { body } = require("express-validator");
var ObjectId = require("mongoose").Types.ObjectId;

exports.newMovie = (req, res) => {
  const {
    itemName,itemPrice,itemDiscountedPrice,itemImage,itemType,watchCounter,itemGenre
  } = req.body;

  let newMovie = new Movie({
    itemName,itemPrice,itemDiscountedPrice,itemImage,itemType,watchCounter,itemGenre
  });
  
  newMovie.save((err, success) => {
    if (err) {  
      console.log("Activation Error: ", err);
      return res.status(400).json({ error: "Movie didn t added to database" });
    }
    console.log(itemName + " Ürün Eklendi");
    res.json({
      message: "Success!",
    });
  });
};

exports.updateWatchCounter = (req, res) => {
  const id = req.params.id;
  const watchCounter = parseInt(req.params.watchCounter);

  Movie.update(
    { _id: ObjectId(id) },
    { $set: { watchCounter : watchCounter+1  } },
    { multi: true },
    function (err, doc) {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has occured!", msgError: true },
        });
      } else {
        res.status(200).json(doc);
      }
    }
  );
};

exports.getMovies = (req, res) => {
  Movie.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
    
      res.status(200).send(data);
    }
  });
};

exports.getCurrentMovie = (req, res) => {
  const title = req.params.title;

  Movie.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data.find((item) => item.itemName == title));
    }
  });
};

exports.deleteMovie = (req, res) => {
  
  if(req.params.id){
  const id = req.params.id;

  Movie.find((err, data) => {
    if (err) {
      
      res.status(500).send(err);
    } else {
      
      res.status(200).send(data.find((item) => item._id == id).delete());
    }
  });}
};
