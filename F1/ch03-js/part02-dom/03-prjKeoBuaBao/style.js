const VALUES = [
    { id: "scissors", value: "✌🏻" },
    { id: "rock", value: "✊🏻" },
    { id: "paper", value: "🖐🏻" },
];

//indexPlayer - indexComputer = 1 | -2 => 1
//                              0      => 0
//                             else    => -1
let i = 0;
let handleChange = () => {
    let computer = document.querySelector("#computer");
    computer.innerHTML = VALUES[i].value;
    computer.dataset.id = VALUES[i].id;
    i++;
    if (i == 3){
        i = 0;
    }
};

let interval = setInterval(handleChange, 100);

//chuẩn bị hàm compare để phân biệt thắng thua hòa
//valuePlayer, valueComputer "scissors | rock | paper"
const compare = (idPlayer, idComputer) => {
    //dựa vào value tìm vị trí
    let indexPlayer = VALUES.findIndex((item) => item.id === idPlayer);
    let indexComputer = VALUES.findIndex((item) => item.id === idComputer);
    let check = indexPlayer - indexComputer;
    if (check == 1 || check == 2) return 1; 
    else if (check == 0) return 0; 
    else return -1;
};

let playerItems = document.querySelectorAll(".user");
playerItems.forEach((item)=>{
    item.addEventListener("click", (event) => {
        //1. khi có 1 nút bị click => dừng máy lại 
        clearInterval(interval);
        //2. duyệt danh sách, xóa actived
        playerItems.forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.pointerEvents = "none";
        });
        //3. thêm actived cho thằng vừa nhấn 
        event.target.classList.add("actived");
        //4. lấy id của thằng vừa nhấn và id của máy để so sánh 
        let idPlayer = event.target.id;
        let idComputer = computer.dataset.id;
        let result = compare(idPlayer, idComputer);
        //5. hiển thị kết quả và nút chạy lại 
        let alertDiv = document.createElement("div");
        alertDiv.className = "alert";
        let msg, color;
        if (result == 1){
            msg = "Bạn chỉ thắng được máy";
            color = "success";
        }else if (result == 0){
            msg = "Bạn chỉ bằng con máy thôi";
            color = "warning";
        }else{
            msg = "Bạn còn thua cả con máy";
            color = " danger";
        }
        alertDiv.innerHTML = msg;
        alertDiv.classList.add(`alert-${color}`);
        document.querySelector(".notification").append(alertDiv);
        document.querySelector("#play-again").classList.remove("d-none");
    });
});

//hiển thị nút chơi lại 
document.querySelector("btn-play-again").addEventListener("click", (event) => {
    //1. cho máy chạy lại 
    let interval = setInterval(handleChange, 100);
    //2. xóa actived và khôi phục nhấn 
    playerItems.forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.pointerEvents = "";
        });
    //3. xóa thông báo và nút chơi lại 
    document.querySelector(".notification").innerHTML = "";
    document.querySelector("#play-again").classList.add("d-none");
});
