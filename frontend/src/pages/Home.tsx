import React, { useEffect, useState } from "react";
import ButtonEmoji from "../components/ButtonEmoji";
import '../utils/calendar.css';
import Calendar from "react-calendar";

// Example data
const initialFeelings: { [key: string]: string } = {
  '28/6/2024': 'happy',
  '27/6/2024': 'sad',
  '26/6/2024': 'happy',
};

const feelingEmoji: { [key: string]: string } = {
  'happy': '😊',
  'neutral': '😐',
  'sad': '😕',
  'angry': '😡',
  'worried': '😰',
  'laughing': '😂',
};

const Home: React.FC = () => {
  const [emoji, setEmoji] = useState<string>("");
  const [feelings] = useState(initialFeelings); // Use example data here
  const handleChosenEmoji = (emoji: string) => {
    console.log("mekii");
    setEmoji(emoji);
  };

  useEffect(() => {
    console.log(emoji);
  }, [emoji]);

  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = date.toLocaleDateString();

    // If the date is in the feelings object, return the emoji
    // otherwise return the date
    if (feelings[dateKey] !== undefined) {
      return <p className="text-3xl">{feelingEmoji[feelings[dateKey]]}</p>;
    } else {
      return <p className="text-xl font-light">{date.getDate()}</p>;
    }
  };

  // const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;


  // const tileDisabled = ({ date }: { date: Date }) => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   return date < today;
  // };

  return (
    <div className="p-20 border-2 h-screen">
      <h1 className="text-4xl">Mood Calender</h1>
      <div className="h-[65%] mt-[3%] w-[90%]">
        <div className="flex h-full">
          <div className="w-[70%] flex justify-center items-center mr-[1.5%] rounded-2xl bg-indigo-50 shadow-md">
            <div>
              {/* Make it disabled for yesterday and above */}
              <Calendar
                className="p-5"
                tileContent={tileContent}
              />
            </div>
          </div>

          <div className="w-[30%] flex flex-col justify-center items-center gap-y-[3%]">
            <div className="flex-1 w-full flex flex-col rounded-2xl items-center bg-green-50 shadow-md">
              <div className="w-full h-[25%] self flex justify-center pt-[7%]">
                <div className="text-lg font-semibold">
                  How are you feeling today?
                </div>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-x-5 space-y-3 w-full h-3/4 justify-center items-center pb-4">
                {Object.keys(feelingEmoji).map((key) => (
                  <ButtonEmoji
                    key={key}
                    emoji={feelingEmoji[key]}
                    onClick={() => handleChosenEmoji(key)}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 w-full flex rounded-2xl justify-center items-center bg-yellow-50 shadow-md">
              Container 3
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
