import React, { useState } from "react";
import ButtonEmoji from "../components/ButtonEmoji";
import "../utils/calendar.css";
import Calendar from "react-calendar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Checkbox from "../components/Checkbox";
import ShowDetailModal from "../components/ShowDetailModal";
import { axiosInstanceWithAuth } from "../api/Axios";
import AddChecklistModal from "../components/AddChecklistModal";

const feelingEmoji: { [key: string]: string } = {
  HAPPY: "😊",
  NEUTRAL: "😐",
  SAD: "😕",
  ANGRY: "😡",
  WORRIED: "😰",
  LAUGHING: "😂",
};

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const Home: React.FC = () => {
  // const [emoji, setEmoji] = useState<string>("");
  const [feelings, setFeelings] = useState<Record<string, string>>({});
  // const [emoji, setEmoji] = useState<string>("");
  const [openChecklist, setOpenChecklist] = useState<boolean>(false);
  const [openShowDetails, setOpenShowDetails] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      label: "Complete project",
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
    { id: "7", label: "Complete project documentation", checked: false },
    { id: "8", label: "Review code", checked: false },
    { id: "9", label: "Deploy to production", checked: false },
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

  const handleChosenEmoji = (emoji: string) => {
    console.log("mekii");
    console.log(emoji);
    // setEmoji(emoji);
  };

  // useEffect(() => {
  //   console.log(emoji);
  // }, [emoji]);

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

  const handleAddNewTask = () => {
    const newTask: ChecklistItem = {
      id: (items.length + 1).toString(),
      label: value,
      checked: false,
    };
    setItems((prevItems) => [...prevItems, newTask]);
    setValue(""); // Clear the input after adding the task
    setOpenChecklist(false); // Close the modal or input section
  };

  // const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;
  const handleOpenDay = (value: Date) => {
    axiosInstanceWithAuth
      .get("/api/daily/", {
        params: {
          date: value,
        },
      })
      .then((res) => {
        setOpenShowDetails(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewChange = async ({
    activeStartDate,
  }: {
    action: string;
    activeStartDate: Date | null;
  }) => {
    console.log(activeStartDate);
    axiosInstanceWithAuth
      .get("/api/calendar/month", {
        params: {
          date: activeStartDate,
        },
      })
      .then((res) => {
        const data = res.data;

        const feelingsData = data.reduce(
          (
            acc: Record<string, string>,
            item: { year: number; month: number; day: number; mood: string },
          ) => {
            const date = new Date(
              item.year,
              item.month,
              item.day,
            ).toLocaleDateString(); // Adjust month since it's 0-indexed
            acc[date] = item.mood;
            return acc;
          },
          {},
        );

        console.log(feelingsData);
        setFeelings(feelingsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // mindate is Jan 1, 2024
  const minDate = new Date(2024, 0, 1);
  // maxdate is today
  const maxDate = new Date(2024, 11, 31);

  return (
    <>
      <ShowDetailModal
        open={openShowDetails}
        close={() => setOpenShowDetails(false)}
      />
      <AddChecklistModal
        open={openChecklist}
        close={handleAddNewTask}
        title="What task are you working on today?"
        multiline={false}
        value={value}
        setValue={setValue}
      />
      <div className="p-20 border-2 h-screen">
        <h1 className="text-4xl">Mood Calendar</h1>
        <div className="h-[65%] mt-[3%] w-[90%]">
          <div className="flex h-full">
            <div className="w-[70%] flex justify-center items-center mr-[1.5%] rounded-2xl bg-indigo-50 shadow-md">
              <div>
                {/* Make it disabled for yesterday and above */}
                <Calendar
                  className="p-5"
                  tileContent={tileContent}
                  onClickDay={handleOpenDay}
                  minDate={minDate}
                  maxDate={maxDate}
                  onActiveStartDateChange={handleViewChange}
                />
              </div>
            </div>

            <div className="w-[30%] flex flex-col justify-center items-center gap-y-[3%]">
              <div className="flex-1 w-full flex flex-col rounded-2xl items-center bg-green-50 shadow-md h-[40%]">
                <h2 className="text-lg font-semibold w-full h-[25%] self flex justify-center pt-[7%]">
                  How are you feeling today?
                </h2>

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

              <div className="flex-1 w-full h-[60%] flex flex-col rounded-2xl bg-yellow-50 shadow-md">
                <div className="w-full h-[25%] self flex justify-between items-center px-[9%] py-[7%]">
                  <h2 className="text-lg font-semibold">Today's Checklist</h2>
                  <button
                    onClick={() => setOpenChecklist(!openChecklist)}
                    className="h-6 w-6 border rounded-2xl border-black flex justify-center items-center hover:bg-black/15 hover:border-black/15 hover:duration-200 duration-200"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="mx-[9%] flex flex-col gap-y-2 overflow-y-scroll mb-[9%] no-scrollbar overflow-x-scroll">
                  {items.map((item) => (
                    <div>
                      <Checkbox
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
    </>
  );
};

export default Home;
