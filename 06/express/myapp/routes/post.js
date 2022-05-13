const express = require("express");
const BookSchema = require("../models/book");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.get("/del", (req, res) => {
  res.render("delete");
});

// 데이터 찾기
router.get("/bookinfo/:id", (req, res) => {
  const author = req.params.id;

  // Model.find(찾아올 데이터, callback);
  // findOne -> 하나만 찾기
  BookSchema.find({ author: author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 삭제하기
router.post("/del/:id", (req, res) => {
  const title = req.params.id;

  BookSchema.findOneAndDelete({ title: title })
    .then((result) => {
      res.json({ redirect: "/expost" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;
  res.json({ name: name, phone: phone, date: date });
  // next();
});

router.post("/addbook", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const date = req.body.date;

  // 요청한 데이터를 BookSchema에 할당해준다.
  let bookData = new BookSchema({
    title: title,
    author: author,
    price: price,
    date: date,
  });

  bookData.save(); // 데이터 저장
  res.redirect("/expost"); // 리로드
});

module.exports = router;
