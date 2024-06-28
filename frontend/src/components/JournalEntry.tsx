import { useEffect, useState } from "react";
import DateBlock from "./DateBlock"

const MAX_CHARACTERS = 500;

const JournalEntry = ( {date, text} : {date: Date, text: String}) => {
  const [shortened, setShortened] = useState('');
  const [sliced, setSliced] = useState(false);
  const [showingFull, setShowingFull] = useState(true);

  useEffect(() => {
    if (text.length > MAX_CHARACTERS) {
      setShortened(text.slice(0, 500));
      setSliced(true);
      setShowingFull(false);
    }
  }, [])

  return (
    <div className="rounded-2xl p-4 my-5 bg-slate-100 shadow-md flex justify-between">
      <div className="flex justify-center w-1/6">
        <div className="my-2">
          <DateBlock day={date.getDay()} date={date.getDate()}/>
        </div>
      </div>
      <div className="w-5/6 p-1.5 h-fit">
        {showingFull ? <span>{`${text} `}</span> : <span>{`${shortened}...`}</span> }
        {sliced &&
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setShowingFull((prev) => !prev)}
          >
            {showingFull ? " See Less" : "See More"}
          </button>
        }
      </div>
    </div>
  )
}

export default JournalEntry