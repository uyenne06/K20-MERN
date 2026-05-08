// Axios là 1 http client hoạt động trong môi trường nodejs và cả trình duyệt 
// axios({
//     method: "GET",
//     url: "https://6904a7db6b8dabde496493ad.mockapi.io/users",
// })
//     .then((response) => {
//         if(response.status >= 200 && response.status <= 300){
//             return response.data
//         } else {
//             throw new Error(response.statusText);
//         }
//     })
//     .then((data) => {
//         console.log("Dữ liệu nè");
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log("Server có lỗi " + error);    
//     });

// axios({
//     method: "POST",
//     url: "https://6904a7db6b8dabde496493ad.mockapi.io/users",
//     data: {
//         name: "Điệp nguyên tử",
//         yob: 2003,
//     },
// })
//     .then((response) => {
//         if(response.status >= 200 && response.status <= 300){
//             return response.data
//         } else {
//             throw new Error(response.statusText);
//         }
//     })
//     .then((data) => {
//         console.log("Dữ liệu nè");
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log("Server có lỗi " + error);    
//     });

//viết tắt 
// axios
//         .post ("https://6904a7db6b8dabde496493ad.mockapi.io/users", {
//         name: "Điệp nguyên tử",
//         yob: 2003,
//     })
//     .then((response) => {
//         if(response.status >= 200 && response.status <= 300){
//             return response.data
//         } else {
//             throw new Error(response.statusText);
//         }
//     })
//     .then((data) => {
//         console.log("Dữ liệu nè");
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log("Server có lỗi " + error);    
//     });


//instance
const instance = axios.create({
    baseURL: "https://6904a7db6b8dabde496493ad.mockapi.io",
    timeout: 10000, //10s thì tự concel request
    header: { "Content-Type" : "application/json" },
});

instance.get("users")
    .then((response) => {
        if(response.status >= 200 && response.status <= 300){
            return response.data
        } else {
            throw new Error(response.statusText);
        }
    })
    .then((data) => {
        console.log("Dữ liệu nè");
        console.log(data);
    })
    .catch((error) => {
        console.log("Server có lỗi " + error);    
    });



