const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//user Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 48,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 48,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    lastWatched: {
      type: Array,
    },
    resetLink: {
      data: String,
      default: "",
    },

  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcryptjs.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    } else {
      this.password = passwordHash;
      next();
    }
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcryptjs.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
