import { useEffect, useState } from "react";
import DateBlock from "./DateBlock"

const MAX_CHARACTERS = 500;

const JournalEntry = ( {date, text, title} : {date: string, text: string, title: string}) => {
  const [shortened, setShortened] = useState<string>('');
  const [sliced, setSliced] = useState<boolean>(false);
  const [showingFull, setShowingFull] = useState<boolean>(true);
  const [day, setDay]= useState<number>(0)
  const [localDate, setLocalDate]= useState<number>(0)

  useEffect(() => {
    if (text.length > MAX_CHARACTERS) {
      setShortened(text.slice(0, 500));
      setSliced(true);
      setShowingFull(false);
    }
    const parsedDate: Date = new Date(date);
    setDay(parsedDate.getDay())
    setLocalDate(parsedDate.getDate())
  }, [])

  return (
    <div className="rounded-2xl p-4 my-3 bg-slate-100 shadow-md flex justify-between">
      <div className="flex justify-center w-1/6">
        <div className="my-2">
          <DateBlock day={day} date={localDate}/>
        </div>
      </div>
      <div className="w-5/6 p-1.5 h-fit">
        <p className="font-bold text-lg mb-1">{title}</p>
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