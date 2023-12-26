import { Link } from "react-router-dom";
import { PageRoutes } from "../types/pages";
import leftArrowIcon from "../assets/components/head/left-arrow-thick.svg";

import leftTriangleIcon from "../assets/components/head/left-triangle.svg";
import rightTriangleIcon from "../assets/components/head/right-triangle.svg";
import { SetState } from "../types/types";

export function Head({children}: {children?: JSX.Element}) {
  return (
    <div className="flex flex-col w-100 gap-2">
      <BackToHome/>
      {children}
      <span className="block h-[1px] w-100 bg-[#A1A1A1]"></span>
    </div>
  )
}


export function BackToHome() {
  return (
    <Link to={PageRoutes.HOME} className="flex gap-2 px-6 w-fit text-black text-2xl font-semibold">
      <img src={leftArrowIcon}/>
      <span className="pt-0.5">回主頁</span>
    </Link>
  )
}

export function DateSelector({selectedDate, setSeletedDate}: {selectedDate: Date, setSeletedDate: SetState<Date>}) {
  return (
    <div className="flex w-100 px-6 pt-2 justify-between items-center">
      <button><img src={leftTriangleIcon}/></button>
      <button><span className="text-center text-black text-2xl font-medium">{formatDate(selectedDate)}</span></button>
      <button><img src={rightTriangleIcon}/></button>
    </div>
  )
}

const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日 ${new Intl.DateTimeFormat('zh-TW', { weekday: 'long' }).format(date)}`;
