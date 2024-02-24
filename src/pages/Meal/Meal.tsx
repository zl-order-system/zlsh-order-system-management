import { useEffect, useMemo, useState } from "react";
import { Head } from "../../components/Head";
import { SetState } from "../../util/types/types";
import { DetailsModal } from "./DetailsModal";
import { formatDatePretty, getDatesInMonthAfterDate } from "./util";
import { useQuery } from "@tanstack/react-query";
import { fetchBackendWParams, zodParse } from "../../api/util";
import { MealOption, zGetMealDetailedResponse } from "../../api/schema/meal";

function Meal() {
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const {data: modalData} = useQuery({
    enabled: modalDate !== null,
    queryKey: [],
    queryFn: async function() {
      const response = await fetchBackendWParams("/api/admin/meal/detailed", {modalDate});
      if (response.status === 404)
        return({mutable: true, options: []});
      return zodParse(response, zGetMealDetailedResponse);
    }
  })

  const modalWorkingData = useMemo(() => {
    if (modalData === undefined) return [];
    return modalData.options.map((value, index): [number, MealOption] => [index + 1, value]);
  }, [modalData])

  return (
    <div>
      { modalDate !== null && modalData !== undefined &&
        <DetailsModal date={modalDate} closeModal={() => {}} defaultWorkingData={modalWorkingData} mutable={modalData.mutable} />
      }
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
