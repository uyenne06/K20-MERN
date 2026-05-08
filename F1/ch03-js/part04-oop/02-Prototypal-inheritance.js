//prototypal-inheritance: kế thừa nguyên mẫu (object với nhau)
//[[Prototype]] 
//trong object luôn có một thuộc tính ẩn tên là [[Prototype]]
// có rất nhiều cách để truy cập và sử dụng nó
// một trong những cách phổ biến nhất là 
//thông qua getter và setter của nó (accessor property) có tên __proto__
let longEar = {
    ear: "long",
};

let rabbitPink = {
    jumps: true,
};

let congido = {
    eats: true,
    walk() {
        console.log("Tui chạy bộ nè");
    },
};

congido.__proto__ = rabbitPink;
congido.__proto__.__proto__ = longEar;

// congido > rabbitPink > longEar;
console.log(longEar);
console.log(rabbitPink.ear); //long
console.log(rabbitPink.eats); //undefined
console.log(congido.ear); //long
congido.__proto__.__proto__.ear = "short"; //overide
console.log(congido);

//Lưu ý với __proto__
//trước ES6(2015) không có cách chính thông nào có thể truy cập 
//vào [[Prototype]] được 

//hầu hết các trình duyệt phải thêm vào 1 accessor property có tên 
//__proto__

//đến 2025 thì js vẫn đang loại bỏ __proto__ ra khỏi hệ thống 
//để thay bằng 2 hàm Object.getPrototypeOf() | Object.setPrototypeOf()

//nâng cao 
let student = {
    lname: "Điệp", //value property
    fname: "Lê", //value property
    get fullname() {
        return this.fname + " " + this.lname;
    },

    set fullname(newName) {
        list = newName.split(" ");
        this.lname = list[list.length - 1];
        this.fname = list[0];
    }, //accessor property của fullname
};

let user = {
    isUser: true,
    __proto__: student,
};

user.fullname = "trà long";
console.log(user.fullname);






