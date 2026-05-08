console.log("Bài 2: kiểu dữ liệu, truyền tham trị, truyền tham chiếu");
//I-1 primitive datatype : kiểu dữ liệu nguyên thủy 
/*
    number: số
    string: chuỗi | chữ
    boolean
    null:      giá trị rỗng | biết kiểu nhưng k biết giá trị 
    undefined: giá trị rỗng | không biết kiểu k biết giá trị 
    symbol(ES6)

    null và undefined khác nhau như thế nào ? 
*/
console.log(typeof null); //Object
//nhưng null dc xếp là primitive datatype
//null là ở đầu của cây phả hệ rồi, kh tìm dc tiền thân nữa
// muốn biết null là gì thì mình chứng minh người tạo ra Obj là Obj 
//nhưng null ở đầu, và k có tiền thân => primitive datatype 

//
console.log(typeof undefined);//undefined

//
console.log(null == undefined); //true
console.log(null === undefined); //false
//== : là chỉ so sánh giá trị 
//===: so sánh giá trị và kiểu
console.log(2 == "2"); //true
console.log(2 === "2"); //false

//undefined trong thuộc tính của object 
let hoa = { name: "Hòa", height: 172 };
console.log(hoa.nguoiyeu);//undefined //hoisting

//undefined trong paramater cả funct
function handle1(a, b){
    return b;
}
let c = handle1(2);
console.log(c);//undefined
// nếu hàm không có return thì nghĩa là nó đang return undefined

let str = ""; //chuỗi rỗng
str = null; //obj rỗng

// null và undefined là primitiive datatype nên k có thể '.' vào dc 
// let ahihih = undefined;
// ahihih.ngu; 

//I - 2 Object datatype: là những thằng khác primitive datatype 
//plain object: object siêu phẳng 
let stu = { name: "Hùng" }; //chưa là siêu phẳng đâu 
console.log(stu);

//Array: là cách khai báo nhiều biến, cùng tên, cùng thời điểm
const flowerList = ["Cúc", "Huệ", "Lan", 10];

//regular expression: regex là object 
var regex1 = /m*y/;

console.log(typeof handle1); //Function

console.log(10 / "d"); //NaN
console.log(typeof NaN); //Number
console.log(NaN == Number); //false
console.log("b" + "a" + +"a" + "a"); //banana

//Wrapper Class
var str1 = "ahihi"; // string pool  // literal string, là engine tối ưu, lưu trực tiếp như một primitive value
str1 = new String("ahihi"); // object String
console.log(str1 === "ahihi"); //so sánh giá trị và kiểu
console.log(str1.valueOf() === "ahihi"); //true so sánh lõi, string string
console.log(str1 == "ahihi"); //so sánh giá trị 

//dùng wrapper để ép kiểu 
let year = String(1999); 
//bàn riêng về Boolean

let value = Boolean(1999);
console.log(value); //true

value = Boolean(-0); //số
console.log(value); //false

value = Boolean("0");
console.log(value); //true

value = Boolean("");
console.log(value); //false

value = Boolean(" ");
console.log(value); //true

value = Boolean(null);
console.log(value); //false

value = Boolean({});//obj k có prop
console.log(value); //true

value = Boolean([]);//mảng rỗng
console.log(value); //true

value = Boolean(10 / "d");//NaN
console.log(value); //false

value = Boolean(false);
console.log(value); //false

//falsy: null, undefined, 0, -0, "", false, NaN
//truthy: ngược lại falsy
//      chuỗi khác rỗng, số khác 0, obj đều là true

//1. pass by value: truyền tham trị 
let a = 1; 
b = a; 
b = 2;
console.log(a, b);
//vd2: 
let point = 4; 
//tạo hàm 
function updatePoint(currPoint) {
    currPoint = 10;
}
updatePoint(point);
console.log(point); //4

//2. pass by references
let boyFriend1 = {name: "Toàn", girlSize: "H cub"};
let boyFriend2 = boyFriend1;
boyFriend2.girlSize = "E cub";
console.log(boyFriend1);
// OPERATOR Toán tử
//trong js có 10 loại toán tử
/*
1  Assignment            gán
2  Comparison            so sánh ==  ===
3  Arithmetic            toán hạng
4  bitwase               bitwase
5  logical               logic && ||
6  String                chuỗi
7  Conditional(ternary)  ba ngôi
8  Comma                 phẩy
9  Unary                 một ngôi
10 Relational            Quan hệ
*/
//
// Arithmetic Operator toán tử toán hạng
//  + | - | * | ** | / | % | variable++ | variable-- | ++variable | --variable |
//  không được n++ ++n --n n-- với n là số bất kỳ

// Assignment Operator toán tử gán
//  = | += | -= | *= | **= | /= | %= |
//

// Comparison Operator toán tử so sánh
//  == bằng giá trị là được (không quan tâm kiểu)

console.log(2 == "2");// true so sánh giá trị 
console.log(2 !== "2");//true | means ===
console.log(2 != "2");//false

//toán tử 3 ngôi 
var diep = "Đẹp trai";
var isDepTrai = diep == "Đẹp trai" ? true : false;

// logic
console.log(0 && 1); //0 
//với 0 là false 1 là true 
//Nếu vế trái falsy, trả về vế trái.
//Nếu vế trái truthy, trả về vế phải.
console.log(0 | 1 | 4);//5
console.log(0);//0
console.log(!0);//true
console.log(!"");//true
console.log(!"" && 0 && 1);//0

//
let response; // = await callAPI();
//response: null | giá trị 

!response && console.log("Không có kết nối");















