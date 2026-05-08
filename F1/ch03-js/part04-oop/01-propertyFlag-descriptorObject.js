// PropertyFlag
/*
value: giá trị của property
writable: true cho phép chỉnh sửa value, false k thể thay đổi value
enumerable: true nhìn thấy dc trong vòng lặp | false k thể nhìn, liệt kê trong lặp
configurable: true thì prop có thể cập nhật tất cả các lá cờ 
              false khóa cứng enumerable và configurable 
                    writable chỉ được từ true thành false 
*/
const profile = {
    fname: "Điệp",
    age: 22,
};

//property = key : value 
//bất cứ property nào trong Object cũng đều sở hữu 4 lá cờ (bộ cờ)
//và có tên là propertyDescriptor

//1. cách lấy bộ cờ của 1 prop 
console.log(Object.getOwnPropertyDescriptor(profile, "fname"));
//{value: 'Điệp', writable: true, enumerable: true, configurable: true}

//2.cách định nghĩa mới | thay đổi bộ cờ 
Object.defineProperty(profile, "fname", {
    writable: false,
});
//-- tạo mới prop kèm bộ cờ của nó 
Object.defineProperty(profile, "job", {
    value: "Yangho",
    writable: true,
}); //enumerable: false && configurable: false
profile.fname = "Toàn";//vẫn chạy nhưng k có thay đổi
console.log(profile);

//muốn liệt kê 
for (const key in profile) {
    console.log(key);
}

//3. lấy bộ cờ của toàn bộ prop trong object 
console.log(Object.getOwnPropertyDescriptors(profile));

//4. định nghĩa nhiều prop cùng lúc cho 1 object 
Object.defineProperties(profile, {
    point: {value: 9, writable: true},
    st_id: {value: "SE111", writable: true},
});
console.log(profile);
console.log(Object.getOwnPropertyDescriptors(profile));

//cách nào để clone 1 object với tất cả thông tin 
let objectClone = { ...profile }; //spread
console.log(objectClone);

//cách tốt hơn : định nghĩa 
objectClone = Object.defineProperties(
    {}, //định nghĩa object rỗng
    Object.getOwnPropertyDescriptors(profile) //bằng tất cả mô tả propFlag của profile
);
console.log(Object.getOwnPropertyDescriptors(objectClone));

//Sealing an object globally - niêm phong toàn bộ 1 object
//      những thằng này rất ít dùng trong dự án nhưng cũng rất là nhanh tiện
// Object.preventExtensions(obj)
//      Ngăn cấm thêm thuộc tính mới vào object
//      muốn biết 1 object có đang preventExtensions không  ta dùng Object.isExtensible(object)

// Object.seal(obj)
//      Ngăn cấm thêm mới/xóa thuộc tính object
//      set configurable : false cho tất cả các prop
//      muốn biết 1 object có đang seal không  ta dùng Object.isSealed(object)

// Object.freeze(obj)
//      Ngăn cấm thêm mới/xóa/thay đổi thuộc tính object
//      set configurable : false và writable: false cho tất cả các pro
//      muốn biết 1 object có đang freeze không  ta dùng Object.isFrozen(object)

//--------------------------
// trong Object có 2 loại property
// value property | accessor property 
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

console.log(student);
console.log(student.fullname);
student.fullname = "Trà Long";
console.log(student);

//propFlag: 
//value    prop: {value, writable, enumerable, configurable}
//accessor prop: {get  , set     , enumerable, configurable}

