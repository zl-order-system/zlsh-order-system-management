import { useEffect, useState } from "react";
import { GetStatDataResponse, GetStatDetailedDataResponse, zGetStatDataResponse, zGetStatDetailedDataResponse } from "../api/stats/schema";
import { DateSelector, Head } from "../components/Head";
import { SetState } from "../util/types/types";
import { Column, TitleColumn } from "../components/Table";
import { useQuery } from "@tanstack/react-query";
import { fetchBackendWParamsShort, useQueryWParamsShort } from "../api/util";
import { z } from "zod";

type ModalStateOpen = {
  open: true,
  id: number,
  name: string
};
type ModalStateClosed = {
  open: false,
};
type ModalState = ModalStateOpen | ModalStateClosed;

// Page main component
function Stats() {
  const [modalState, setModalState] = useState<ModalState>({open: false});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {data: statData} = useQueryWParamsShort("/api/admin/stats", {
    enabled: selectedDate !== null,
    key: ["fetchStatsData", selectedDate],
    body: {date: selectedDate},
    resSchema: zGetStatDataResponse,
  });

  return (
    <div className="flex flex-col w-100 pb-4 gap-4">
      {selectedDate !== null && modalState.open && <DetailsModal selectedDate={selectedDate} modalState={modalState} setModalState={setModalState}/>}
      <Head>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </Head>
      <Table tableData={statData} setModalState={setModalState}/>
    </div>
  );
}


function Table({tableData, setModalState}: {tableData?: GetStatDataResponse, setModalState: SetState<ModalState>}) {
  const titleCells: JSX.Element[] = [];
  const personalBoxCells: JSX.Element[] = [];
  const schoolBoxCells: JSX.Element[] = [];

  // TODO: Implement onClick
  tableData?.forEach((v, i) => {
    titleCells.push(
      <button onClick={() => setModalState({open: true, id: v.id, name: v.name})} className="text-left text-black text-xl font-normal" key={i}>
        {(v.id + 1).toString() + ". " + v.name}
      </button>
    );
    personalBoxCells.push(
      <button onClick={() => setModalState({open: true, id: v.id, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.personalBoxCount}人</button>
    );
    schoolBoxCells.push(
      <button onClick={() => setModalState({open: true, id: v.id, name: v.name})} className="text-center text-black text-xl font-normal" key={i}>{v.schoolBoxCount}人</button>
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
function DetailsModal({selectedDate, modalState, setModalState}: {selectedDate: Date, modalState: ModalStateOpen, setModalState: SetState<ModalState>}) {
  const {data} = useQueryWParamsShort("/api/admin/stats/detailed", {
    enabled: selectedDate !== null,
    key: ["fetchPaymentsData", selectedDate],
    body: {
      date: selectedDate,
      mealID: modalState.id
    },
    resSchema: zGetStatDetailedDataResponse,
  });

  if (data === undefined) return;

  return (
    <div className="fixed flex justify-around items-center inset-0 p-6 bg-black/30 backdrop-blur-sm">
      <div className="bg-white flex flex-col justify-center items-center p-6 rounded-3xl shadow-lg border border-zinc-600 gap-5 w-full">
        <h2 className="text-center mb-2 text-3xl font-normal">{modalState.name}</h2>
        <div className="flex flex-col text-left w-full">
          <h3 className="text-left text-neutral-600 text-xl font-bold">自備餐盒</h3>
          <p className="text-left text-2xl">
            {data.personalLunchBox.map(v => v.toString()).reduce((prev, v) => `${prev}${v}, `, "").slice(0, -2)}
          </p>
          <h3 className="text-left text-neutral-600 text-xl font-bold">學校餐盒</h3>
          <p className="text-left text-2xl">
            {data.schoolLunchBox.map(v => v.toString()).reduce((prev, v) => `${prev}${v}, `, "").slice(0, -2)} </p>
        </div>
        <button onClick={() => setModalState({open: false})} className="text-[#00C0CC] font-extrabold text-2xl">關閉</button>
      </div>
    </div>
  );
}

export default Stats;
