console.log("Bài 1: variable - hoisting - scope");
// trong js nta có phân loại kiểu dữ liệu 
// nhưng không ép khai báo kiểu dữ liệu khi tạo biến 
// var: xuất hiện từ bản ES đầu tiên của js 
// ES: ECMAScripts ES6(2015) ES7(2016)
var name1 = "Điệp đẹp trai";
console.log(name1);
name1 = "Điệp 10 điểm"; //re-assigning
console.log(name1);

// khai báo và không gán giá trị
var age;
console.log(typeof age);//undefined
console.log(age);
age = 10;
console.log(typeof age);//number
console.log(age);

//quy tắc đặt tên 
// không bắt đầu bằng số => bắt đầu bằng chữ cái 
// cammelCase(biến, prop), UnderScore(database), pascalCase(Class)
// được phép đặt _(private) và $(protected) ở đầu 

//Hoisting với var : (hoisting: móc ngược lên)
//nghĩa là xài 1 biến được tạo phía dưới, lỡ xài trc khi tạo 
console.log(msg);
var msg = "Hello";
console.log(msg);

// var msg;
// console.log(msg);
// msg = "Hello";
// console.log(msg);

//hoisting là tính năng không phải bug 
//NormalMode(châm chước) | use strict mode(nghiêm khắc)
message = "Thông báo";
console.log(message);

// Sau ES6(2015)  js thêm vào 
// let | const(hằng số) dùng để thay thế var 
// 2 thằng này k hoisting 
// 1 vài sai lầm khi xài const(hằng số)
const profile = { name: "Toàn", height: 160};
profile.height = 170;
// const profile = { name: "Toàn", height: 180}; //lỗi(already been declared)

// vì profile(obj) bản chất là con trỏ, nó trỏ tới 1 cái địa chỉ, 
// rồi cái địa chỉ đó chỉ tới thằng con, nên nếu profile.height = 170;
// thì vẫn được, nhưng mà nếu sửa height thành số khác thì không
// vì nếu sửa thành số khác thì profile đã trỏ tới địa chỉ khác 

const array1 = [1, 2, 3, 4, 5];
array1.push(6);
// array1 = [1, 2, 3, 4, 5, 6]; //lỗi

//Scope: trong js có 3 loại scope
//Global scope: toàn cực 
//Funct scope: nội hàm 
//Block scope: cục bộ 

// var sẽ k bị can thiệp bởi scope nào hết 
// tạo biến bằng var là tạo global scope 
// var là tạo prop cho windowObject, và prop có thể 
// xuất hiện ở bất cứ đâu trong object đó(if, method)
var son = "Tùng";
if(true){
    var son = "Hòa";
}
console.log(son);

// let | const không có hoisting và có scope
// var có hoisting và out scope 
