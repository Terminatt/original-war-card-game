var mongoose = require("mongoose");

const mongoUrl = process.env.DBURL || "mongodb://localhost:27017/TodoApp";

mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

module.exports = { mongoose };
