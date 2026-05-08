/*
cố gắng thao tác api của mockapi (get post put deletes)
style: promise,     class,   fetch
style1: async await class    fetch 
style2: callback    prototype XMLHttpRequest
*/

class Http {
    async send(method, url, body) {
        let response = await fetch(url, {
            method: method,
            headers: {"Content-Type" : "application/json"},
            body: body ? JSON.stringify(body) : null,
        })
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
    }
    //
    get(url){
        return this.send("GET", url, null)
    }
    //
    post(url, body){
        return this.send("POST", url, body)
    }
    //
    put(url, body){
        return this.send("PUT", url, body)
    }
    //
    delete(url, body){
        return this.send("DELETE", url, body)
    }
}

const BASE_URL = "https://6904a7db6b8dabde496493ad.mockapi.io";
let objHttp = new Http();
(async () => {
    try {
        let data = await objHttp
        .delete(`${BASE_URL}/users/3`)
            console.log("dữ liệu");
            console.log(data);
    } catch (error) {
        console.log("Lỗi nè " + error);
    }
})();