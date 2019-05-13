const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var GameInstanceSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: false
  },
  token: {
    type: String,
    required: true
  }
});

var GameInstance = mongoose.model("GameInstance", GameInstance);
module.exports = { GameInstance };
