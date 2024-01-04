import { useEffect, useState } from "react";
import { Head } from "../components/Head";
import { getUpcomingDates } from "../api/dates/dates";
import { SetState } from "../util/types/types";
import { getDetailedMealData } from "../api/meal/meal";

function Meal() {
  const [modalDate, setModalDate] = useState<Date | null>(null);

  return (
    <div className="">
      <DetailsModal date={modalDate} setDate={setModalDate}/>
      <Head/>
      <List setModalDate={setModalDate} />
    </div>
  )
}

function List({setModalDate}: {setModalDate: SetState<Date | null>}) {
  const [dates, setDates] = useState<Date[]>();

  useEffect(() => {
    getUpcomingDates().then(v => setDates(v.dates))
  }, [])

  return (
    <ul className="flex flex-col gap-4 py-4">
      {dates?.map((v, i) =>
        <li className="flex justify-between px-6" key={i}>
          <span className="text-xl">{formatDate(v)}</span>
          <button onClick={() => setModalDate(v)} className="text-xl text-[#00C0CC] font-semibold">查看</button>
        </li>
      )}
    </ul>
  )
}

const formatDate = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`;

function DetailsModal({date, setDate}: {date: Date | null, setDate: SetState<Date | null>}) {
  const [data, setData] = useState<GetMealDetailedResponse>();

  useEffect(() => {
    if (date == null) return;
    getDetailedMealData({date}).then(v => setData(v))
  }, [date]);

  if (date == null) return;
  if (data == null) return;

  return (
    <div className="fixed flex justify-around items-center inset-0 p-6 bg-black/30 backdrop-blur-sm">
      <div className="bg-white flex flex-col justify-center items-center p-6 rounded-3xl shadow-lg border border-zinc-600 gap-5 w-full">
        <h2 className="text-center mb-2 text-3xl font-normal">{formatDate(date)}</h2>
        <div className="flex flex-col text-left w-full">
          <div className="flex w-full gap-2">
            <input className="h-7 w-7 border-[1px] border-black outline-none rounded-lg"/>
            <input className="h-7 w-7 border-[1px] border-black outline-none rounded-lg"/>
            <button className="text-[#00C0CC] font-extrabold text-2xl">新增</button>
          </div>
        </div>
        <div className="flex gap-8">
          <button className="text-[#00C0CC] font-extrabold text-2xl">確定</button>
          <button onClick={() => setDate(null)} className="text-[#E2473D] font-extrabold text-2xl">取消</button>
        </div>
      </div>
    </div>
  );
}

export default Meal;