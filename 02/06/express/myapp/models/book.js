const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 스키마: 데이터 형식(?)

const book = new Schema({
  title: String,
  author: String,
  price: {
    type: Number,
    default: 5000, // 값을 강제로 지정해주고 싶을 때
  },
  date: Date,
  sales: {
    type: Boolean,
    default: false,
  },
});

const bookData = mongoose.model("bookinfo", book);
// mongoose.model("collection 이름", data)
module.exports = bookData;
