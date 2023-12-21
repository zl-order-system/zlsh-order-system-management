import { Link } from "react-router-dom";
import { PageRoutes } from "../pages";
import leftArrowIcon from "../../assets/pages/common/left-arrow-thick.svg";

import leftTriangleIcon from "../../assets/pages/common/left-triangle.svg";
import rightTriangleIcon from "../../assets/pages/common/right-triangle.svg";

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

export function DateSelector() {
  return (
    <div className="flex w-100 px-6 pt-2 justify-between items-center">
      <button><img src={leftTriangleIcon}/></button>
      <button><span className="text-center text-black text-2xl font-medium">8月29日 星期四</span></button>
      <button><img src={rightTriangleIcon}/></button>
    </div>
  )
}

