// Asynchronous: bất đồng bộ 
// C là ngôn ngữ đơn luồng (single thread)
// js là ngôn ngữ đơn luồng
//      nếu đi cùng web thì nó là đa luồng 
// nodejs(môi trường chạy js) là đơn luồng 

//vd: anh có 2 tác vụ L1(5p) và L2(2p)
//đơn luồng: 7p pipe đb/đợi
//  L1
//  L2

//đa luồng: 5p bđb/k đợi
//  L1(5p)
//  L2(2p)

//L1 và L2 có mối quan hệ nguyên nhân kết quả 
// L1: lấy data từ server(3s)
// L2: hiển thị data lấy được 

//call stack: là cấu trúc hàng đợi dạng ngăn xếp(stack)
//để chứa thông tin lúc code thực thi 
//LIFO: Last in first out: vào sau ra trước 

function a(x){
    console.log(x);
}

function b(y){
    a(x + 2);
}

function c(z){
    b(z + 1);
}

c(5); //log ra bao nhiêu ? //8

//Event Loop và Callback Queue
//trong js có các vùng nào 
// js(call stack, memory heap)
// webAPI(DOM, timeout, AJAX(xmlHttpRequest))
//  event loop: 
//  callback queue

function handle() {
    console.log("command1");
    setTimeout(function ahihi() {
        console.log("command2");
    }, 3000);
    console.log("command3");
}
handle();

//lưu ý bất đồng bộ với try catch
//ôn bài này, các method liên quan tới mảng và chuỗi 
