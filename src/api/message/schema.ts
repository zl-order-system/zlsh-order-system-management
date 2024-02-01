type getMessageData_response = {
    connectState : boolean, // 已連動:true 未連動:false
    classNumber : string,
}

type postConnection_request = {
    accessToken : string,
    clasNumber : string
}
type postConnection_respones = {
    state : boolean, // 是否成功向line取得聊天室token
    connectState : boolean, // 已連動:true 未連動:false
    classNumber : string,
}

// 官方文檔 https://notify-bot.line.me/doc/en/