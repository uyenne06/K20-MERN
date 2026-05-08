// runtimeError: lỗi diễn ra khi code đang vận hành | do người dùng 
// syntaxError: lỗi sai cú pháp | do người code 
// logicError: lỗi do sai tư duy | do người code 

//tryCatch: dùng để xử lý lỗi phát sinh trong runtimeError
//nhớ rằng tryCatch không vận hành trong syntaxError
//**Try catch chỉ hoạt động trong môi trường đồng bộ mà thôi */

//đồng bộ 
// try {
//     diepPiedTeam;
//     console.log("hello");
// }catch (error) {
//     console.log(error);
// }
// console.log("Xin chào");

//bất đồng bộ 
// try {
//     setTimeout(() => {
//         diepPiedTeam; //lỗi
//     }, 1000);
//     console.log("hello");
// }catch (error) {
//     console.log(error);  
// }
// console.log("Xin chào");

// //
// setTimeout(() => {
//     try {
//         diepPiedTeam; //lỗi
//         console.log("hello");
//     } catch (error) {
//         console.log(error);
//     }
//     console.log("xin chào");
    
// }, 1000);

//cấu trúc của một Error
// try {
//     diepPiedTeam;
//     console.log("hello");
// }catch (error) {
//     console.log(error);
//     console.log(error.name);
//     console.log(error.message);
//     console.log(error.stack);
// }
// //omit (lodash | TS)
// console.log("Xin chào");

// mình có thể điều hướng về catch bằng lệnh throw 
let money = 999999999999999; //15 số 
console.log(money);
try{
    if(money > 99999999999999) throw new RangeError("số quá lớn với sức chứa");
}catch(error){
    console.log(error);   
}

// EvalError():     tạo 1 instance đại diện cho một lỗi xảy ra liên quan đến hàm toàn cục Eval()
// InternalError(): tạo 1 instance đại diện cho một lỗi xảy ra khi 1 lỗi bên trong jsEngine
//                  được ném. vd: quá nhiều đệ quy
// RangeError()   : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến số hoặc tham chiếu
//                  nằm ngoài phạm vi hợp lệ của nó
// ReferenceError : tạo 1 instance đại diện cho một lỗi xảy ra khi hủy tham chiếu của 1 tham chiếu
//                  không hợp lệ
// SyntaxError    : tạo 1 instance đại diện cho một lỗi xảy ra trong khi phân tích cú pháp
//                                                                          mã trong Eval()
// TypeError      : tạo 1 instance đại diện cho một lỗi xảy ra khi một biến hoặc 1 tham số
//                  có kiểu không hợp lệ
// URIError       : tạo 1 instance đại diện cho một lỗi xảy ra khi encodeURI() hoặc decodeURI()
//                  truyền các tham số không hợp lệ

//Finally

//tạo ra một kiểu lỗi mới 
class ErrorWithStatus extends Error {
    constructor({ status, message }){
        super(message);
        this.status = status;
    }
}

try{
    tancong;
}catch(error){
    let respone = new ErrorWithStatus({
        status: 400,
        message: "má mày",
    });
    console.log(respone);
}