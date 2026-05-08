//quản lý sinh viên bằng oop
//function prototype để code oop thay cho class
//cần quản lý sinh viên 
class Student{
    constructor(name, birthday) {
        this.name = name;
        this.birthday = birthday;
        this.id = new Date().toISOString(); //dòng này hay sai, cẩn thận
    }
}
//-----store----------
class Store{
constructor() {}
//getStudent: lấy danh sách students
getStudents () {
    return JSON.parse(localStorage.getItem("students")) || [];
};

add(student) {
    let students = this.getStudents();
    //thêm student vào danh sách
    students.push(student);
    //đẩy danh sách lên lại ls
    localStorage.setItem("students", JSON.stringify(students));
};

//tìm kiếm sinh viên dựa vào mã của sinh viên đó
getStudent(id) {
    let students = this.getStudents();
    return students.find((student) => student.id == id);
};
//remove : xóa sinh viên dựa vào id
getStudent(id) {
    let students = this.getStudents();//lấy danh sách xuống 
    //tìm vị trí của thằng có id cần xóa
    let index = students.findIndex((student) => student.id == id);
    students.splice(index, 1);//xóa thằng cần xóa khi biết vị trí 
    localStorage.setItem("students", JSON.stringify(students)); //lưu lên lại
};
}
//-----renderUI-------
class RenderUI{
constructor() {}
//thêm sinh viên vào giao diện: biến object student thành tr, cất vào tbody
add ({ name, birthday, id }) {
    //biến đổi student thành tr
    let students = new Store().getStudents();
    let newTr = document.createElement("tr");
    newTr.innerHTML = `
        <td>${students.length}</td>
        <td>${name}</td>
        <td>${birthday}</td>
        <td>
            <button class = "btn btn-danger btn-sm btn-remove" data-id=${id}>
            Xóa
            </button>
        </td>
    `;
    //lưu vào máy 
    document.querySelector("tbody").appendChild(newTr);
    //xóa input cho đẹp
    document.querySelector("#name").value = "";
    document.querySelector("#birthday").value = "";
};

alert = function(msg, type) {
    //tạo div thông báo 
    let divAlert = document.createElement("div")
    divAlert.className = `alert alert-${type}`
    divAlert.innerHTML = msg;
    // nhét nó vào #notification
    document.querySelector("#notification").appendChild(divAlert);
    //sau 3s thì mình xóa 
    setTimeout(() => {
        divAlert.remove();
    }, 3000);
};

renderAll () {
    let students = new Store().getStudents();
    //duyệt danh sách students, đi qua từng student biến thành tr
    //nhét vào tbody
    let count = 1;
    let content = students.reduce((total, { name, birthday, id }) => {
        return (
            total + 
            `
            <tr>
            <td>${count++}</td>
                <td>${name}</td>
                <td>${birthday}</td>
                <td>
                    <button class = "btn btn-danger btn-sm btn-remove" data-id="${id}">
                    Xóa
                    </button>
                </td>
            </tr>
            `
        );
    },"");
    document.querySelector("tbody").innerHTML = content;
}
}
//-----Event-----------
// main Event: submit form
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); //chặn sự kiện reset trang
    let store = new Store();
    let renderUI = new RenderUI();
    //lấy dữ liệu từ input để tạo sinh viên mới
    let name = document.querySelector("#name").value;
    let birthday = document.querySelector("#birthday").value;
    let newStudent = new Student(name, birthday);
    //lưu sinh viên mới vào store
    store.add(newStudent);
    //hiển thị sinh viên mới lên bảng
    renderUI.add(newStudent);
    //tạo thông báo "thành công"
    renderUI.alert("Thêm sinh viên thành công", "success");
});

//sự kiện load trang 
document.addEventListener("DOMContentLoaded", (event) => {
    let renderUI = new RenderUI();
    renderUI.renderAll();
});

//sự kiện bấm nút xóa 1 đối tượng bất kỳ 
document.querySelector("tbody").addEventListener("click", (event) => {
    if(event.target.classList.contains("btn-remove")) {
        let idRemove = event.target.dataset.id;
        let store = new Store();
        let renderUI = new RenderUI();
        // let idRemove = event.target.getAttributes("data-id");
        // tìm sinh viên có mã đó (store)
        let student = store.getStudent(idRemove);
        let isConfirmed = confirm(`Bạn có chắc là muốn xóa ${student.name}`);
        if(isConfirmed) {
        // xóa khỏi (store)
        store.remove(idRemove);
        // xóa khỏi UI (renderUI)
        // event.target.parentElement.parentElement.remove();
        renderUI.renderAll();
        // thông báo xóa thành công (renderUI)
        renderUI.alert("Xóa thành công", "danger");
       } 
    }
});