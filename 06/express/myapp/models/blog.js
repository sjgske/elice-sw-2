const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

// auto-increment (자동적으로 번호 매겨지는 것)

autoIncrement.initialize(mongoose);

const blog = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    no: Number,
  },
  {
    timestamps: true,
  }
);

blog.plugin(autoIncrement.plugin, {
  model: "model",
  field: "no",
  startAt: 2,
  increment: 1,
});

const blogModel = mongoose.model("blog", blog);
module.exports = blogModel;
