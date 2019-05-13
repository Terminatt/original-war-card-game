const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1
  },
  results: [
    {
      score: {
        type: Number,
        required: true
      },
      time: {
        type: Number,
        required: true
      },
      clicks: {
        type: Number,
        required: true
      }
    }
  ]
});

var Player = mongoose.model("Player", PlayerSchema);
module.exports = { Player };
