console.log("14-windowObject");
// windowObject(wo) đại diện cho cửa sổ trình duyệt 
// tất cả các global, function, biến mà tạo bằng var
// đều là prop hoặc method của window object 

// ngay cả dom(document object model) cũng là prop của windowObject
//I-Prop và Method
//1.1 window.innerHeight
console.log(window.innerHeight);
console.log(window.innerWidth);
//1.2 .open(url, target, resize)

// setTimeout(() => {
//     window.open("https://www.facebook.com/", "_blank", "width=500, height=500")
// }, 2000);

//II-window location
console.log(window.location);
console.log(window.navigator);

//trình duyệt cung cấp 3 loại popup
//alert
// alert("ahihi đồ chó");
//
confirm("anh Điệp có đẹp trai k ? ");

//prompt
prompt("Nhập tên của bạn đi: ", "Điệp");


