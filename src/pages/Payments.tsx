import searchIcon from "../assets/pages/payments/search-icon.svg";
import lockedIcon from "../assets/pages/payments/lock/locked.svg";
import unlockedIcon from "../assets/pages/payments/lock/unlocked.svg";
import { DateSelector, Head } from "../components/Head";
import { useEffect, useMemo, useReducer, useState } from "react";
import { SetState } from "../util/types/types";
import { GetPaymentDataResponse, PaymentDataItem } from "../api/payments/schema";
import { Column, TitleColumn } from "../components/Table";
import { getPrice } from "../util/util";
import { getPaymentData, patchPaymentApprove } from "../api/payments/payments";
import { lockOrderingAndPayments } from "../api/dates/dates";

type ApproveFunc = ((userID: number, paid: boolean) => () => Promise<void>);

function Payments() {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [paymentData, setPaymentData] = useState<GetPaymentDataResponse>();

  const filteredData = useMemo<PaymentDataItem[]>(() =>  {
    if (paymentData === undefined) return [];
    return filterBySearchKeyword(searchText, paymentData.data);
  }, [searchText, paymentData]);

  useEffect(()=> {
    if (selectedDate === null) return;
    getPaymentData({date: selectedDate}).then(v => setPaymentData(v));
  }, [selectedDate]);

  function approve(userID: number, paid: boolean) {
    return async () => {
      if (selectedDate === null) return;
      await patchPaymentApprove({userID: userID, date: selectedDate, paid: paid})
      setPaymentData(await getPaymentData({date: selectedDate}));
    }
  }

  async function toggleLock() {
    if (paymentData == undefined) return;
    if (selectedDate == null) return;
    await lockOrderingAndPayments({date: selectedDate, state: !paymentData.locked});
    setPaymentData(await getPaymentData({date: selectedDate}));
  }

  return (
    <div className="flex flex-col w-100 pb-4 gap-4">
      <Head>
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </Head>
      <div className="grid grid-cols-[1fr_1.75rem] w-full px-6 gap-6">
        <SearchBar setValue={setSearchText}/>
        {paymentData !== undefined && <LockButton locked={paymentData.locked} toggleLock={toggleLock}/>}
      </div>
      {paymentData !== undefined && <Table tableData={filteredData} locked={paymentData.locked} approve={approve} />}
    </div>
  )
}

function SearchBar({setValue}: {setValue: SetState<string>}) {
  return (
    <div className="w-full flex justify-center">
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

function LockButton({locked, toggleLock}: {locked: boolean, toggleLock: () => void}) {
  if (locked)
    return (
      <button className="w-7 h-7" onClick={toggleLock}>
        <img src={lockedIcon}/>
      </button>
    )
  else
    return (
      <button className="h-7 w-8" onClick={toggleLock}>
        <img src={unlockedIcon}/>
      </button>
    )
}

function filterBySearchKeyword(keyword: string, tableData: PaymentDataItem[]): PaymentDataItem[] {
  if (tableData === undefined) return [];
  if (keyword === "") return tableData;
  return tableData.filter(v =>
    v.name.includes(keyword) ||
    v.mealName.includes(keyword) ||
    v.lunchBoxType.includes(keyword) ||
    v.seatNumber.toString().includes(keyword)
  )
}

function Table({tableData, locked, approve}: {tableData: PaymentDataItem[], locked: boolean, approve: ApproveFunc}) {
  const titleCells: JSX.Element[] = [];
  const mealNameCells: JSX.Element[] = [];
  const priceCells: JSX.Element[] = [];
  const hasPaidCells: JSX.Element[] = [];

  // TODO: Implement onClick
  tableData.forEach((v, i) => {
    titleCells.push(
      <span className="text-left text-black text-xl font-normal" key={i}>{v.name}</span>
    );
    mealNameCells.push(
      <span className="text-center text-black text-xl font-normal" key={i}>{v.mealName}</span>
    );
    priceCells.push(
      <span className="text-center text-black text-xl font-normal" key={i}>{getPrice(v.lunchBoxType)}元</span>
    );
    hasPaidCells.push(
      <PaymentApproveButton key={i} v={v} locked={locked} approve={approve}/>
    )
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

function PaymentApproveButton({v, locked, approve}: {v: PaymentDataItem, locked: boolean, approve: ApproveFunc}) {
  const oc = (paid: boolean) => approve(v.userID, paid);
  const className = "text-center text-xl font-bold";

  if (locked && v.paid)
    return <button className={`${className} text-gray-400`} disabled={locked}>已繳費</button>
  if (locked && !v.paid)
    return <button className={`${className} text-gray-400`} disabled={locked}>未繳費</button>

  if (v.paid)
    return <button className={`${className} text-[#97D581]`} disabled={locked} onClick={oc(false)}>已繳費</button>
  return <button className={`${className} text-[#00C0CC]`} disabled={locked} onClick={oc(true)}>註記繳費</button>
}

export default Payments;
