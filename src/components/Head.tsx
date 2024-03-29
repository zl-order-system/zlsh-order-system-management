import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SetState } from "../util/types/types";
import { PageRoutes } from "../util/types/pages";

import leftArrowIcon from "../assets/components/head/left-arrow-thick.svg";
import leftTriangleIcon from "../assets/components/head/left-triangle.svg";
import rightTriangleIcon from "../assets/components/head/right-triangle.svg";
import { formatDatePretty } from "../pages/Meal/util";
import { useQuery } from "@tanstack/react-query";
import { fetchBackendCurry } from "../api/util";
import { z } from "zod";
import ErrorPage from "../pages/Error";

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

export function DateSelector({selectedDate, setSelectedDate}: {selectedDate: Date | null, setSelectedDate: SetState<Date | null>}) {
  const [dateID, setDateID] = useState(0);
  const {data: dates, isError, error} = useQuery({
    queryKey: ["fetchUpcomingDates"],
    queryFn: fetchBackendCurry("/api/admin/upcoming-dates", z.array(z.date()))
  });

  useEffect(() => {
    if (dates === undefined) return;
    setSelectedDate(dates[dateID])
  }, [dates, dateID, setSelectedDate])

  const disabled = selectedDate === null || dates === undefined;

  function nextDate() {
    if (disabled) return;
    if (dateID + 1 >= dates.length) return;
    setDateID(v => v + 1);
  }

  function prevDate() {
    if (disabled) return;
    if (dateID - 1 < 0) return;
    setDateID(v => v - 1);
  }

  let displayDate = "正在獲取日期";
  if (!disabled)
    displayDate = formatDatePretty(selectedDate);

  if (isError) return <ErrorPage error={error}/>

  return (
    <div className="flex w-100 pt-2 px-6 justify-between items-center">
      <button onClick={prevDate}><img src={leftTriangleIcon}/></button>
      <div><span className="text-center text-black text-2xl font-medium">{displayDate}</span></div>
      <button onClick={nextDate}><img src={rightTriangleIcon}/></button>
    </div>
  )
}

// const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日 ${new Intl.DateTimeFormat('zh-TW', { weekday: 'long' }).format(date)}`;
