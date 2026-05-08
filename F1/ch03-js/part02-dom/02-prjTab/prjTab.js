let btnList = document.querySelectorAll(".navtab-btn");
let tabContent = document.querySelectorAll(".tab-content-item");

btnList.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        //1.duyệt danh sách nút và xóa class actived
        btnList.forEach((_btn) => {
            _btn.classList.remove("actived");
        });
        //2.thêm actived vào nút vừa nhận 
        event.target.classList.add("actived");
        //3.lấy id của nút vừa nhận 
        let id = event.target.id;
        //4.duyệt danh sách tabContent để xóa actived của content
        tabContent.forEach((content) => {
            content.classList.remove("actived");
        });
        //5.tìm tabContent có id giống như id ở (3) và thêm actived
        document
            .querySelector(`.tab-content-item[data-id='${id}']`)
            .classList.add("actived");
    });
});