const User = require("../models/user");
const _ = require("lodash");
var ObjectId = require("mongoose").Types.ObjectId;

exports.addLastWatched = (req, res) => {
  const userId = req.user._id;
  const lastMovie = req.body;
  const listLastMovies = req.user.lastWatched;

  if (listLastMovies.every((mov) => mov.Title !== lastMovie.Title) === true) {
    if (listLastMovies.length < 11) {
      User.update(
        { _id: ObjectId(userId) },
        { $push: { lastWatched: lastMovie } },
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
    } else {
      const firstItemId = listLastMovies[0]._id;
    
      User.update(
        { _id: ObjectId(userId) },
        { $pull: { lastWatched: { _id: firstItemId } } },
        { multi: true },
        function (err, doc) {
          if (err) {
            res.status(500).json({
              message: { msgBody: "Error has occured!", msgError: true },
            });
          } else {
            User.update(
              { _id: ObjectId(userId) },
              { $push: { lastWatched: lastMovie } },
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
          }
        }
      );
    }
  } else {
    User.update(
      { _id: ObjectId(userId) },
      { $pull: { lastWatched: { _id: lastMovie._id } } },
      { multi: true },
      function (err, doc) {
        if (err) {
          res.status(500).json({
            message: { msgBody: "Error has occured!", msgError: true },
          });
        } else {
          User.update(
            { _id: ObjectId(userId) },
            { $push: { lastWatched: lastMovie } },
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
        }
      }
    );
  }
};

exports.getLastWatched = (req, res) => {
  User.findById({ _id: req.user._id }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has occured!", msgError: true },
      });
    } else {
      res
        .status(200)
        .json({ lastWatched: doc.lastWatched, authenticated: true });
    }
  });
};
