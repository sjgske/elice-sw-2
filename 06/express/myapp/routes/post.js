const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = req.body.date;
  res.json({ name: name, phone: phone, date: date });
  // next();
});

// router.post("/", (req, res) => {
//   res.redirect("/expost");
//   // res.redirect => 호출한 경로로 재접근 (맨 처음 화면 리로드)
// });

module.exports = router;
