// 04-json-ajax-fetch.js
//JSON: javascript object notation
//  1 chuỗi được viết dưới dạng object của javascript
//  dùng để lưu trữ | trao đổi dữ liệu giữa các hệ thống(khác ngôn ngữ)
//  json lưu được: 
//      string, number, boolean, array, object, null
//  json có 2 thao tác chính .parse | .stringify

const obj1 = {
    name: "Điệp đẹp trai",
    age: 22,
    status: "Độc Thân",
    sayHi() {
        console.log("Xin chào mọi người");
    },
};

let myJson = JSON.stringify(obj1);
console.log(myJson);
//'{"name":"Điệp đẹp trai","age":22,"status":"Độc Thân"}'
//Cú pháp json 
//  - với object thì data là cặp key:value
//  - các data được ngăn cách bằng dấu ,
//  - ngoặc nhọn mô tả object 
//  - [] dùng để mô tả mảng
//  - Json dùng dấu "" để phân biệt '' bên ngoài bọc chuỗi 
//  - key được bọc trong cặp nháy ""

//thử đoán đáp án 
let a = 1; // '1'
//string 
let str = "ahihi"; //'"ahihi"'
//boolean
let boolean = true; //'true'

//------------------------
//AJAX : Asynschronous javascript and XML 
//  AJAX: không phải ngôn ngữ lập trình gì cả 
//  AJAX là sự kết hợp của 
//  - XMLHttpRequest(xhr): giúp nhận | gửi request (yêu cầu)
//          chỉ có trên trình duyệt 
//  - js: xử lý logic và kiện hàng nhận được 
//  - HTML DOM: hiển thị giao diện 
//  - XML là chuẩn lưu trữ giống json nhưng cũ và khó viết hơn 
//Axios
//FetchAPI: cung cấp khả năng gửi | nhận request thông qua trình duyệt 
//  duyệt có gốc là xhr function 
//FetchAPI dùng công nghệ Promise => xử lý bất đồng bộ 
//Front: gửi yêu cầu lấy danh sách users cho backend 
fetch ("https://6904a7db6b8dabde496493ad.mockapi.io/users/5", {
    method: "GET",
})
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then((data) => {
        console.log("dữ liệu nè: ");
        console.log(data);
    })
    .catch(error => {
        console.log("Server mất kết nối vì " + error);   
    });

//method post: thêm 1 user vào users
fetch ("https://6904a7db6b8dabde496493ad.mockapi.io/users", {
    method: "POST",
    headers:{
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({ name: "Điệp đẹp trai", yob: 2004 }),
})
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then((data) => {
        console.log("dữ liệu nè: ");
        console.log(data);
    })
    .catch(error => {
        console.log("Server mất kết nối vì " + error);   
    });