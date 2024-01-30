const domain: string = "http://localhost:5000"
const pages = {
    message : "/messages"
}
async function doRequest(method: "GET" | "POST" | "PUT", url: string, data?:object) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject({ status: xhr.status, statusText: xhr.statusText });
                }
            }
        }
        xhr.send()
    })
}
export async function getMessagesData(){
    return new Promise((resolve, reject) => {
        resolve("data_get")
    })
    return doRequest("GET", domain + pages.message)
}
export async function postMessagesData(data: object){
    // return new Promise((resolve, reject) => {
    //     resolve("data_post")
    // })
    return doRequest("POST", domain + pages.message, data)
}