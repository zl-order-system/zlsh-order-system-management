import { BackToHome} from "../components/Head";
import checkIcon from "../assets/pages/message/checkIcon.svg"
import yellowHintIcon from "../assets/pages/message/yellowHint.svg"

const getParams = {
    response_type : "code",
    client_id : "ZEXsnWyahQguoQgdQeXliW",
    redirect_uri : "http://localhost:5173/messages",
    scope : "notify",
    state : "abcd",
}
const lineOAuthURL = `https://notify-bot.line.me/oauth/authorize?response_type=${getParams.response_type}&client_id=${getParams.client_id}&redirect_uri=${getParams.redirect_uri}&scope=${getParams.scope}&state=${getParams.state}`

function Messages(){
    return(
        <div className="py-3.5 flex flex-col gap-[0.75rem]">
            <BackToHome/>
            <div className="px-[1rem]">
                <Hint borderColor={"rgba(212, 167, 44, 0.40)"} bgColor={"#FFF8C5"} icon={yellowHintIcon} text={"尚未與Line群組連動，請依以下步驟進行連動儘速連動"}/>
                {/* <Hint borderColor={"rgba(146,255,171,0.40)"} bgColor={"#CCFFD8"} icon={checkIcon} text={"已與Line群組連動，你將會在已連動群組收到自動訊息"}/> */}
            </div>
            <div className="px-[1rem]">
                {/* 資訊本體 */}
                <NotConnectedBody/>
            </div>
            <span className="bg-[#CCFFD8] border-[rgba(146,255,171,0.40)] bg-[#FFF8C5] border-[rgba(212, 167, 44, 0.40)]"></span>
        </div>
    )
}

function Hint({ borderColor, bgColor, icon, text }){
    return(
        <div className={`bg-[${bgColor}] rounded-[0.75rem] w-full border-[2px] border-[${borderColor}] p-[0.5rem]`}>
            <img src={icon} className="w-[1.4rem] inline mr-[0.5rem] mt-[-5px]" />
            <span className="text-[#1F2328] text-[1.1rem] font-[500]">
                {text}
            </span>
        </div>
    )
}

function ConnectedBody(){
    return(
        <div className="flex flex-row justify-between items-end">
            <div className="text-black text-[1.5rem] font-[700]">訊息設定</div>
            <button className="text-[#0969DA] text-[1rem] font-[500] underline">查看連動教學</button>
        </div>
    )
}
function NotConnectedBody(){
    return(
        <div>
            <div className="text-black text-[1.5rem] font-[700] mb-[0.6rem]">Line自動訊息設定教學</div>
            <div className="w-full bg-[#B6B6B6] h-[1px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] mb-[0.75rem]"></div>
            <div className="flex flex-col gap-[1.9rem]">
                <div className="flex flex-col gap-[0.3rem]">
                    <div className="text-black text-[1.3rem] font-[700]">步驟一：</div>
                    <div className="text-[#1F2328] text-[1.1rem] font-[500]"><div className="w-[2.2rem] h-[1.1rem] inline-block"></div>點擊下方“與Line連動”按鈕，並依指示登入Line帳號，選擇要連動的班級群組，並按“同意並連動”</div>
                    <a href={lineOAuthURL} className="w-[6.2rem] h-[1.8rem] rounded-[0.3rem] border-[2px] border-black text-black text-[1rem] font-[800] text-center">與Line連動</a>
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                    <div className="text-black text-[1.3rem] font-[700]">步驟二：</div>
                    <div className="text-[#1F2328] text-[1.1rem] font-[500]"><div className="w-[2.2rem] h-[1.1rem] inline-block"></div>進入Line APP，將Line Notify帳號邀請至剛才選取的群組，即完成連動</div>
                </div>
            </div>
        </div>
    )
}


export default Messages