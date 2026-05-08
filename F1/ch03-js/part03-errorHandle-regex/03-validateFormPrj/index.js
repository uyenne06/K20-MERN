//rule validate (những yêu cầu để công nhậ là validate)
//  email: isRequired, isEmail(@ . regex)
//  name: isRequire, isName(dc phép tiếng Việt, max 50)
//  gender: isRequired
//  country: isRequired
//  password: isRequired, min 8, max 30
//  confirmPassword: isRequired, min 8, max 30, isSame(password)
//  agree: isRequired
const REG_EMAIL =
  /^[a-zA-Z\d\.\-\_]+(\+\d+)?@[a-zA-Z\d\.\-\_]{1,65}\.[a-zA-Z]{1,5}$/;
const REG_NAME =
  /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+((\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)+)?$/;
//bộ 
const isRequire = (value) => (value !== "" ? "" : "That field is required");
const isEmail = (value) => REG_EMAIL.test(value) ? "" : "Email is not validate";
const isName = (value) => (REG_NAME.test(value) ? "" : "Name is not validate");
const min = (num) => (value) => value.length >= num ? "" : `Min is ${num}`;
const max = (num) => (value) => value.length <= num ? "" : `Max is ${num}`;
const isSame = (paramValue, fieldName1, fieldName2) => (value) => 
    paramValue == value ? "" : `${fieldName1} không khớp ${fieldName2}`;

// mô tả node
// ta sẽ mô tả một node thành object để bỏ vào hàm kiểm tra 
/*paramObject{
    value: giá trị của controlNode cần kiểm tra,
    funcs: mảng những hàm mà value cần phải đi qua 
    parentNode: node cha của controlNode
    controlNodes: mảng các controlNode liên quan
}
*/
//mô tả name
// paramObject = {
//     value: document.querySelector("#name").value,
//     funcs: [isRequire, isName],
//     parentNode: document.querySelector("#name").parentElement,
//     controlNodes: [document.querySelector("#name")],
// };

//làm hàm kiểm tra paramObject này và thông báo lỗi nếu cần 
const isValid = (paramObject) => {
    const { value, funcs, parentNode, controlNodes } = paramObject;
    //kiểm tra 
    for(const funcCheck of funcs) {
        let msg = funcCheck(value);
        if(msg) {
            createMsg(parentNode, controlNodes, msg); //hiển thị ra màn hình
            return msg;
        }
    }
    return "";
};

const createMsg = (parentNode, controlNodes, msg) => {
    let divMsg = document.createElement("div");
    divMsg.className = "invalid-feedback";
    divMsg.innerHTML = msg;
    parentNode.appendChild(divMsg);
    //
    controlNodes.forEach((itemInput) => {
        itemInput.classList.add("is-invalid");
    });
};
//hàm xóa msg 
const clearMsg = () => {
    document.querySelectorAll(".invalid-feedback").forEach((item) => {
        item.remove();
    });
    //
    document.querySelectorAll(".is-invalid").forEach((item) => {
        item.classList.remove("is-invalid");
    });
};

//sự kiện chính 
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault(); //nhớ là có () để chặn reset trang
    clearMsg();//dọn sạch thông báo cũ để kiểm tra tiếp
    let emailNode = document.querySelector("#email");
    let nameNode = document.querySelector("#name");
    let genderNode = document.querySelector("#gender");
    let passwordNode = document.querySelector("#password");
    let confirmedPasswordNode = document.querySelector("#confirmedPassword");
    let countryNode = document.querySelector("input[name='country']:checked"); //null
    let agreeNode = document.querySelector("input#agree:checked");
    const msgList = [
        //email
        isValid({
            value: emailNode.value,
            funcs: [isRequire, isEmail],
            parentNode: emailNode.parentElement,
            controlNodes: [emailNode],
        }),
        //name
        isValid({
            value: nameNode.value,
            funcs: [isRequire, isName],
            parentNode: nameNode.parentElement,
            controlNodes: [nameNode],
        }),
        //gender
        isValid({
            value: genderNode.value,
            funcs: [isRequire],
            parentNode: genderNode.parentElement,
            controlNodes: [genderNode],
        }),
        //password
        isValid({
            value: passwordNode.value,
            funcs: [isRequire, min(8), max(30)],
            parentNode: passwordNode.parentElement,
            controlNodes: [passwordNode],
        }),
        //confirmedPassword
        isValid({
            value: confirmedPasswordNode.value,
            funcs: [isRequire, min(8), max(30), isSame(passwordNode.value, "Mật khẩu", "Nhập lại mật khẩu")],
            parentNode: confirmedPasswordNode.parentElement,
            controlNodes: [confirmedPasswordNode],
        }),
        //country
        isValid({
            value: countryNode ? countryNode.value : "",
            funcs: [isRequire],
            parentNode: document.querySelector(".form-check-country").parentElement,
            controlNodes: document.querySelectorAll("input[name='country']"),
        }),
        //agree
        isValid({
            value: agreeNode ? agreeNode.value : "",
            funcs: [isRequire],
            parentNode: document.querySelector("unput#agree").parentElement,
            controlNodes: [document.querySelector("input#agree")],
        }),
    ];

    let isValidForm = msgList.every((item) => item == "");
    if (isValidForm) {
        clearMsg();
        alert("Form is valid");
    }
});

