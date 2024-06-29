import React, { useEffect, useState } from "react";
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

interface ApiChecklistItem {
  id: number;
  profileUid: string;
  note: string;
  check: boolean;
}

interface ChecklistItem {
  id: number;
  note: string;
  check: boolean;
}

const Home: React.FC = () => {
  const [feelings, setFeelings] = useState<Record<string, string>>({});
  const [openChecklist, setOpenChecklist] = useState<boolean>(false);
  const [openShowDetails, setOpenShowDetails] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState("");

  const handleToggle = async (id: number) => {
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate) return;

    try {
      const updatedItem = { ...itemToUpdate, check: !itemToUpdate.check };
      console.log(updatedItem);
      await axiosInstanceWithAuth.put("/todo/update", {
        id: updatedItem.id,
        note: updatedItem.note,
        check: updatedItem.check,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, check: !item.check } : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChecklists = async () => {
    try {
      const response = await axiosInstanceWithAuth.get<ApiChecklistItem[]>(
        "/todo/all",
      );

      const modifiedItems: ChecklistItem[] = response.data.map(
        ({ profileUid, ...rest }) => rest,
      );

      setItems(modifiedItems);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChosenEmoji = (emoji: string) => {
    console.log("mekii");
    console.log(emoji);
    // setEmoji(emoji);
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

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

  const handleAddNewTask = async () => {
    try {
      const response = await axiosInstanceWithAuth.post("/todo/create", {
        note: value,
      });
      console.log(response);
    } catch (err) {
      console.error("Error: ", err);
    }

    const newTask: ChecklistItem = {
      id: items.length + 1,
      note: value,
      check: false,
    };
    setItems((prevItems) => [...prevItems, newTask]);
    setValue(""); // Clear the input after adding the task
    setOpenChecklist(false); // Close the modal or input section
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await axiosInstanceWithAuth.post("/todo/delete", { id });
      console.log(res);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;
  const handleOpenDay = (value: Date) => {
    axiosInstanceWithAuth
      .get("/daily/", {
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

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await axiosInstanceWithAuth.get("/calendar/month", {
          params: {
            date: new Date(),
          },
        });

        const data = response.data;

        const feelingsData = data.reduce(
          (
            acc: Record<string, string>,
            item: { year: number; month: number; day: number; mood: string },
          ) => {
            const date = new Date(
              item.year,
              item.month,
              item.day,
            ).toLocaleDateString();
            acc[date] = item.mood;
            return acc;
          },
          {},
        );

        setFeelings(feelingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAll = async () => {
      await getAIRecommendation();
      fetchCalendar();
    };

    fetchAll();
  }, []);

  const handleViewChange = async ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    axiosInstanceWithAuth
      .get("/calendar/month", {
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

  const getAIRecommendation = async () => {
    try {
      const res = await axiosInstanceWithAuth.post("/ai");

      const data = res.data;
      setAiRecommendation(data);
    } catch (error) {
      console.error(error);
    }
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
      <div className="md:p-20 p-16 py-10 md:h-screen h-full">
        <h1 className="text-4xl mb-5">Mood Calendar</h1>
        <div className="md:h-[75%]">
          <div className="flex h-full md:flex-row flex-col">
            <div className="md:w-[70%] w-full flex justify-center items-center mr-[1.5%] rounded-2xl bg-indigo-50 shadow-md">
              <div>
                {/* Make it disabled for yesterday and above */}
                <Calendar
                  className="p-1"
                  tileContent={tileContent}
                  onClickDay={handleOpenDay}
                  minDate={minDate}
                  maxDate={maxDate}
                  onActiveStartDateChange={handleViewChange}
                />
              </div>
            </div>

            <div className="md:w-[30%] md:h-full w-full mt-10 md:mt-0 flex flex-col justify-center items-center md:gap-4 gap-4">
              <div className="w-full h-full flex flex-col rounded-2xl items-center bg-green-50 shadow-md">
                <h2 className="xl:text-lg lg:text-sm text-xl font-semibold w-full self flex justify-center pt-[7%]">
                  How are you feeling today?
                </h2>

                <div className="mt-1 grid grid-cols-3 gap-x-5 w-full h-3/4 justify-center items-center pb-4">
                  {Object.keys(feelingEmoji).map((key) => (
                    <ButtonEmoji
                      key={key}
                      emoji={feelingEmoji[key]}
                      onClick={() => handleChosenEmoji(key)}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full h-1/2 flex flex-col rounded-2xl bg-yellow-50 shadow-md">
                <div className="w-full p-5 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Today's Checklist</h2>
                  <button
                    onClick={() => setOpenChecklist(!openChecklist)}
                    className="h-6 w-6 border rounded-2xl border-black flex justify-center items-center hover:bg-black/15 hover:border-black/15 hover:duration-200 duration-200"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="mx-[9%] flex flex-col gap-y-2 overflow-y-scroll mb-[9%] no-scrollbar overflow-x-scroll">
                  {items.map((item, index) => (
                    <div key={index}>
                      <Checkbox
                        checked={item.check}
                        label={item.note}
                        onChange={() => handleToggle(item.id)}
                        onDelete={() => handleDeleteTask(item.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-300 mt-5 rounded-2xl px-5 py-3">
          <h2 className="xl:text-lg lg:text-sm text-xl font-semibold w-full flex">
            Sentiment Analysis by Gemini AI
          </h2>
          <div>{aiRecommendation}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
