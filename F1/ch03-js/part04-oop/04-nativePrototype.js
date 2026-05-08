//thuộc tính prototype sử dụng rộng rãi trong js
//mọi constructor đều có sẵn prototype

//tổng kết khái niệm như sau:
//[[Prototype]]: là 1 thuộc tính ẩn của Object. đại diện cho prototype thực thể
//__proto__ là get/set của [[Prototype]]

//prototype chain: cây phả hệ

let obj = {}; //đối tượng ko có thuộc tính gì hết
let obj1 = new Object();
console.log(obj.__proto__ == Object.prototype); //true
console.log(obj.__proto__.__proto__); //null
console.log(Object.prototype.__proto__); //null

let mang1 = [1, 2, 3];
console.log(mang1._proto__ == Array.prototype); //true
console.log(Array.prototype.__proto__.__proto__); //null
console.log(mang1.__proto__.__proto__ == Array.prototype.__proto__); //true