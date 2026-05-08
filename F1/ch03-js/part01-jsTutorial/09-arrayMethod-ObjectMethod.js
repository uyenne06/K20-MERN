console.log("11-arrayMethod");
//mảng không nhất thiết cùng kiểu 
let arr1 = [1, 2, "a", { lname: "Huệ", age: 10}, [3, 5]];

//1. length
console.log(arr1.length); //5
console.log(arr1[4][0]); //3

//3. instanceof Array: kiểm tra xem object có phải có tiền thân là Array
console.log(arr1 instanceof Array);//true
console.log(arr1 instanceof Object);//true
console.log(null instanceof Object);//false

//4. toString(): biến mảng thành chuỗi kèm dấu , 
console.log(arr1.toString); //1,2,a,[object Object],3,5

//5. split|join

//II-chèn, xóa phần tử trong mảng 
//array trong js là mutable: method tác động vào object
//không tạo rao object mới mà thường sẽ biến dạn object đó 

//6.push(item): nhét item vào cuối mảng | return độ dài mới 
let workerList = ["Huệ", "Lan", "Trà"];
let result = workerList.push("Cúc");
console.log(workerList, result);// Huệ Lan Trà Cúc 4
//7.pop(): xóa item ở cuối | return phần tử bị xóa 
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.pop();
console.log(workerList, result); //['Huệ', 'Lan'] 'Trà'
//8.unshift(item): nhét item vào đầu mảng | return độ dài mới 
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.unshift("Cúc");
console.log(workerList, result);//['Cúc', 'Huệ', 'Lan','Trà']
//9.shift: xóa item đầu tiên trong mảng | return ra item đó 
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.shift("Cúc");
console.log(workerList, result);//['Lan','Trà'] 'Huệ'

//10. delete array[index]: 
let arr2 = [1,2,'a', 15];
delete arr2[2];
console.log(arr2); //[1,2, empty, 15]

//11. splice(start, sl cần xóa, ...phần tử cần thêm)
//      - return: hàm trả ra mảng các item bị xóa | []
//thêm không xóa 
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 0, "Điệp", "Cường");
console.log(workerList, result);

//xóa không thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1);
console.log(workerList, result);

//vừa xóa vừa thêm
workerList = ["Huệ", "Lan", "Trà"];
result = workerList.splice(1, 1, "Cúc", "Điệp");
console.log(workerList, result);

//12. slice(start, end): cắt 1 đoạn mảng từ start đến end - 1 

//13. concat(...array): nối mảng
//đưa bao nhiêu mảng thì nối bấy nhiêu mảng
workerGirl = ["Huệ", "Lan", "Tân"];
workerBoy = ["Điệp", "Hùng", "Cường"];
workerList = workerGirl.concat(workerBoy, "Hồng", ["Trúc, Tâm"]);

console.log(workerGirl); //9 phần tử 
//

//14. ... spread operator: destructuring | phân rã 
workerList = [...workerGirl, ...workerBoy];

//15. forEach(): lặp mảng 
//cf: (val, key, array)=>{}
arr1 = ["Huệ", "Cúc", "Hồng"];
arr1.forEach((val, key, array)=>{
    console.log(val, key, array);  
});

//16.Map(cf): duyệt từng item và biến đổi từng item theo công thức 
//cf: (val, key, array) => {}
arr1 = [2, 6, 9];
arr1 = arr1.map((item)=>{
    if(item % 2 == 1) return item + 2; 
});

console.log(arr1); //[undefined, undefined, 11]

//hàm không có return là hàm trả ra undefined

//17. filter(cf): trả về mảng các phần tử thỏa điều kiện 
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item)=>{
    return item % 2 == 1;
});

console.log(arr1); //[1, 3, 5]

//18. find(cf): trả về phần tử thỏa điều kiện đầu tiên
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item)=>{
    return item % 2 == 1;
});

console.log(arr1); //1

//19. findIndex(cf): trả về vị trí của phần tử thỏa điều kiện đầu tiên
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.filter((item)=>{
    return item % 2 == 1;
});

console.log(arr1); //0

//20. indexof(val): tìm vị trí của pt val đó

//21. every(cf): giống như All trong DBI
//      tất cả item thỏa hết thì true 
//      có 1 item k thỏa thì false ngay 
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.every((item) => item > 1);
console.log(arr1); //false

//22. some(cf): giống như in trong DBI
//      có 1 item thỏa thì true 
//      tất cả đều k thỏa thì mới false  
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.every((item) => item > 1);
console.log(arr1); //true

//23. includes(val) tìm value có tồn tại trong mảng không 
arr1 = [1, 2, 3, 4, 5];
console.log(arr1.includes(3)); //true

//24. reverse()
arr1 = [1, 2, 3, 4, 5];
arr1 = arr1.reverse();
console.log(arr1);

//25. sort(cf?): sắp xếp
//1. string
arr1 = ["Điệp", "An", "Bảo"];
arr1 = arr1.sort();
console.log(arr1);// ['An', 'Bảo', 'Điệp']

//2. số
arr1 = [1, 3, 20, 100];
arr1 = arr1.sort((a, b) => a - b);
console.log(arr1);

//25. reduce(cf, initalValue)
//map là biến đổi từng item theo công thức chung 
//reduce dồn các item vào 1 value 
arr1 = [1, 3, 20, 100];

let sum = arr1.reduce((total, currentItem) => {
    return total + currentItem;
}, 0);

console.log(sum); //124

let array2 = ["xin chào", "mọi người", "mình là"];
//"<p>xin chào</p><p>"mọi người</p><p>mình là </p>"


//Object-method
//Entry của object có công thức là key: value
//key thì luôn là string hoặc number 
//value: object, number, string, function,..
let worker1 = {
    lname: "Điệp đẹp trai",
    age: 26,
    showInfor(){
        console.log(this.lname + " " + this.age);       
    },
};

worker1.showInfor(); //"Điệp đẹp trai 26"
//thêm thuộc tính 
worker1.point = 10; 
worker1["point"] = 10;
//update thuộc tính 
worker1.lname = "Điệp PiedTeam";
//delete
delete worker1.lname;//k để lại lổ thủng như array
console.log(worker1);

//26. Object.assign() : merg: hợp nhất | ghi đè và thêm mới
let person1 = {
    lname: "Điệp",
    age: 26,
    job: ["Yangho", "coder"],
};

let person2 = {
    lname: "Lan",
    age: 26,
    company: ["PiedTeam"],
};

// let person3 = Object.assign(person1, person2);

// console.log(person1);
// console.log(person3);
// console.log(person1 === person3); //true

//cách tốt hơn 
person3 = { ...person1,  ...person2 };

console.log(person1 == person3); //false
//shallow copy: còn dây mơ rễ má 
person3.job = [...person3.job];//deep copy 

console.log(Object.keys(person3));
console.log(Object.values(person3));

/*
cho mảng array1 = [2,3,1,6] ===> [true, false, false, true]
tạo ra mảng chứa kết quả true, false của mảng đó 
với quy tắc pt chẵn thì true | lẻ thì false
*/
let array1 = [2, 3, 1, 6]








