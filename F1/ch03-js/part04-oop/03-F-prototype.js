//03-F-prototype.js
//trong js người ta thích dùng function hơn là class
//Bên java nếu muốn tạo 1 object
//  em phải thông qua Class + constructor 

//Bên js thì chỉ cần cái constructor

function Car(name, price) {
    this.name = name;
    this.price = price;
}

let audi = new Car("audi", "8 tỷ");

console.log(audi);

let factory = {
    date: 2025,
};

Car.prototype = factory;

let rollroyce = new Car("ror", "40 tỷ");
/*
rollroyce {
    name: "ror"
    price: "40 tỷ"
    [[Prototype]] = factory{
        date: 2025
        [[Prototype]] = object
    }
}
*/
console.log(rollroyce);

//
function Animal(name) {
    this.name = name;
    // prototype == class Animal {
    //     constructor (name) {
    //         this.name = name;
    //         prototype == class Animal {

    //         }
    //     }
    // }
}

console.log(Animal.prototype); //class Animal
console.log(Animal.prototype.constructor == Animal); //true

let congido = new Animal("ahihi");

console.log(congido.__proto__.constructor == Animal); //true
console.log(congido.constructor == Animal); //true

/*
congido {
    name: "ahihi";
    [[Prototype]] : class Animal{
        constructor(name){
            this.name = name
            prototype = class Animal{
                ...
            }
        }
    }
}
*/
let newpet = congido.constructor("Toàn");




