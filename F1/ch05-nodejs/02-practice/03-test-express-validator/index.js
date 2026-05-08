const express = require("express");
const { query, validationResult, matchedData } = require("express-validator");
const app = express();

app.use(express.json());

//localhost:3000/hello
app.get(
  "/hello",
  query("person").notEmpty().withMessage("Khong dc bo trong").escape(),
  (req, res) => {
    //lấy lỗi đã đc các middleware cất trước đó trong req
    const error = validationResult(req);

    if (error.isEmpty()) {
      const data = matchedData(req); //lấy những data đã được xử lý sanitizal
      return res.send(`Hello, ${data.person}`);
    }

    return res.status(400).json({
      error: error.array(),
    });
  }
);

app.listen(3000, () => {
  console.log("Server tao đang chạy ở port 3000 đó");
});
