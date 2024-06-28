import { useEffect, useState } from "react";
import DateBlock from "./DateBlock"

const MAX_CHARACTERS = 500;

const JournalEntry = ( {date, text} : {date: Date, text: String}) => {
  const [shortened, setShortened] = useState('');
  const [sliced, setSliced] = useState(false);

  useEffect(() => {
    if (text.length > MAX_CHARACTERS) {
      setShortened(text.slice(0, 500));
      setSliced(true);
    }
  }, [])
  
  return (
    <div className="rounded-2xl p-4 my-5 bg-slate-300 flex justify-between">
      <div className="flex justify-center w-1/6">
        <div className="mt-3">
          <DateBlock day={date.getDay()} date={date.getDate()}/>
        </div>
      </div>
      <div className="w-5/6 p-1.5 h-fit">
        {sliced ? <p>{`${shortened}...`}</p> : <p>{text}</p>}
      </div>
    </div>
  )
}

export default JournalEntry