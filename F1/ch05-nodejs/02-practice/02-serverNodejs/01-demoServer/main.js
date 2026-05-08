//main.js
//tôi sẽ dùng http module, là 1 module có sẵn của nodejs
//thằng này cung cấp nhiều method hỗ trợ dựng và thao tác server
const http = require("http");
const PORT = 6789;

//tạo server
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(`{"msg":"xin chào con chó"}`);
});

//mở cổng kết nối
server.listen(PORT, () => {
    console.log("Server đang chạy ở port " + PORT);
});