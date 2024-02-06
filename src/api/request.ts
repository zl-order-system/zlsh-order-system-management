const domain: string = "http://localhost:5000"
const pages = {
    message : "/messages"
}
async function doRequest(method: "GET" | "POST" | "PUT", url: string, _data?:object) {
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
    return new Promise((resolve, _reject) => {
        resolve({
            "connectState" : true,
            "classNumber" : "109"
        })
    })
    return doRequest("GET", domain + pages.message)
}
export async function postMessagesData(data: object){
    return new Promise((resolve, _reject) => {
        resolve({
            "state" : true, // 是否成功向line取得聊天室token
            "connectState" : true, // 已連動:true 未連動:false
            "classNumber" : "109"
        })
    })
    return doRequest("POST", domain + pages.message, data)
}
