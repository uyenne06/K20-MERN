//05-prototypeMethod-objWithoutProto.js
//hiện tại _proto_ là cách dùng ko dc phép
//mình phải thay thế bằng 2 hàm khác để truy cập | chỉnh sửa [[Prototype]]
//Object.getPrototype(obj): giúp mình get dc [[Prototype]]
//Object.setPrototype(obj): giúp mình set dc [[Prototype]]
//Object.create(proto, [descriptor]): tạo 1 object rỗng với việc cung cấp proto
//object
let animal = {
  eats: true,
};

console.log(animal.__proto__ == Object.protoype); //true

let rabbitYellow = Object.create(animal);
//{
//  _proto_:animal
//}
rabbitYellow.jumps = true;
console.log(rabbitYellow);
console.log(rabbitYellow.__proto__ == animal); //true
console.log(Object.getPrototypeOf(rabbitYellow) == animal); //true

//giả sử tôi ko muốn rabbitYellow kế thừa animal
//tui muốn rabbitYellow kế thừa object rỗng thì sao ?
//rabitYellow.__proto__ = {}
Object.setPrototypeOf(rabbitYellow, {});

console.log(rabbitYellow);

//tạo tắt
rabbitYellow = Object.create(animal, {
  jumps: { value: true, enumerable: true, configurable: true },
});

//cách để CLONE
//1. spread: ... : clone nhanh nhưng kok clone dc bộ cờ, ko clone dc những thẳng
//enumerable false
let objClone = { ...rabbitYellow };
//2.Object.definedProps: clone dc thuộc tính và bộ cờ | nhưng ko clone dc
//[[Prototype]]
objClone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(rabbitYellow)
);

console.log(Object.getOwnPropertyDescriptors(objClone));

//Clone bằng Create: clone cả prop, bộ cờ, [[Prototype]]
objClone = Object.create(
  rabbitYellow,
  Object.getOwnPropertyDescriptors(rabbitYellow)
);
/*
Như đã thấy thì chúng ta có nhiều cách để quản lý [[Prototype]]. Nhiều cách để làm cùng 1 thứ. Tại sao? Sau đây là nguyên nhân lịch sử

Thuộc tính prototype của constructor function đã có từ xa xưa
Sau đó, vào năm 2012, Object.create xuất hiện trong JS tiêu chuẩn. Nó cung cấp khả năng tạo một object với một prototype được cung cấp, nhưng không cung cấp khả năng get/set nó. Vì thế các trình duyệt thêm một thuộc tính "không thuộc JS tiêu chuẩn" là proto để cho phép người dùng có thể get/set một prototype bất cứ lúc nào.
Sau đó, vào năm 2015, Object.setPrototypeOf và Object.getProtypeOf được thêm vào JS tiêu chuẩn, để thực hiện chức năng tương tự như__proto__.
Tại sao proto bị thay thế bởi các hàm getPrototypeOf/setPrototypeOf? Đây là một câu hỏi thú vị, đòi hỏi chúng ta phải hiểu tại sao proto khá tệ. Đọc thêm để biết câu trả lời. "very plain Object" để hiểu rỏ tại sao nó tệ

Đừng thay đổi [[Prototype]] trên các object đang tồn tại nếu quan tâm đến vấn đề tốc độ Về mặt kỹ thuật, chúng ta có thể get/set [[Prototype]] bất kỳ lúc nào. Nhưng thường thì chúng ta chỉ set một lần khi object khởi tạo và không thay đổi nó nữa: rabbit kế thừa từ animal, và nó sẽ không thay đổi.

Và các Javascript engine được tối ưu hóa cao cho việc này. Thay đổi một prototype "đang hoạt động" với Object.setPrototypeOf hoặc obj.__proto__= là một phép tất rất chậm bởi vì nó phá vỡ sự tối ưu hóa nội bộ cho các hoạt động truy cập đến thuộc tính object. Vì thế tránh sử dụng nó nếu bạn không biết nó làm gì, hoặc tốc độ Javasript không phải là vấn đề bạn quan tâm.
*/

//very plain object - Object siêu phẳng | Base Object
//[[Prototype]]: ko thể là String, chỉ có thể là Class, Object, null
//obj = {}; //gọi là object rỗng
//key = prompt("Nhập key");
//obj[key] = "giá trị bất kỳ";
//console.log(obj);

obj = Object.create(null); //gọi là object siêu phẳng
key = prompt("Nhập key");
obj[key] = "giá trị bất kỳ";
console.log(obj);