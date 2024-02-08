import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SetState } from "../util/types/types";
import { PageRoutes } from "../util/types/pages";
import { getUpcomingDates } from "../api/dates/dates";

import leftArrowIcon from "../assets/components/head/left-arrow-thick.svg";
import leftTriangleIcon from "../assets/components/head/left-triangle.svg";
import rightTriangleIcon from "../assets/components/head/right-triangle.svg";

export function Head({children}: {children?: JSX.Element}) {
  return (
    <div className="flex flex-col w-100 pt-3.5">
      <BackToHome/>
      {children}
      <span className="block mt-3 h-[1px] w-100 bg-[#A1A1A1]"></span>
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

export function DateSelector({selectedDate, setSelectedDate}: {selectedDate: Date, setSelectedDate: SetState<Date>}) {
  const [dates, setDates] = useState<Date[]>();
  const [dateID, setDateID] = useState(0);

  useEffect(() => {
    getUpcomingDates().then(v => setDates(v.map(s => new Date(s))));
  }, [])

  useEffect(() => {
    if (dates === undefined) return;
    setSelectedDate(dates[dateID])
  }, [dates, dateID])

  function nextDate() {
    if (dates === undefined) return;
    if (dateID + 1 >= dates.length) return;
    setDateID(v => v + 1);
  }

  function prevDate() {
    if (dates === undefined) return;
    if (dateID - 1 < 0) return;
    setDateID(v => v - 1);
  }

  return (
    <div className="flex w-100 pt-2 px-6 justify-between items-center">
      <button onClick={prevDate}><img src={leftTriangleIcon}/></button>
      <div><span className="text-center text-black text-2xl font-medium">{formatDate(selectedDate)}</span></div>
      <button onClick={nextDate}><img src={rightTriangleIcon}/></button>
    </div>
  )
}

const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日 ${new Intl.DateTimeFormat('zh-TW', { weekday: 'long' }).format(date)}`;
