const mongoose = require("mongoose");

const RunDailySchema = new mongoose.Schema({
  mileage: {
    type: String,
  },
  content_1: {
    type: String,
  },
  content_2: {
    type: String,
  },
  content_3: {
    type: String,
  },
  created: {
    type: Date,
  },
});

module.exports =
  mongoose.models.RunDaily || mongoose.model("RunDaily", RunDailySchema);
