"use strict"
console.log("Bài 6: Hàm - các method của number");
//hàm trong js chia làm 2 loại chính 
//function declaration và function expression 
//1. function declaration(khai báo hàm): nó hoisting
handle1(); //hoisting

function handle1(){
    console.log("Tui là hàm dc tạo bằng function declaration");
}

handle1();

//2.function expression

// handle2(); 
//var Error handle2(undefined) is not a function
//let Error handle2 is not initialization
//let Error handle2 is not defined
var handle2 = function() {
    console.log("Tui là hàm dc tạo bằng function expression"); 
};

handle2();

//IIFE(immediately invokable function expression)
//hàm chạy liền 
//IIFE + Async await | Promise 
(function () {
    let a = 10;
    let b = 20;
    console.log(a + b);
})();
//thằng này tạo ra hàm k có tính tái sử dụng, dùng liền, k cần đặt tên 

//Callback: gọi lại | hàm nhận 1 hàm khác làm đối số (paramater)
//Function1(function2)
//function1: là callback =-= function2: là callback function 

//chúng ta có 1 callback có sẵn của webapi
//tên là setTimeout(handle, milisecond)
//  setTimeout sẽ đợi milisecond
//  sau đó nó sẽ chạy handle 

let handle3 = function () {
    console.log("Anh Điệp đẹp trai quáaaa");
};

// setTimeout(handle3, 3000);

// setTimeout(() => {
//      console.log("Anh Điệp đẹp trai quá"); 
// }, 3000);

//Arrow function cũng là Function Expression 
//thằng này sẽ thả this

//tìm hiểu this trong các dạng function

//FD 
function handle4(){
    console.log(this); //undefined
};

//FE
let handle5 = function () {
    console.log(this); //undefined
};

//FA
let handle6 = function () {
    console.log(this); //undefined 
};
//chạy               normal             use strict
handle4(); //fd     windowObject        undefined        
handle5(); //fe     windowObject        undefined
handle6(); //fa     windowObject        windowObject

//this là gì ? this là đại diện cho đối tượng gọi hàm chứa nó 
//FD | FE sẽ giam this (tốt) cho tới khi có người gọi hàm 
//và nếu k có người gọi thì nó là undefined
//FA thì nó sẽ thả this ra ngoài 

// This trong method thì sao ?
let person1 = {
    fullname: "Điệp đẹp trai",
    //method
    getNameByFd () {
        console.log(this.fullname); //this ở đây là undefined  
    },
    //
    getNameByFe: function () {
        console.log(this.fullname); //this ở đây là undefined     
    },
    //
    getNameByFa: () => {
        console.log(this.fullname); //this ở đây là undefined       
    },
};
//chạy                           normal/use strict 
person1.getNameByFd(); //       this = person1 ==> Điệp đẹp trai
person1.getNameByFe(); //       this = person1 ==> Điệp đẹp trai
person1.getNameByFa(); //       this = window  ==> undefined

//phân biệt dc parameter(tham số) và argument(đối số)
function handle7(a, b = 10){
    console.log(a + b);
} //b = 10 default parameter(tham số mặc định)

handle7(2); //12
handle7(2, 5); //7

//tham sso còn lại | tham số đợi | tham số nghỉ | rest parameter
function handle8(a, b, ...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

//spread operator (cấu trúc phân rã): ... => destructuring 

handle8(3, 2); //a = 3 , b = 2 , c = []

//ứng dụng thực thế: hàm nhận vào 1 đống giá trị,
// rồi tính tổng đống số đã nhận vào 

function sumALL(...numList){
    let sum = 0; 
    numList.forEach((value) => {
        sum += value;
    });
    return sum;
}

let result = sumALL(1, 2, 3, 4, 5, 6, 7);
console.log(result); //28

//Bài 9: Number và Method
//không ai dùng js để code app ngân hàng cả 
//số trong js chỉ có dạng là number 
//số nguyên có độ chính xác là 15 chữ số 
var x = 999999999999999; //15 số
x = 9999999999999999; //16 số

//đối với số thập phân thì độ chính xác là 17
x = 0.2 + 0.1;
x = (0.2 * 10 + 0.1 * 10) / 10; 
x = Number((0.2 + 0.1).toFixed(1));

console.log(x);

//Math.js(nodejs)

//
//cộng chuỗi, trừ số
console.log(2 + 2); //4
console.log(2 + "2"); //'22'
console.log("2" + 2); //'22'

console.log(2 + "d"); //'2d'
console.log(2 - "2"); //0
console.log(2 / "d"); //NaN
console.log("2" - "2"); //0
console.log("2" - "d"); //NaN
console.log(2 / 0); //infinity
console.log(-2 / 0); //-infinity

x = 0o7; //octal
x = 0x7; //hexa

//ép kiểu
x = 10; 
x = String(x);
x = x.String();










