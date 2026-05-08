//02-promise
//promise: lời hứa sẽ diễn ra trong tương lai và tui sẽ làm gì đó
//pending: chờ thực thi lời hứa, chưa có kết quả
//on fulfilled: trạng thái lời hứa thành công, người hứa sẽ resolve("ở lại")
//on rejected: trạng thái thời hứa thất bại, ng hứa sẽ reject ("đi khỏi lớp")
//đủ tgian để thực hiện nó, có kết quả, ai là ng mong đợi cái lời hứa này đến lúc có để ktra

//cú pháp promise
new Promise(function (resolve, reject) {}); //call back function () => {}
//promise nhận callback func
new Promise((resolve, reject) => {});

//mô phỏng lời hứa
//anh ny hứa rằng cuối tháng này sẽ lãnh lương và mang về cho e 5000$
//nếu thành công a mong nhận dc 1 nụ hôn từ em
//nếu thất bại a là thằng "jack con"
// let wallet = prompt("Nhập giá trị vào ví: "); //sếp

// //anh người yêu hứa
// let p1 = new Promise((resolve, reject) => {
//   if (wallet >= 5000) resolve("1 nụ hôn");
//   else reject("Jack con");
// });

// //em ngiu kiểm chứng
// p1.then((value) => {
//   console.log("Em sẽ cho anh " + value);
// }).catch((error) => {
//   console.log("mẹ mày thằng " + error);
// });

//mô phỏng giao tiếp của server
//Frontend: yêu cầu backend cung cấp data (fetchAPI, Axios)
//Backend: nhận yêu cầu, hứa sẽ xử lý
// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({
//       status: 200, //oke
//       data: { fname: "Điệp", age: 22 },
//     });
//   }, 2000);
// });

//Tìm hiểu response(kiện hàng) từ server
//1.server chỉ reject khi mất mạng
//2.nếu em đủ điều kiện nhận data
// resolve({
//      status: 2xx,
//      data: dữ liệu
//})
//3.nếu em k đủ điều kiện nhận data
// resolve({
//      status: 4xx,
//      message: câu chữi
//})

//frontend: đợi kết quả, và đưa ra 2 kịch bản
// p2.then((response) => {
//   if (response.status >= 200 && response.status < 300) {
//     console.log("dữ liệu nè");
//     console.log(response.data);
//   } else if (response.status >= 400) {
//     console.log(response.message);
//   }
// }).catch((error) => {
//   console.log("Server mất kết nối");
// });


//Promise is eager not lazy
let a = 1; 
//cách cùi 
// let p3 = new Promise((resolve, reject) => {
//     a++;
// });

// //cách 1:
// function ahihi() {
//     let p3 = new Promise((resolve, rejected) => {
//         a++;
//     });
//     return p3;
// }

// ahhihi().then().catch();

//cách 2
// let p3 = () => 
//     new Promise((resolve, rejected) => {
//         a++;
//     });
// p3();
// console.log(a);


// cách đảo hướng promise status
// 1 promise thì sẽ chỉ có thể rơi vào 1 trong 3 trạng thái 
// pending | on fulfilled | on rejected
//           resolve        reject
//             then          catch
//***resolve | reject giống return nhưng không dừng lại 
//***return trong then|catch sẽ đưa promise về thành on fulfilled
// let p4 = new Promise((resolve, reject) => {
//     return resolve("ahihi");
//     reject("Lỗi chà bá");
//     console.log("Xin chào mọi người");
// });
// //kiểm chứng
// p4.then((value) => {
//     console.log("Gia trị resolve là " + value);
// }).catch((error) => {
//     console.log("Gia trị reject là " + error);
// });


//***return trong then|catch sẽ đưa promise về thành on fulfilled
// let p4 = new Promise((resolve, reject) => {
//     reject("Lỗi chà bá");
// });
// //kiểm chứng 
// p4.then() 
//   .catch((error) => {
//     console.log(error);
//     //return "Lê Hồ Điệp"; // return new Promise.resolve("Lê Hồ Điệp")
//     throw "Lê Hồ Điệp"; // return new Promise.reject("Lê Hồ Điệp")
//   })
//   .then()
//   .catch();

// Demo server
// frontend: yêu cầu server rằng muốn lấy data Profile(3) và data các Article(2)
// backend: nhận yêu cầu và tạo lời hứa xử lý 
const getProfile = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ fname: "Điệp", age: 22 });
    }, 3000);
});

const getArticle = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(["Báo chí", "Tiểu thuyết"]);
    }, 2000);
});

//frontend: kiểm chứng
//1. muốn lấy cùng lúc 2 thằng này
// getProfile().then((value) => {
//     console.log(value);
// });

// getArticle().then((value) => {
//     console.log(value);
// });

// //2. hệ nguyên nhân kết quả
// getProfile().then((value) => {
//     console.log(value);
//     getArticle().then((value) => {
//         console.log(value);
//     });
// });

// //3.
// getProfile()
//     .then((value) => {
//         console.log(value);
//         return getArticle();
//     })
//     .then((value) => {
//         console.log(value);
//     });

