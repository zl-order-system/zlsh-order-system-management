import { useEffect, useState } from "react";
import { Head } from "../../components/Head";
import { SetState } from "../../util/types/types";
import { DetailsModal } from "./DetailsModal";
import { formatDatePretty, getDatesInMonthAfterDate } from "./util";

function Meal() {
  const [modalDate, setModalDate] = useState<Date | null>(null);

  return (
    <div className="">
      {modalDate !== null && <DetailsModal date={modalDate} setDate={setModalDate}/>}
      <Head/>
      <List setModalDate={setModalDate} />
    </div>
  )
}

function List({setModalDate}: {setModalDate: SetState<Date | null>}) {
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    setDates(getDatesInMonthAfterDate(new Date()))
  }, [])

  return (
    <ul className="flex flex-col gap-4 py-4">
      {dates.map((v, i) =>
        <li className="flex justify-between px-6" key={i}>
          <span className="text-xl">{formatDatePretty(v)}</span>
          <button onClick={() => setModalDate(v)} className="text-xl text-[#00C0CC] font-semibold">查看</button>
        </li>
      )}
    </ul>
  )
}

export default Meal;
