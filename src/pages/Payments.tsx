import { DateSelector, Head } from "../components/Head";
import searchIcon from "../assets/pages/payments/search-icon.svg";
import { useState } from "react";
import { SetState } from "../types/types";

export function Payments() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col w-100 py-4 gap-4">
      <Head>
        <DateSelector/>
      </Head>
      <SearchBar setValue={setValue}/>
      <p>{value}</p>
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
