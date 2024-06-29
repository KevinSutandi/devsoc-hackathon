import React, { useEffect, useState } from "react";
import ButtonEmoji from "../components/ButtonEmoji";
import { PlusIcon } from "@heroicons/react/24/outline";
import Checkbox from "../components/Checkbox";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const Home: React.FC = () => {
  const [emoji, setEmoji] = useState<string>("");

  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      label:
        "Complete project documentatiodddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssd",
      checked: false,
    },
    { id: "2", label: "Review code", checked: false },
    { id: "3", label: "Deploy to production", checked: false },
    { id: "4", label: "Complete project documentation", checked: false },
    { id: "5", label: "Review code", checked: false },
    { id: "6", label: "Deploy to production", checked: false },
    { id: "7", label: "Complete project documentation", checked: false },
    { id: "8", label: "Review code", checked: false },
    { id: "9", label: "Deploy to production", checked: false },
  ]);

  const handleToggle = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

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
              <h2 className="text-lg font-semibold w-full h-[25%] self flex justify-center pt-[7%]">
                How are you feeling today?
              </h2>

              <div className="mt-1 grid grid-cols-3 gap-x-5 space-y-3 w-full h-3/4 justify-center items-center pb-4">
                {emojis.map((emoji) => (
                  <ButtonEmoji
                    emoji={emoji}
                    onClick={() => handleChosenEmoji(emoji)}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col rounded-2xl bg-yellow-50 shadow-md">
              <div className="w-full h-[25%] self flex justify-between items-center px-8">
                <h2 className="text-lg font-semibold">Today's Checklist</h2>
                <button className="h-6 w-6 border rounded-2xl border-black flex justify-center items-center hover:bg-black/15 hover:border-black/15 hover:duration-200 duration-200">
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mx-[9%] flex flex-col gap-y-2 overflow-y-scroll mb-[9%] no-scrollbar overflow-x-scroll">
                {items.map((item) => (
                  <div>
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      label={item.label}
                      onChange={() => handleToggle(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
