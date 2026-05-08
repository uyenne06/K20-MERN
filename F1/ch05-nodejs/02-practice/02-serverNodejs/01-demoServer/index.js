//index.js
//demo dựng server bằng expressjs 
const express = require("express");
const PORT = 4444;
//dựng server 
const server = express();//http.createServer
//kịch bản 
server.get("/", (req, res) => {
    res.send("Ahihi đồ chó");
});

//route: http://localhost:4444/user
server.get("/user", (req, res) => {
    res.send("tất nhiên là t k có user nào rồi !!!");
});

//server mở cổng 
server.listen(PORT, () => {
    console.log("Server đang mở ở port " + PORT);
});