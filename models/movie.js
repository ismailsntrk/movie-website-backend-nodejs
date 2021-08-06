const mongoose = require("mongoose");

//movie Schema

const movieSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
    },
    Rated: {
      type: String,
    },
    Released: {
      type: String,
    },
    Runtime: {
      type: String,
    },
    Genre: {
      type: Array,
      default: [],
    },
    Director: {
      type: String,
      default: "",
    },
    Writer: {
      type: String,
    },
    Actors: {
      type: String,
      default: '',
    },
    Plot: {
      type: String,
    },
    Language: {
      type: String,
    },
    Country: {
      type: String,
    },
    Awards: {
      type: String,
      default: "",
    },
    Poster: {
      type: String,
    },
    Ratings: {
      type: Array,
    },
    Metascore: {
      type: String,
    },
    imdbRating: {
      type: String,
    },
    imdbVotes: {
      type: String,
    },
    imdbID: {
      type: String,
    },
    Type: {
      type: String,
    },
    DVD: {
      type: String,
    },
    BoxOffice: {
      type: String,
    },
    Production: {
      type: String,
    },
    Website: {
      type: String,
    },
    totalSeasons: {
      type: String,
    },
    Response: {
      type: String,
    },
    movieUrl: {
      type: String,
    },
    watchCounter: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
