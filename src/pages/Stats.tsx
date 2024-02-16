import { useEffect, useState } from "react";
import { GetStatDataResponse, GetStatDetailedDataResponse } from "../api/stats/schema";
import { DateSelector, Head } from "../components/Head";
import { getDetailedStatData, getStatData } from "../api/stats/stats";
import { SetState } from "../util/types/types";
import { Column, TitleColumn } from "../components/Table";

type DetailsData = {
  id: number,
  name: string
} | null;

// Page main component
function Stats() {
  const [statData, setStatData] = useState<GetStatDataResponse>();
  const [detailsData, setDetailsData] = useState<DetailsData>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(()=> {
    if (selectedDate === null) return;
    getStatData({date: selectedDate}).then(v => setStatData(v));
  }, [selectedDate]);

  return (
    <div className="flex flex-col w-100 pb-4 gap-4">
      {/* {detailsData != null && <button onClick={() => setDetailsData(null)}>Modal Placeholder</button>} */}
      <DetailsModal selectedDate={selectedDate} detailsData={detailsData} setDetailsData={setDetailsData}/>
      <Head>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </Head>
      <Table tableData={statData} setDetailsData={setDetailsData}/>
    </div>
  );
}


function Table({tableData, setDetailsData}: {tableData?: GetStatDataResponse, setDetailsData: SetState<DetailsData>}) {
  const titleCells: JSX.Element[] = [];
  const personalBoxCells: JSX.Element[] = [];
  const schoolBoxCells: JSX.Element[] = [];

  // TODO: Implement onClick
  tableData?.forEach((v, i) => {
    titleCells.push(
      <button onClick={() => setDetailsData({id: v.id, name: v.name})} className="text-left text-black text-xl font-normal" key={i}>
        {(v.id + 1).toString() + ". " + v.name}
      </button>
    );
    personalBoxCells.push(
      <button onClick={() => setDetailsData({id: v.id, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.personalBoxCount}人</button>
    );
    schoolBoxCells.push(
      <button onClick={() => setDetailsData({id: v.id, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.schoolBoxCount}人</button>
    );
  });

  return (
    <div className="flex justify justify-between px-8">
      <TitleColumn title="餐項">
        <>{titleCells}</>
      </TitleColumn>
      <Column title="自備餐盒">
        <>{personalBoxCells}</>
      </Column>
      <Column title="學校餐盒">
        <>{schoolBoxCells}</>
      </Column>
    </div>
  );
}

// Details Modal
function DetailsModal({selectedDate, detailsData, setDetailsData}: {selectedDate: Date | null, detailsData: DetailsData, setDetailsData: SetState<DetailsData>}) {
  const [data, setData] = useState<GetStatDetailedDataResponse>();

  useEffect(() => {
    if (detailsData === null) return;
    if (selectedDate === null) return;
    getDetailedStatData({date: selectedDate, mealID: detailsData.id}).then(v => setData(v));
  }, [detailsData]);

  if (detailsData === null) return;

  return (
    <div className="fixed flex justify-around items-center inset-0 p-6 bg-black/30 backdrop-blur-sm">
      <div className="bg-white flex flex-col justify-center items-center p-6 rounded-3xl shadow-lg border border-zinc-600 gap-5 w-full">
        <h2 className="text-center mb-2 text-3xl font-normal">{detailsData.name}</h2>
        <div className="flex flex-col text-left w-full">
          <h3 className="text-left text-neutral-600 text-xl font-bold">自備餐盒</h3>
          <p className="text-left text-2xl">
            {data?.personalLunchBox.map(v => v.toString()).reduce((prev, v) => `${prev}${v}, `, "").slice(0, -2)}
          </p>
          <h3 className="text-left text-neutral-600 text-xl font-bold">學校餐盒</h3>
          <p className="text-left text-2xl">
            {data?.schoolLunchBox.map(v => v.toString()).reduce((prev, v) => `${prev}${v}, `, "").slice(0, -2)} </p>
        </div>
        <button onClick={() => setDetailsData(null)} className="text-[#00C0CC] font-extrabold text-2xl">關閉</button>
      </div>
    </div>
  );
}

export default Stats;
