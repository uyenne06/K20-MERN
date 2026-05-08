document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); //chặn sự kiện reset trang của action
    let name = document.querySelector("#name").value.trim();
    //tạo item từ value để lưu vào database(localStorage)
    let item = {
        id: new Date().toISOString(),
        name,
    };
    //cất item vào localStorage
    addItemToLS(item);
    //hiển thị item lên giao diện
    addItemToUI(item);
});

//getList(): lên ls lấy danh sách về 
const getList = () => {
    return JSON.parse(localStorage.getItem("list")) || [];
};

//addItemToLS(item): hàm nhận vào item cần lưu và mình sẽ lưu vào ls 
const addItemToLS = (item) => {
    let list = getList();
    list.push(item);
    localStorage.setItem("list", JSON.stringify(list));
};

//addItemToUI(item): nhận vào item, và hiển thị nó vào list ui
const addItemToUI = ({ id, name }) => {
    let newCard = document.createElement("div");
    newCard.className = 
        "card mb-3 d-flex flex-row justify-content-between align-items-center p-2";
    newCard.innerHTML = `<span>${name}</span>
            <button class = "btn btn-danger btn-sm btn-remove" data-id="${id}">remove</button>`;
    document.querySelector("#list").appendChild(newCard);
};

//init
const init = () => {
    let list = getList();
    list.forEach((item) => {
        addItemToUI(item);
    });
};
init();

//remove
document.querySelector("#list").addEventListener("click", (event) => {
    if(event.target.classList.contains("btn-remove")) {
        let nameItemRemove = event.target.previousElementSibling.innerHTML;
        let isConfirmed = confirm(
            `Mày có chắc là sẽ không ${nameItemRemove} nữa chứ ?`
        );
        if(isConfirmed) {
            event.target.parentElement.remove();
            //xóa thêm database ls
            removeItemFromLS(event.target.dataset.id);
        }
    }
});

//removeItemFromLS(ItemId)
const removeItemFromLS = (itemId) => {
    let list = getList();
    let indexItem = list.findIndex((item) => item.id === itemId);
    list.splice(indexItem, 1);
    localStorage.setItem("list", JSON.stringify(list));
};

document.querySelector("#btn-remove-all").addEventListener("click", (event) => {
    localStorage.removeItem("list");
    document.querySelector("#list").innerHTML = "";
});

//sự kiện 
document.querySelector("#filter").addEventListener("keyup", (event) => {
    let valueFilter = event.target.value;
    let list = getList();
    let result = list.filter((item) => item.name.includes(valueFilter));
    document.querySelector("#list").innerHTML = "";
    result.forEach((item) => {
        addItemToUI(item);
    });
});