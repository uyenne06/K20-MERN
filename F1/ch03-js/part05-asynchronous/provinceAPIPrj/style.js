class Http{
    get(url){
        return fetch(url, {
            method: "GET"
        }).then(response => {
            if(response.ok) return response.json();
            else throw new Error(response.statusText);
        });
    }
}

let BASE_URL = "http://provinces.open-api.vn/api/v2";
let http = new Http(); // tạo ra instance

http.get(`${BASE_URL}/p/`).then((province) => {
    console.log("Danh sách thành phố nè");
    console.log(province);
});

class Store{
    getProvinces() {
        let http = new Http(); // tạo ra instance
        return http.get(`${BASE_URL}/p/`);
    }
    getWards(code) {
        let http = new Http(); // tạo ra instance
        return http.get(`${BASE_URL}/p/${code}/?depth=2`).then((province) => {
            return province.wards;
        });
    }
}

class RenderUI {
    renderProvinces(provinces) {
        let content = "";
        provinces.forEach((province) => {
            content += `<option value="${province.code}">${province.name}</option>`;
        });
        document.querySelector("#province").innerHTML = content;
    }
    renderWards(wards) {
        let content = "";
        wards.forEach((ward) => {
            content += `<option value="${ward.code}">${ward.name}</option>`;
        });
        document.querySelector("#ward").innerHTML = content;
    }
    renderAddress({ province, ward, address}) {
        document.querySelector("#information").innerHTML = 
        `<p>${province}, ${ward}, ${address}</p>`;
    }
}

//sự kiện load trang 
document.addEventListener("DOMContentLoaded", event => {
    let store = new Store(); //instance store để đảm nhiệm công việc lấy data
    let renderUI = new RenderUI(); //instance render để đảm nhiệm công việc hiển thị data
    store.getProvinces().then((provinces) => {
        renderUI.renderProvinces((provinces));
        let code = document.querySelector("#province").value;
        return store.getWards(code);
    })
    .then((wards) => {
        renderUI.renderWards(wards);
    });
});

//sự kiện thay đổi province
document.querySelector("#province").addEventListener("change", event => {
    let store = new Store(); //instance store để đảm nhiệm công việc lấy data
    let renderUI = new RenderUI(); //instance render để đảm nhiệm công việc hiển thị data

    let code = document.querySelector("#province").value;
    store.getWards(code).then((wards) => {
        renderUI.renderWards(wards);
    });
});

//submit form 
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    // lấy thông tin trong select
    let province = document.querySelector("#province option:checked").innerHTML;
    let ward = document.querySelector("#ward option:checked").innerHTML;
    let address = document.querySelector("#address").value;
    //hiển thị 
    let renderUI = new RenderUI();
    renderUI.renderAddress({
        province,
        ward,
        address,
    });
});