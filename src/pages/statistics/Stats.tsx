import { DateSelector, Head } from "../common/Head";

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

// <div className="px-8">
//   <table className="table-auto w-full">
//     <thead>
//       <tr>
//         <th className="text-left">餐項</th>
//         <th className="text-center">自備餐盒</th>
//         <th className="text-center">學校餐盒</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td className="text-left">1.滷肉飯</td>
//         <td className="text-center">5人</td>
//         <td className="text-center">4人</td>
//       </tr>
//       <tr>
//         <td className="text-left">1.水餃</td>
//         <td className="text-center">5人</td>
//         <td className="text-center">4人</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
// <div className="grid grid-cols-3 grid-flow-row w-100 px-8 justify-between">
//   <h3 className="text-lg text-left text-[#565656] font-bold">餐項</h3>
//   <h3 className="text-lg text-center text-[#565656] font-bold">自備餐盒</h3>
//   <h3 className="text-lg text-center text-[#565656] font-bold">學校餐盒</h3>
//   <Option></Option>
// </div>

