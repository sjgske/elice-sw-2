const express = require("express");
const BookSchema = require("../models/book"); // controller 작성 -> 지워도 무방
const bookController = require("../controller/post");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.get("/del", (req, res) => {
  res.render("delete");
});

// 데이터 찾기 (controller 적용)
router.get("/bookinfo/:id", bookController.getbookinfo);

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

// 데이터 저장 (controller 적용)
router.post("/", (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;
  res.json({ name: name, phone: phone, date: date });
  // next();
});

router.post("/addbook", bookController.addbook);

// bookinfo 에 있는 정보를 다 가져온다.
router.get("/getlist", async (req, res) => {
  const result = await BookSchema.find({}).exec();
  return res.status(200).json(result);
});

// Error handling
router.post("/users", async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const job = req.body.job;
    const user = new userSchema({
      userid: userid,
      job: job,
    });
    const result = await user.save();
    res.status(200).json({
      result,
      message: "user saved",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
