import statisticsIcon from '../../assets/pages/home/statistics.svg'
import paymentsIcon from '../../assets/pages/home/payments.svg'
import accountsIcon from '../../assets/pages/home/accounts.svg'
import messagesIcon from '../../assets/pages/home/messages.svg'


function Home() {
    return (
        <div className="flex flex-col gap-3 items-center w-full px-[1rem] pt-[1rem]">
            <div className="text-black text-4xl font-semibold flex justify-center">訂餐後台管理系統</div>
            <div className="w-full bg-white shadow-md rounded-xl border-[1px] border-[#ACACAC] flex flex-row flex-wrap justify-around py-5">
                <button className="flex flex-col gap-3 py-5 mx-5 items-center">
                    <div className="w-32 h-32 rounded-[1.75rem] bg-[#D5EFF9] flex justify-center items-center">
                        <img src={statisticsIcon}></img>
                    </div>
                    <div className="text-black text-xl font-semibold text-center">餐項統計</div>
                </button>

                <button className="flex flex-col gap-3 py-5 mx-5 items-center">
                    <div className="w-32 h-32 rounded-[1.75rem] bg-[#D5EFF9] flex justify-center items-center">
                        <img src={paymentsIcon}></img>
                    </div>
                    <div className="text-black text-xl font-semibold text-center">繳費註記</div>
                </button>

                <button className="flex flex-col gap-3 py-5 mx-5 items-center">
                    <div className="w-32 h-32 rounded-[1.75rem] bg-[#D5EFF9] flex justify-center items-center">
                        <img src={accountsIcon}></img>
                    </div>
                    <div className="text-black text-xl font-semibold text-center">帳號管理</div>
                </button>
                <button className="flex flex-col gap-3 py-5 mx-5 items-center">
                    <div className="w-32 h-32 rounded-[1.75rem] bg-[#D5EFF9] flex justify-center items-center">
                        <img src={messagesIcon}></img>
                    </div>
                    <div className="text-black text-xl font-semibold text-center">訊息管理</div>
                </button>
            </div>
        </div>
    )
}

export default Home
