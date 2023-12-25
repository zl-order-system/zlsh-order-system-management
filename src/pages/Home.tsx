import statisticsIcon from "../assets/pages/home/statistics.svg";
import paymentsIcon from "../assets/pages/home/payments.svg";
import accountsIcon from "../assets/pages/home/accounts.svg";
import messagesIcon from "../assets/pages/home/messages.svg";
import { Link, To } from "react-router-dom";
import { PageRoutes } from "../types/pages";

function Home() {
  return (
    <div className="flex flex-col gap-3 items-center w-full px-4 pt-4">
      <div className="text-black text-4xl font-semibold flex justify-center">訂餐後台管理系統</div>
      <div className="w-full bg-white shadow-md rounded-xl border-[1px] border-[#ACACAC] flex flex-row flex-wrap justify-around py-5">
        <PageLink linkTo={PageRoutes.STATS}>
          <img src={statisticsIcon}/>
          餐項統計
        </PageLink>
        <PageLink linkTo={PageRoutes.PAYMENTS}>
          <img src={paymentsIcon}/>
          繳費註記
        </PageLink>
        <PageLink linkTo={PageRoutes.ACCOUNTS}>
          <img src={accountsIcon}/>
          帳號管理
        </PageLink>
        <PageLink linkTo={PageRoutes.MESSAGES}>
          <img src={messagesIcon}/>
          訊息管理
        </PageLink>
      </div>
    </div>
  );
}

function PageLink({ children, linkTo }: { children: [React.ReactNode, string]; linkTo: To }) {
  return (
    <Link to={linkTo} className="flex flex-col gap-3 py-5 mx-5 items-center">
      <div className="w-32 h-32 rounded-[1.75rem] bg-[#D5EFF9] flex justify-center items-center">{children[0]}</div>
      <div className="text-black text-xl font-semibold text-center">{children[1]}</div>
    </Link>
  );
}

export default Home;
