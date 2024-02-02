import { BackToHome} from "../components/Head";
import checkIcon from "../assets/pages/message/checkIcon.svg"
import yellowHintIcon from "../assets/pages/message/yellowHint.svg"
import Loader from "../components/loader/Loader";
import {useEffect, useState } from "react";
import { getMessagesData, postMessagesData } from "../api/request";

const getParams = {
    response_type : "code",
    client_id : "ZEXsnWyahQguoQgdQeXliW",
    redirect_uri : "http://localhost:5173/messages",
    scope : "notify",
    state : "abcd",
}
const lineOAuthURL: string = `https://notify-bot.line.me/oauth/authorize?response_type=${getParams.response_type}&client_id=${getParams.client_id}&redirect_uri=${getParams.redirect_uri}&scope=${getParams.scope}&state=${getParams.state}`

const pageURL: URL = new URL(window.location.href)
const haveCode: boolean = pageURL.searchParams.get("code") != null ? true : false


function Messages() {
    const [messageData, setMessageData] = useState(null)
    const [componentsState, setComponentsState] = useState({
        loaderState : "hidden"
    })
    const [toggleBtnState, settoggleBtnState] = useState(true)
    const btnToggle = () => { settoggleBtnState( toggleBtnState? false: true ) }
    useEffect(()=>{
        if( haveCode ){
            setMessageData(true)
            history.pushState(null, "", pageURL.pathname)
            setComponentsState(prevState => ({ ...prevState, loaderState: 'block'}))
            postMessagesData({}).then(() => {
                location.reload()
            })
        }else{
            getMessagesData().then((res) => {
                setMessageData(res)
            })
        }
    }, [])
    if (messageData == null) return <Loader state={"open"}/>
    return(
        <div className="py-3.5 flex flex-col gap-[0.75rem]">
            <BackToHome/>
            <div className="px-[1rem]">
                { messageData["connectState"] &&  <HintConnected/>}
                { messageData["connectState"] || <HintUnconnected/> }
            </div>
            <div className="px-[1rem]">
                { messageData["connectState"] && toggleBtnState &&  <ConnectedBody toggleBtnState={toggleBtnState} btnToggle={btnToggle}/> }
                { messageData["connectState"] && toggleBtnState || <NotConnectedBody messageData={messageData} btnToggle={btnToggle}/> }
            </div>
            <FullScreenLoading componentsState={componentsState.loaderState}>
                <>連動中，請稍候</>
            </FullScreenLoading>
        </div>
    )
}

const HintConnected = () => <Hint borderColor={"rgba(146,255,171,0.40)"} bgColor={"#CCFFD8"} icon={checkIcon}>已與Line群組連動，你將會在已連動群組收到自動訊息</Hint>
const HintUnconnected = () => <Hint borderColor={"rgba(212,167,44,0.40)"} bgColor={"#FFF8C5"} icon={yellowHintIcon}>尚未與Line群組連動，請依以下步驟進行連動儘速連動</Hint>

function Hint({ borderColor, bgColor, icon, children }: { borderColor: string, bgColor: string, icon: string, children: string }){
    <span className="tailwind-placeholder bg-[#CCFFD8] border-[rgba(146,255,171,0.40)] bg-[#FFF8C5] border-[rgba(212,167,44,0.40)]"></span>
    return (
        <div className={`bg-[${bgColor}] rounded-[0.75rem] w-full border-[2px] border-[${borderColor}] p-[0.5rem]`}>
            <img src={icon} className="w-[1.4rem] inline mr-[0.5rem] mt-[-5px]"/>
            <span className="text-[#1F2328] text-[1.1rem] font-[500]">{children}</span>
        </div>
    )
}

function FullScreenLoading({componentsState, children} : {componentsState: string, children: JSX.Element}) {
    return (
        <div className={componentsState}>
            <div className="fixed w-full h-full bg-[#b2b2b2] opacity-70 top-0 left-0"></div>
            <div className={`fixed top-[50%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%]`}>
                <Loader />
                <div className="text-[#1F2328] text-[1.1rem] font-[500] translate-y-[65px]">{children}</div>
            </div>
        </div>
    )
}
function ConnectedBody({toggleBtnState, btnToggle}: {toggleBtnState: boolean, btnToggle: Function}){
    return (
        <div className="flex flex-row justify-between items-end">
            <div className="text-black text-[1.5rem] font-[700]">訊息設定</div>
            { toggleBtnState && <button className="text-[#0969DA] text-[1rem] font-[500] underline" onClick={btnToggle}>查看連動教學</button> }
        </div>
    )
}

function NotConnectedBody({messageData, btnToggle, toggleBtnState}: {messageData: object, btnToggle: Function, toggleBtnState: boolean}){
    return (
        <Tut.body title="Line自動訊息設定教學" messageData={messageData} btnToggle={btnToggle} toggleBtnState={toggleBtnState}>
            <Tut.div title="步驟一：">
                <Tut.p>
                    點擊下方“與Line連動”按鈕，並依指示登入Line帳號，選擇要連動的班級群組，並按“同意並連動”
                </Tut.p>
                <Tut.oAuthBtn/>
                { messageData["connectState"] && <div className="text-[#1F2328] text-[0.9rem] font-[500]">* 你已連動Line訊息，如需更改資料請重新進行</div> }
            </Tut.div>
            <Tut.div title="步驟二：">
                <Tut.p>
                    進入Line APP，將Line Notify帳號邀請至剛才選取的群組，即完成連動
                </Tut.p>
            </Tut.div>
        </Tut.body>
    )
}

const Tut = {
    body: ({children, title, messageData, btnToggle, toggleBtnState}: {children: JSX.Element[] | JSX.Element, title: string, messageData: object, btnToggle: Function, toggleBtnState: boolean}) => (
        <div>
            <div className="flex flex-row justify-between">
                <div className="text-black text-[1.5rem] font-[700] mb-[0.6rem]">{title}</div>
                { messageData["connectState"] && !toggleBtnState &&  <button className="text-[#0969DA] text-[1rem] font-[500] underline" onClick={btnToggle}>查看訊息設定</button>}
            </div>
            <div className="w-full bg-[#B6B6B6] h-[1px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] mb-[0.75rem]"></div>
            <div className="flex flex-col gap-[1.9rem]">
                {children}
            </div>
        </div>
    ),
    div: ({children, title}: {children: JSX.Element[] | JSX.Element, title: string}) => (
        <div className="flex flex-col gap-[0.3rem]">
            <div className="text-black text-[1.3rem] font-[700]">
                {title}
            </div>
            {children}
        </div>
    ),
    p: ({children}: {children: string}) => (
        <div className="text-[#1F2328] text-[1.1rem] font-[500]">
            {/* <div className="w-[2.2rem] h-[1.1rem] inline-block"></div> */}
            {children}
        </div>
    ),
    oAuthBtn: () => <a href={lineOAuthURL} className="w-[6.2rem] h-[1.8rem] rounded-[0.3rem] border-[2px] border-black text-black text-[1rem] font-[800] text-center">與Line連動</a>
}

export default Messages
