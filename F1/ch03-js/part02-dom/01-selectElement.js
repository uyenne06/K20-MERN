//liên kết (DOM)| móc 1 biến và 1 node 
//!!! móc 1 đối tượng
let inputName = document.getElementById("name") //live
inputName = document.querySelector(".card") //non-live
//

console.log(inputName);

//!!! lấy nhiều 
let cardList = [...document.getElementsByClassName("card")];//HTMLCollection
cardList = document.querySelectorAll(".card");
console.log(cardList);
cardList.forEach((item) => {
    console.log(item);
});
//HTMLCollection không thể forEach, phải phân rã và tái cấu trúc mảng
//NodeList thì có thể forEach

//kỹ thuật trỏ 
let a = document.querySelector(".card");
console.log(a);
console.log(a.children); //ngon nhưng cần tái cấu trúc mảng
console.log(a.childNodes); //k ngon
console.log(a.parentElement);
console.log(a.nextElementSibling); //tìm ra thằng giống nhưng ở dưới

//tạo mới 1 phần tử và add in giao diện 
let newCard = document.createElement("div");
newCard.className = "card mb-3 p-2";
newCard.classList.add("card", "mb-3", "p-2");
// newCard.textContent = "<p>Tôi là node tạo từ js</p>";
newCard.textContent = "Tôi là node tạo từ js";
newCard.innerHTML = `<h1>Đây là card ảo</h1>
    <p>Không thuộc bài là sống sai tuổi trẻ</p>`

let parentOfCard = document.querySelector("#card-list");
parentOfCard.appendChild(newCard);

//kỹ thuật set attribute
a.setAttribute("data-id", "1");
a.setAttribute("data-name", "Tuấn");
console.log(a.getAttribute("data-id"));
console.log(a.dataset.id);

// a.removeAttribute("data-id");

//hiệu ứng: chuột
let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", (event) => {
    console.log(event); 
    console.log(event.clientX, event.clientY);
    console.log(event.offsetX, event.offsetY);
    console.log(event.target); //đối tượng diễn ra sự kiện

    //dom tới input
    let valueInput = document.querySelector("#name").value;
    //tạo card mới 
    let newCard = document.createElement("div");
    newCard.className = "card mb-2 p-2"
    newCard.innerHTML = `<h1>${valueInput}</h1>`;
    parentOfCard.appendChild(newCard);
    inputName.value = ""; //xóa value sau khi nhét cho đẹp 
});

//dblclick click mouseover mouseout

//sự kiện bàn phím 
let inputNode = document.querySelector("#name");
inputNode.addEventListener("keypress", (event) => {
    console.log(event.target.value);  
});

//keydown keypress keyup|input change
//change: sau khi ngừng focus

//local|cookie
//cookie
//cho phép lưu trữ thông tin người dùng web vào máy tính 
const date = new Date(2025, 11, 28).toString();
document.cookie = `username = diep; expired = ${date}; path=/`;

//khi mà ngta thao tác với cookie thì nta dùng thư viện js.cookie

//localStorage: lưu dữ liệu vào máy của người dùng
localStorage.setItem("name", "Điệp đẹp trai");

//ls chỉ lưu được chuỗi mà thôi 
let profile = {
    name: "Anh Điệp Đẹp Trai",
    age: 26,
};

localStorage.setItem("profile", JSON.stringify(profile));
let result = localStorage.getItem("profile");
let objResult = JSON.parse(result);
console.log(objResult);



