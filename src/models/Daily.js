const mongoose = require("mongoose");

const DailySchema = new mongoose.Schema({
  title: {
    type: String,
    // 入力が必須かどうか
    // require: [true, '入力してください']
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
  content_4: {
    type: String,
  },
  created: {
    type: Date,
  },
});

module.exports = mongoose.models.Daily || mongoose.model("Daily", DailySchema);
