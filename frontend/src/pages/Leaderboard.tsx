import { useEffect, useState } from "react";
import { axiosInstanceWithAuth } from "../api/Axios";

export default function Leaderboard() {
  const [userOne, setUserOne] = useState("User 1");
  const [userTwo, setUserTwo] = useState("User 2");
  const [userThree, setUserThree] = useState("User 3");

  useEffect(() => {
    axiosInstanceWithAuth.get("/leaderboard").then((res) => {
      setUserOne(res.data[0].username);
      setUserTwo(res.data[1].username);
      setUserThree(res.data[2].username);
    });
  }, []);

  return (
    <div className="bg-purple-500 h-screen flex flex-col justify-center items-center">
      <div className="w-full h-[70%] flex justify-center items-end">
        <div className="bg-blue-500 h-[45%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-gray-500 rounded-full flex justify-center items-center font-bold text-2xl">
            2
          </div>
        </div>
        <div className="bg-blue-500 h-[75%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex justify-center items-center font-bold text-2xl">
            1
          </div>
        </div>
        <div className="bg-blue-500 h-[30%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-orange-700 rounded-full flex justify-center items-center font-bold text-2xl">
            3
          </div>
        </div>
      </div>

      <div className="flex h-10 flex-col">
        <div className="">You are in 3rd position</div>
        <div className="flex gap-10">
          <div>Name</div>
          <div>Happiness Point</div>
        </div>
      </div>
    </div>
  );
}
