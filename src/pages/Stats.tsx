import { useEffect, useState } from "react";
import { GetStatDataResponse, GetStatDetailedDataResponse } from "../api/stats/schema";
import { DateSelector, Head } from "../components/Head";
import { getDetailedStatData, getStatData } from "../api/stats/stats";
import { SetState } from "../types/types";
import { Dialog } from "@headlessui/react";

type DetailsData = {
  id: number,
  name: string
} | null

function Stats() {
  const [statData, setStatData] = useState<GetStatDataResponse>();
  const [detailsData, setDetailsData] = useState<DetailsData>(null);

  useEffect(()=> {
    getStatData({date: new Date()}).then(v => setStatData(v));
  }, []);

  return (
    <div className="flex flex-col w-100 py-4 gap-4">
      {/* {detailsData != null && <button onClick={() => setDetailsData(null)}>Modal Placeholder</button>} */}
      <DetailsModal detailsData={detailsData} setDetailsData={setDetailsData}></DetailsModal>
      <Head>
        <DateSelector/>
      </Head>
      <Table tableData={statData} setDetailsData={setDetailsData}/>
    </div>
  );
}

function Table({tableData, setDetailsData}: {tableData?: GetStatDataResponse, setDetailsData: SetState<DetailsData>}) {
  const titleCells: JSX.Element[] = [];
  const personalBoxCells: JSX.Element[] = [];
  const schoolBoxCells: JSX.Element[] = [];

  // TODO: Inplement onClick
  tableData?.forEach((v, i) => {
    titleCells.push(
      <button onClick={() => setDetailsData({id: i, name: v.name})} className="text-left text-black text-xl font-normal" key={i}>
        {(i + 1).toString() + ". " + v.name}
      </button>
    );
    personalBoxCells.push(
      <button onClick={() => setDetailsData({id: i, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.personalBoxCount}人</button>
    );
    schoolBoxCells.push(
      <button onClick={() => setDetailsData({id: i, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.schoolBoxCount}人</button>
    );
  });

  return (
    <div className="flex justify justify-between px-8">
      <TitleColumn>
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

function DetailsModal({detailsData, setDetailsData}: {detailsData: DetailsData, setDetailsData: SetState<DetailsData>}) {
  const [data, setData] = useState<GetStatDetailedDataResponse>();

  useEffect(() => {
    if (detailsData == null) return;
    getDetailedStatData({date: new Date(), mealID: detailsData.id}).then(v => setData(v));
    console.log("hi");
  }, [detailsData]);

  if (detailsData == null) return;

  return (
    <Dialog open={detailsData != null} onClose={() => setDetailsData(null)}>
      <Dialog.Panel>
        <Dialog.Title>{detailsData.id + 1}. {detailsData?.name}</Dialog.Title>
        <p>{data?.personalLunchBox.map(v => v + ", ")}</p>
        <p>{data?.schoolLunchBox.map(v => v + ", ")}</p>
      </Dialog.Panel>
    </Dialog>
  );
}

function TitleColumn({children}: {children?: JSX.Element[] | JSX.Element}) {
  return (
    <div className="flex flex-col text-left gap-2.5">
      <div className="text-neutral-600 text-lg font-bold">餐項</div>
      {children}
    </div>
  );
}

function Column({children, title}: {children?: JSX.Element[] | JSX.Element, title: string}) {
  return (
    <div className="flex flex-col text-center gap-2.5">
      <div className="text-neutral-600 text-lg font-bold">{title}</div>
      {children}
    </div>
  )
}

export default Stats;
