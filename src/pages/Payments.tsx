import { DateSelector, Head } from "../components/Head";
import searchIcon from "../assets/pages/payments/search-icon.svg";
import { useEffect, useState } from "react";
import { SetState } from "../util/types/types";
import { GetPaymentDataResponse } from "../api/payments/schema";
import { Column, TitleColumn } from "../components/Table";
import { getPrice } from "../util/util";
import { getPaymentData } from "../api/payments/payments";

export function Payments() {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [paymentData, setPaymentData] = useState<GetPaymentDataResponse>();

  useEffect(()=> {
    getPaymentData({date: selectedDate}).then(v => setPaymentData(v));
  }, [selectedDate]);

  return (
    <div className="flex flex-col w-100 py-4 gap-4">
      <Head>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSeletedDate}/>
      </Head>
      <SearchBar setValue={setSearchText}/>
      <p>{searchText}</p>
      <Table tableData={paymentData}/>
    </div>
  )
}

function SearchBar({setValue}: {setValue: SetState<string>}) {
  return (
    <div className="w-full px-6 flex justify-center">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="使用座號或名字查詢"
          onChange={e => setValue(e.target.value)}
          className="bg-[#DBDBDB] text-black placeholder:text-neutral-500 focus:outline-none rounded-full pl-9 pr-3 py-1.5 w-full text-sm"
        />
        <div className="absolute top-0 left-2.5 grid place-content-center h-full"><img src={searchIcon}/></div>
      </div>
    </div>
  )
}

function Table({tableData}: {tableData?: GetPaymentDataResponse}) {
  const titleCells: JSX.Element[] = [];
  const mealNameCells: JSX.Element[] = [];
  const priceCells: JSX.Element[] = [];
  const hasPaidCells: JSX.Element[] = [];

  // TODO: Inplement onClick
  tableData?.forEach((v, i) => {
    titleCells.push(
      <span className="text-left text-black text-xl font-normal" key={i}>{v.name}</span>
    );
    mealNameCells.push(
      <span className="text-center text-black text-xl font-normal" key={i}>{v.mealName}</span>
    );
    priceCells.push(
      <span className="text-center text-black text-xl font-normal" key={i}>{getPrice(v.lunchBox)}元</span>
    );

    if (v.paid) hasPaidCells.push(
      <span className="text-center text-neutral-400 text-xl font-bold" key={i}>已繳費</span>
    );
    else hasPaidCells.push(
      <button className="text-center text-[#00C0CC] text-xl font-bold" key={i}>註記繳費</button>
    );
  });

  return (
    <div className="flex justify justify-between px-8">
      <TitleColumn>
        <>{titleCells}</>
      </TitleColumn>
      <Column>
        <>{mealNameCells}</>
      </Column>
      <Column>
        <>{priceCells}</>
      </Column>
      <Column>
        <>{hasPaidCells}</>
      </Column>
    </div>
  );
}
