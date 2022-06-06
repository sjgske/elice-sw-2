const express = require("express");
const blogSchema = require("../models/blog");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await blogSchema.find({}).exec();
  res.render("blog/blog", { content: result });
});

router.get("/write", (req, res) => {
  res.render("blog/write");
});

router.post("/write", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const blogPost = new blogSchema({
    title: title,
    content: content,
  });

  // 데이터 저장, 에러 처리
  blogPost
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
