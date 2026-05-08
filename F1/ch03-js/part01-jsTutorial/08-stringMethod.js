console.log("Bài 10: Chuỗi - method");

//chuỗi trong js được bọc bằng ' ''
//method trong string

//1. length //prop của string trả ra độ dài 
let str = "ahihi";
console.log(str.length); //5

//2. indexOf(val) //tìm ra vị trí đầu tiên của chuỗi val
console.log(str.indexOf("h")); //1
console.log(str.indexOf("ih")); //2
console.log(str.indexOf("s")); //-1

//tách chuỗi 
//1. slice(start, end) trả ra chuỗi con từ start đến end - 1
let x = "xin chào PiedTeam, mình là Điệp";
let result = x.slice(9, 17); //PiedTeam
//cắt ngược
result = x.slice(-22, -14); //PiedTeam
//cắt 1 parameter
result = x.slice(9); //PiedTeam, mình là Điệp
//cắt 1 parameter ngược
result = x.slice(-12); // mình là Điệp
console.log(x); //"xin chào PiedTeam, mình là Điệp"

//string là immutable: bất cứ thao tác nào lên string đều sẽ
//không làm biến dạng 

//2. subString(start, end) giống slice but k có cắt theo chiều âm 

//3. substr(start, length) cắt từ start độ dài length
            //thằng này k dc dùng nữa !!!
    
//II- các method phổ biến
//1.replace: thay thế chuỗi 
let str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replace("nhiều", "ít");
console.log(str1); //"PiedTeam có ít bạn rất nhiều tiền"

//2. replaceAll: thay thế chuỗi
str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replaceAll("nhiều", "ít");
console.log(str1); //"PiedTeam có ít bạn rất ít tiền"

//3. replace + regex
str1 = "PiedTeam có nhiều bạn rất nhiều tiền";
str1 = str1.replace(/nhiều/g, "ít");
console.log(str1); //"PiedTeam có ít bạn rất ít tiền"

//xóa khoản cách thừa
str1 = "PiedTeam     có    nhiều    bạn     rất     nhiều    tiền";
str1 = str1.replace(/\s+/g, " ").trim();
console.log(str1); //"PiedTeam có nhiều bạn rất nhiều tiền"


//2. chuyển đổi hoa thường .toUpperCase() | .toLowerCase()
//3. concat(): nối chuỗi 
str1 = "xin chào"
str2 = "PiedTeam"
str3 = str1.concat(" ", "mừng bạn đến với", " ", str2);
str3 = str1 + " " + "mừng bạn đến với" + " " + str2;
str3 = `${str1} mừng bạn đến với ${str2}`; //template string 

console.log(str3);

//4. split(token): tách chuỗi thành mảng dựa vào token
// - join(token) : nối mảng thành chuỗi dựa vào token 
str1 = "     xin      chào      PiedTeam      ";
//"xin-chào-pieadTeam"
str1 = str1
    .split(" ")
    .filter((item) => item != "")
    .join("-");
console.log(str1); //"xin-chào-pieadTeam"

//5. so sánh chuỗi == | ===

//6. charAt(pos)
x = "Điệp đẹp trai";
console.log(x.charAt(20));

//7. 
x[2] = "e";//chạy dc, k có gì thay đổi
//String là immutable
