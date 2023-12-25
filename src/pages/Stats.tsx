import { DateSelector, Head } from "../components/Head";

function Stats() {
  return (
    <div className="flex flex-col w-100 py-4 gap-4">
      <Head>
        <DateSelector/>
      </Head>
      <Table/>
    </div>
  );
}

function Table() {
  return (
    <div className="flex justify justify-between px-8">
      <TitleColumn>
        <div className="text-center text-black text-xl font-normal">1.滷肉飯</div>
      </TitleColumn>
      <Column title="自備餐盒">
        <div className="text-center text-black text-xl font-normal">5人</div>
      </Column>
      <Column title="學校餐盒">
        <div className="text-center text-black text-xl font-normal">4人</div>
      </Column>
    </div>
  );
}

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
