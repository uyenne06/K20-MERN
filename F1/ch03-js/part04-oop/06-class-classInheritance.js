//class là cái khuôn
//bên trong class có constructor, prop, method
//class sẽ dùng constructor function để tạo ra object kèm theo prototype
class User {
    //hàm khởi tạo
    constructor(fullname) {
        [this.fname, this.lname] = fullname.split(" ");
    }
    show(){
        console.log(`firstName của tui là ${this.fname} và lastName là ${this.lname}`);
    }
}

//
let diep = new User("Lê Điệp");
console.log(diep.__proto__ == User.prototype); //true
//khi nhắc đến user thì js luôn xem là constructor kh phải class
console.log(typeof User); //function
console.log(User.prototype); //class user
console.log(User.prototype.constructor == User); //true
//class còn đc gọi là 1 tên 'syntactic sugar' của constructor function
//cú pháp kẹo đg ám chỉ sự dễ dàng trong cách sd và
//thay vì phải thông qua prototype
function Student(fullname) {
    [this.fname, this.lname] = fullname.split(" ");
}
diep = new Student("Lê Điệp"); //class -> cần new
let student = Student("Nguyễn Văn A"); //function | có hoặc k new đều đc

//class mà mình tạo ra là class declaration
//ta cũng có class expression
let User1 = class Ahihi {
    constructor(fullname) {
        [this.fname, this.lname] = fullname.split(" ");
    }
    show(){
        console.log(`firstName của tui là ${this.fname} và lastName là ${this.lname}`);
    }
};
//class sẽ đổi tên từ ahihi thành User1, tên ahihi vẫn xài đc bên trong class
/*Biểu diễn*/
//Hàm chuyên tạo ra class: singleTon
function makeClass() {
    class Ahihi {
    constructor(fullname) {
        [this.fname, this.lname] = fullname.split(" ");
    }
    show(){
        console.log(`firstName của tui là ${this.fname} và lastName là ${this.lname}`);
    }
    };
    return Ahihi;
}
let User3 = makeClass();
let diepp = new User3("Điệp Lê");
//computed Name
let priName = Symbol();
//symbol() tạo ra 1 giá trị duy nhất (1 mã)
//-> giấu thuộc tính
class User5 {
    firstName = "Nguyễn";
    [priName](){
        console.log("Hello");
    }
}
let hue = new User5();
hue[priName](); 
console.log(hue);

//tiếp tục ví dụ
//cảnh giác với this trong class
class Button {
    constructor(value){
        this.value = value;
    }
    click(){
        console.log("giá trị là: " + this.value);
        
    }
}
let btn = new Button("Ahihi");
/*
bt{
    value: "Ahihi"
    [[Prototype]] == class Button{
        contructor{
        }
        click(){}
    }
}
*/
btn.click(); //thật ra là btn.__proto__.click()
// setTimeout(btn.click, 1000); //hiểu là window chạy => uiwndow.value = undefined

// setTimeout(() => {
//     btn.click(); //btn đc gọi sau, gọi hàm chưa hàm btn
// },1000);

//vd2: dùng bind để đưa this vào trong hàm
class Button1 {
    constructor(value){
        this.value = value;
        this.click = this.click.bind(this);
    }
    click(){
        console.log("giá trị là: " + this.value);
        
    }
}
let btnn = new Button1("Ahihi đồ ngốc");
setTimeout(btn.click, 1000);

//vd3: thay thế bằng method arrow
class Button2 {
    constructor(value){
        this.value = value;
    }
    click(){
        console.log("giá trị là: " + this.value);  
    };
}
btn = new Button2("ahihi đồ ngu");
setTimeout(btn.click, 1000);

//Class inheritance: kế thùa thồn qua class
class Animal{
    constructor(name){
        this.name = name;
        this.speed = 0;
    }
    //method
    run(speed){
        this.speed = speed;
        //thông báo
        alert(`${this.name} runs with speed ${this.speed}`);
    }
    //
    stop(){
        this.speed = 0;
        alert(`${this.name} stands still`);
    }
}

let ani = new Animal("My Animal");
/*
ani {
    name: "My Animal",
    speed: 0
    [[Prototype]] == Animal.prototype {
        constructor: function Animal(name){...}
        run: function run(speed){...}
        stop: function stop(){...}
    }
}
*/
class Rabbit extends Animal{
    constructor(name){
        super(name); //new Animal(name)
    }
    //hide
    hide(){
        alert(`${this.name} hides !!!`);
    }
}
let rabbitYellow = new Rabbit("YellowRabbit");
// rabbitYellow.hide(); //YellowrRabbit hide!!!
// rabbitYellow.run(5); //YellowRabbit runs with speed 5
// ani.hide(); //sai 

