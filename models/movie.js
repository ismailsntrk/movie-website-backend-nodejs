const { Number } = require("mongoose");
const mongoose = require("mongoose");

//movie Schema

const movieSchema = new mongoose.Schema(
 {
  itemName: {
      type: String,
      required: true,
    },
 
    itemPrice:{
      type:Number,
      required:true,
    },
    itemBasket:{
      type:Number,
      default:1
    },

    itemDiscountedPrice:{
      type: Number,
     default: ''
    },
    itemImage: {
      type: String,
      required: true,
    },
    
    itemType: {
      type: String,
      required: true,
    },
    
    watchCounter: {
      type: Number,
      default: 0
    },
    itemGenre : {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Movie", movieSchema);
