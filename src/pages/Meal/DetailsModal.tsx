import { useEffect, useState } from "react";
import { getDetailedMealData, patchDetailedMealData } from "../../api/meal/meal"
import trashCanIcon from "../../assets/pages/meal/trash-can.svg"
import { SetState } from "../../util/types/types";
import { formatDate } from "./util";

type WorkingData = [number, MealOption][];

export function DetailsModal({date, setDate}: {date: Date | null, setDate: SetState<Date | null>}) {
  const [data, setData] = useState<GetMealDetailedResponse>();
  const [workingData, setWorkingData] = useState<WorkingData>();
  const [numberField, setNumberField] = useState("");
  const [nameField, setNameField] = useState("");

  useEffect(() => {
    if (date === null) {
      setData(undefined);
      setWorkingData(undefined);
      setNumberField("");
      setNameField("");
      return;
    }
    getDetailedMealData({date}).then(v => {
      setData(v);
      setWorkingData(Array.from(v.options, (value, index) => [index + 1, value]));
      setNumberField((v.options.length + 1).toString())
    });
  }, [date]);

  if (date === null) return;
  if (data === undefined) return;
  if (workingData === undefined) return;

  function addItem() {
    if (workingData === undefined) return;
    if (numberField === "") return;
    const num = parseInt(numberField);
    if (workingData.find(v => v[0] == num)) return;

    setWorkingData([...workingData, [num, {
      name: nameField,
      schoolOnly: false,
    }]]);
    setNumberField(v => (parseInt(v) + 1).toString());
    setNameField("");
  }

  function submit() {
    if (workingData === undefined) return;
    if (date === null) return;
    const options = Array.from(workingData)
      .sort((a, b) => a[0] - b[0])
      .map(([_, v]) => v);
    patchDetailedMealData({options, date});
    setDate(null);
  }

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
          <ItemList workingData={workingData} setWorkingData={setWorkingData}/>
        </div>
        <div className="flex gap-8">
          <button onClick={submit} className="text-[#00C0CC] font-extrabold text-2xl">確定</button>
          <button onClick={() => setDate(null)} className="text-[#E2473D] font-extrabold text-2xl">取消</button>
        </div>
      </div>
    </div>
  );
}

function ItemList({workingData, setWorkingData}: {workingData: WorkingData, setWorkingData: SetState<WorkingData | undefined>}) {

  function removeItem(key: number) {
    return () => {
      if (workingData === undefined) return;
      const newArray = workingData.filter(v => v[0] !== key);
      setWorkingData(newArray);
    }
  }

  function setSchoolOnly(key: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (workingData === undefined) return;

      const newArray: WorkingData = workingData.map(v => v[0] === key ? [key, {
        name: v[1].name,
        schoolOnly: e.target.checked,
      }] : v);
      setWorkingData(newArray);
    }
  }

  return (
    <div className="flex flex-col w-full">
      {workingData?.map(v =>
        <div className="flex w-full justify-between text-2xl" key={v[0]}>
          <div className="flex gap-2">
            <p className="w-4">{v[0]}</p>
            <span>{v[1].name}</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 justify-center items-center text-xl">
              <input className="w-5 h-5" checked={v[1].schoolOnly} onChange={setSchoolOnly(v[0])} type="checkbox"></input>
              <span className="text-lg text-[#565656]">無自備</span>
            </div>
            <button onClick={removeItem(v[0])} className="w-6 h-6"><img src={trashCanIcon}/></button>
          </div>
        </div>
      )}
    </div>
  )
}
