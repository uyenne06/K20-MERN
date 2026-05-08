//I-Regex là gì ?
// regex hay regular expression | pattern | biểu thức chính quy 
//      mẫy định dạng của chuỗi
//      hơi giống like trong sql
//      regex là 1 object 
//      js thì mình dùng method .test() | thay vì .matches() giống Java
//      regex là chuỗi => là object 

//
let regex1 = /name/i; //ignoreCase, k qtam hoa thường 
console.log(regex1.test("Điệp is my name")); //true
console.log(regex1.test("Điệp is my Name")); //(false) true
console.log(regex1.exec("Điệp is my Name"));
console.log("Điệp is my Name".match(regex1));
console.log("Điệp is my Name".search(regex1));

// replace

//II - Regex metcharacter symbols: phần này nên test ở trang regexr.com
// bắt đầu chuỗi ^asda
// kết thúc chuỗi asda$
// trong chuỗi chỉ có ^asda$

// . : 1 ký tự bất kỳ (ngoại trừ enter)

// * lập lại từ 0 -> n
// + lập lại từ 1 -> n
// ? lập lại từ 0 -> 1
// {start, end}: từ start đến end lần

// [] hoặc \ để thoát chuỗi escape character

//III. Regex Character sets vả Quantifiers
// character set [...]
// except character set [^...]
// set digit [0-9]
// set alpha [A-Z] [a-z] [a-zA-Z]
// gom nhóm () và hoặc |

//Short Hand
//muốn chữ và số \w      \W
//muốn số        \d      \D
//muốn space     \s      \S
//a(?=n) tìm a mà kế bên là n
//a(?!n) tìm a mà kế bên k là n

//Ký tự biên \b
//ký tự biên là gì, và nằm ở đâu trong câu
// ký tự biên nằm giữa cấu trúc
//      ký tự từ + ký tự biên + không phải ký tự từ
//      không phải ký tự từ + ký tự biên + không phải ký tự từ

//vd
/*
\bword\b

new word
words in my letter
sword in my hand
the 'word' is shiet
*/

//tìm từ word và chỉ từ word

// bootstrap form
// HOF: callback currying  closure
// method xử lý mảng

