const BookSchema = require("../models/book");

const getbookinfo = (req, res) => {
  const author = req.params.id;
  BookSchema.find({ author: author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addbook = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const date = req.body.date;

  let bookData = new BookSchema({
    title: title,
    author: author,
    price: price,
    date: date,
  });

  bookData.save(); // 데이터 저장
  res.redirect("/expost"); // 리로드
};

module.exports = {
  getbookinfo,
  addbook,
};
