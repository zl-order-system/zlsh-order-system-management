import { useEffect, useState } from "react";
import { GetStatDataResponse } from "../api/stats/schema";
import { DateSelector, Head } from "../components/Head";
import { getStatData } from "../api/stats/stats";

function Stats() {
  const [statData, setStatData] = useState<GetStatDataResponse>();

  useEffect(()=> {
    getStatData({date: new Date()}).then(v => setStatData(v));
  }, [])

  return (
    <div className="flex flex-col w-100 py-4 gap-4">
      <Head>
        <DateSelector/>
      </Head>
      <Table tableData={statData}/>
    </div>
  );
}

function Table({tableData}: {tableData?: GetStatDataResponse}) {
  const titleItems: JSX.Element[] = [];
  const personalBoxItems: JSX.Element[] = [];
  const schoolBoxItems: JSX.Element[] = [];

  tableData?.forEach((v, i) => {
    titleItems.push(
      <div className="text-left text-black text-xl font-normal">
        {(i + 1).toString() + ". " + v.name}
      </div>
    );
    personalBoxItems.push(
      <div className="text-center text-black text-xl font-normal">{v.personalBoxCount}人</div>
    );
    schoolBoxItems.push(
      <div className="text-center text-black text-xl font-normal">{v.schoolBoxCount}人</div>
    );
  })

  return (
    <div className="flex justify justify-between px-8">
      <TitleColumn>
        <>{titleItems}</>
      </TitleColumn>
      <Column title="自備餐盒">
        <>{personalBoxItems}</>
      </Column>
      <Column title="學校餐盒">
        <>{schoolBoxItems}</>
      </Column>
    </div>
  );
}

// TODO: Implement popup modal

function TitleColumn({children}: {children?: JSX.Element[] | JSX.Element}) {
  return (
    <div className="flex flex-col text-left gap-2.5">
      <div className="text-neutral-600 text-lg font-bold">餐項</div>
      {children}
    </div>
  )
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
