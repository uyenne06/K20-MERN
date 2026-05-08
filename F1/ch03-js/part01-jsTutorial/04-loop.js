console.log("Bài 5: Vòng lặp - loop");
//reuse: dùng lại           - repeat: lặp lại 
//loop: repeat - function: reuse 
//for | while | do while 
let student1 = { name: "Điệp", point: 10, major: "SE" };
//                    property | entry 
//                    entry = key : value
//Array là object 
let array1 = [21, 17, 19];
//Array là object | con trỏ //{0:21, 1:17, 2:19}
//trong array thì key gọi là index
console.log(student1.name); //Điệp
console.log(student1["name"]); //Điệp
console.log(array1[0]); //21

//các vòng for cơ bản đều sẽ duyệt mảng từ start đến end 

//thường nta dùng các for cải tiến luôn duyệt từ đầu đến cuối
//  iterable: tính khả duyệt 
//for in: duyệt key trong object 
//các vòng for cơ bản đều sẽ duyệt mảng từ start đến end 
student1 = { name: "Điệp", point: 10, major: "SE" };

for(const x in student1){
    console.log(x);
    // console.log(student1[x]); //Điệp 10 SE
}

//SET: tập hợp giá trị loại trùng
let demoSet = new Set(["Điệp", "Huệ", "Lan", "Huệ"]);
//demoSet ["Điệp", "Huệ", "Lan"]
//set thì k có khả năng get, tại vì nó k có index => k có key 
for (const key in demoSet) {
    console.log(x);
} // k có gì in ra cả, vì k có key

//đa phần các object đều sẽ có chiều sâu nhưng lại k có iterable
//tức là các object mình tạo ra thường k có khả năng lặp 
//for of: dùng để duyệt value, nhưng thằng này chỉ chơi với iterable
student1 = { name: "Điệp", point: 10, major: "SE" };
console.log(student1);

// for (const x of student1) {
//     console.log(x);  
// }
//Error : student1 is not iterable

for (const x of demoSet) {
    console.log(x);
}//Điệp Lan Huệ
//vì set là iterable bình thường

// for-each: không phải là cú pháp for, mà nó là method của iterable
["Hùng", "Lan", "Trà"].forEach((value, key) => {
    console.log(key, value + 1);
});
//nếu chỉ xài value thôi thì dc bỏ/ k cần khai báo key
//nhưng nếu chỉ xài key thôi thì vẫn phải giữ lại value 
/*
0 "Hùng1"
1 "Lan1"
2 "Trà1"
*/