//trong rabbitYellow có gì
/*
rabbitYellow{
    name: "YellowRabbit",
    speed: 5;
    [[Prototype]] == class Rabbit == Rabbit.protype
}
class Rabbit.__proto__ == Class Animal == Animal.prototype
class Animal.__proto__ == class Object == Object.prototype
class Object.__proto__ == null
*/
class Rabbit1 extends Animal{
    constructor(name){
        super(name); //new Animal(name)
    }
    //hide
    hide(){
        alert(`${this.name} hides !!!`);
    }
    stop(){
        setTimeout(() => {
            super.stop(); //ANimal.prototype.stop.call(this)

        },1000);
    }
}
let rb1 = new Rabbit1("tb Ahihi");
//rb1.stop();
//console.log(rb1);

//class field
class Animal2{
    name = "isAnimal"; //class field
    constructor(){
        console.log(this.name);
    }
}
class Rabbit2 extends Animal2{
    name = "isRabbit"; //class field
}
let ani1 = new Animal2(); 
let rb2 = new Rabbit2();
console.log(ani1);
console.log(rb2);

// luôn sài this.prop = value trong constructor để tạo prop
//class field nó không kế thừa, k vượt mặt, k có tính override
//1 class chỉ chứa class field ko trùng tên
//nếu con và cha cùng có class field giống tên thì nghĩa là 2 cái đó là 1

// 8- static - prop - method
class User2{
    name = "Điệp"; //class field
    static name2 = "Lan"; //obj kh có quyền sài vì static thuộc sở hữu của class
}
let obj1 = new User2();
console.log(obj1.name); //Điệp
console.log(obj1.name2); //undefined
console.log(User2.name2); //undefined

//khác với những ngôn ngữ khác
//static: tĩnh thuộc sỡ hữu của class và nó cho phép xài cùng nhau
//static trong js: tĩnh thuộc sỡ hữu class nhưng chỉ có class mới đc xài

class Article{
    constructor(title, date){
        this.title = title;
        this.date = date;
    }
    show(){
        console.log("Ahihi");
    }
    static compare(articleA, articleB){
        return articleA.date - articleB.date;
    }
}

//tạo mảng chứa các bài báo
let articleArray = [
    new Article("Tuyển dụng nhân viên sang Cam làm lợn", new Date(2025, 2, 4)),
    new Article("Nữ đa cấp ngoại tình ở Đồng Nai", new Date(2025, 0, 6)),
    new Article("Lấy xe của quý nhân bỏ trốn", new Date(2022, 8, 20)),
];

articleArray.sort(Article.compare);
console.log(articleArray);


// 09 - private - property - method.js;
//Access modifier : đây là đại diện của tính đóng gói trong OOP ở js

//trong js chỉ chia ra 2 là Internal và External interface
// Internal interface - phương thức và thuộc tính chỉ có thể được truy cập bên trong các phương thức trong class, không phải từ bên ngoài.
// External interface - phương thức và thuộc tính có thể truy cập được từ ngoài và trong class.
// Trong Javascript, có 2 loại thuộc tính và phương thức:

// Public: có thể truy cập từ bất kỳ đâu. Nghĩa là external interface. Cho đến bây giờ thì chúng ta chỉ sử dụng thuộc tính public
// Private: có thể truy cập bên trong class. Nghĩa là internal interface
// Trong nhiều ngôn ngữ khác thì còn tồn tại trường "protected": chỉ có thể truy cập bên trong class và những class kế thừa.

// Trường Protected không được quy định trong Javascript ở cấp độ ngôn ngữ, những trong thực tế để cho tiện lợi thì chúng ta có thể giả lập để quy ước với nhau.

//ReadOnly
//nếu khai báo get mà k có set, thì nó sẽ thành readOnly, không đổi giá trị đc
//nếu không có set/get thì nó tự tạo , sẽ gán bt
//các dev quy ước tên _ ở trước là private chỉ dùng trong class, nên truy cập bằng get/set
//không nên . tới
//việc quy ước này không đảm bảo được ngôn ngữ, chỉ là quy ước
class CoffeeMachine {
    constructor(power){
        this._power = power;
    }
    get power(){
        return this._power;
    }
}
let cfm = new CoffeeMachine(100); 
//lưu 100 vào _power
//nhưng khi xài thì dùng power 
cfm.power = 50; //nếu chỉ có dùng thế này thì k có gì thay đổi cả | vì accessor này k có set
cfm._power = 50; //mắc dạy, phá bỏ quy ước, xài luôn nè
console.log(cfm.power);

//-------------------------
//sau này thấy bọn lập trình viên khổ quá js tạo ra # để ràng buộc cấp độ ngôn ngữ
class CoffeeMachine1 {
    #waterlimit = 200;
    #fixWaterAmount(value){
        if(value < 0) return 0;
        if(value > this.#waterlimit) return this.#waterlimit;
        return value;
    }
    setWWaterAmount(value){
        this.#waterlimit = this.#fixWaterAmount(value);
    }
}
let cfm1 = new CoffeeMachine1();
cfm1.setWWaterAmount(40);
console.log(cfm1);




