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
  const [workingData, setWorkingData] = useState<Map<number, MealOption>>();
  const [numberField, setNumberField] = useState("");
  const [nameField, setNameField] = useState("");

  useEffect(() => {
    if (date == null) return;
    getDetailedMealData({date}).then(v => {
      setData(v);
      setWorkingData(new Map(Array.from(v.options, (value, index) => [index + 1, value])));
    });
  }, [date]);

  // useEffect(() => console.log(workingData), [workingData])

  if (date == null) return;
  if (data == null) return;

  function addItem() {
    if (numberField == "") return;
    let num = parseInt(numberField);
    if (workingData?.has(num)) return;
    const map = new Map<number, MealOption>();
    workingData?.forEach((v, k) => map.set(k, v));
    map.set(num, {
      name: nameField,
      schoolOnly: false,
    });
    setNumberField(v => (parseInt(v) + 1).toString());
    setNameField("");
    setWorkingData(map);
  }

  const itemList: JSX.Element[] = [];
  workingData?.forEach((v, k) => itemList.push(
    <div className="flex w-full justify-between text-2xl" key={k}>
      <div className="flex gap-2">
        <p className="w-4">{k}</p>
        <span>{v.name}</span>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 justify-center items-center text-xl">
          <input className="w-5 h-5" type="checkbox"></input>
          <span className="text-lg text-[#565656]">無自備</span>
        </div>
        <button>🗑️</button>
      </div>
    </div>
  ));

  return (
    <div className="fixed flex justify-around items-center inset-0 p-6 bg-black/30 backdrop-blur-sm">
      <div className="bg-white flex flex-col justify-center items-center p-6 rounded-3xl shadow-lg border border-zinc-600 gap-5 w-full">
        <h2 className="text-center mb-2 text-3xl font-normal">{formatDate(date)}</h2>
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <input value={numberField} onChange={e => setNumberField(e.target.value)} type="number" className="h-8 w-8 p-2 border-[1px] border-[#565656] outline-none rounded-lg text-center"/>
              <input value={nameField} onChange={e => setNameField(e.target.value)} className="h-8 w-28 p-2 border-[1px] border-[#565656] outline-none rounded-lg"/>
            </div>
            <button onClick={addItem} className="text-[#00C0CC] font-extrabold text-2xl">新增</button>
          </div>
          <div className="flex flex-col w-full">
            {itemList}
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
