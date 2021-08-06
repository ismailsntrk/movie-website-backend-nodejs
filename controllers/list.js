const User = require("../models/user");
const _ = require("lodash");
var ObjectId = require("mongoose").Types.ObjectId;


exports.addToList = (req, res) => {
  const item = req.body;

  if (req.user.list.every((mov) => mov.Title !== item.Title) === true) {
    req.user.list.push(item);
    req.user.save((err) => {
      if (err) {
        res.status(500).json({
          message: { msgBody: "Error has occured!", msgError: true },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "succesfully created card",
            msgError: false,
          },
        });
      }
    });
  }
  
};

exports.getList = (req, res) => {
  User.findById({ _id: req.user._id }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has occured!", msgError: true },
      });
    } else {
      res.status(200).json({ listItems: doc.list, authenticated: true });
    }
  });
};

exports.deleteListItem = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  User.update(
    { _id: ObjectId(userId) },
    { $pull: { list: { _id: id } } },
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

