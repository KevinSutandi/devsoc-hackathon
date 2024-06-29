import React, { useEffect, useState } from "react";
import ButtonEmoji from "../components/ButtonEmoji";

const Home: React.FC = () => {
  const [emoji, setEmoji] = useState<string>("");
  const emojis = ["😊", "😐", "😕", "👿", "😰", "😂"];

  const handleChosenEmoji = (emoji: string) => {
    console.log("mekii");
    setEmoji(emoji);
  };

  useEffect(() => {
    console.log(emoji);
  }, [emoji]);

  return (
    <div className="p-20 border-2 h-screen">
      <h1 className="text-4xl">Mood Calender</h1>
      <div className="h-[65%] mt-[3%] w-[90%]">
        <div className="flex h-full">
          <div className="w-[70%] flex justify-center items-center mr-[1.5%] rounded-2xl bg-indigo-50 shadow-md">
            Calender
          </div>

          <div className="w-[30%] flex flex-col justify-center items-center gap-y-[3%]">
            <div className="flex-1 w-full flex flex-col rounded-2xl items-center bg-green-50 shadow-md">
              <div className="w-full h-[25%] self flex justify-center pt-[7%]">
                <div className="text-lg font-semibold">
                  How are you feeling today?
                </div>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-x-5 space-y-3 w-full h-3/4 justify-center items-center pb-4">
                {emojis.map((emoji) => (
                  <ButtonEmoji
                    emoji={emoji}
                    onClick={() => handleChosenEmoji(emoji)}
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
    </div>
  );
};

export default Home;
