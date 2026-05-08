// Async + await
//ngày xưa người ta dùng callback để xử lý bất đồng bộ, dẫn đến callback hell
//ES6: ngta dùng promise 
//ES7: async await dùng để kết hợp với promise 
//          giúp cú pháp "kiểm chứng" dễ hiểu hơn 

// Async function: hàm trả ra promise

function handle(){
    return new Promise((resolve, reject) => {
        resolve("ahihi");
    });
}

async function handle(){
    return "ahihi";
}

handle().then().catch();


//await giúp em đợi promise qua trạng thái pending
//  await chỉ xài được khi ở trong async function thôi 
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

//1. thằng này xong, thì mới được tới thằng kia 
// async function getData() {
//     let profile = await getProfile();
//     console.log(profile);
//     let article = await getArticle();
//     console.log(article);
// }
// getData();

//2. mạnh ai nấy đi 
// async function getData() {
//     let [profile, article] = await Promise.all([getProfile(), getArticle()]);
//     console.log(profile, article);
// }

// getData();

// let p4 = () =>
//     new Promise((resolve, reject) => {
//     reject("Lỗi chà bá");
// });

// async function handle1() {
//     let data = await p4();
// }

// (async () => {
//     try {
//         await handle1();
//     } catch (error) {
//         console.log("lỗi là: " + error);
//     }
// })();

// //cách viết tốt hơn
// async function handle1() {
//     try {
//         let data = await p4();
//     } catch (error) {
//         throw error;
//     }
// }

// handle1().catch((error) => {
//     console.log("Lỗi nè: " + error);
// });

//không được dùng toán tử đồng bộ trong asyn await 
let x = 0;

let handle4 = async() => {
    x += 1;
    console.log(x);
    return 5; //return Promise.resolve(5)
};

let handle5 = async () => {
    let tmp = await handle4();
    x += tmp;
    console.log(x);
};

handle5();