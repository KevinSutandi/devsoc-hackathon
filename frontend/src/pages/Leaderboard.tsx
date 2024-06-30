import { useEffect, useState } from "react";
import { axiosInstanceWithAuth } from "../api/Axios";

export default function Leaderboard() {
  const [userOne, setUserOne] = useState("User 1");
  const [userTwo, setUserTwo] = useState("User 2");
  const [userThree, setUserThree] = useState("User 3");
  const [userRank, setUserRank] = useState(-1);
  const [userPoints, setUserPoints] = useState(0);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axiosInstanceWithAuth.get("/leaderboard/top").then((res) => {
      if (res.data.length > 0) {
        setUserOne(res.data[0].fullname);
      }
      if (res.data.length > 1) {
        setUserTwo(res.data[1].fullname);
      }
      if (res.data.length > 2) {
        setUserThree(res.data[2].fullname);
      }
    });
    axiosInstanceWithAuth.get("/leaderboard/").then((res) => {
      setUserRank(res.data.rank);
      setUserPoints(res.data.happinessLevel);
    });
    axiosInstanceWithAuth.get("/leaderboard/all").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  return (
    <div className="bg-purple-500 h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col h-20 justify-center items-center text-yellow-400">
        <div className="text-5xl">
          You are in {userRank}th position out of {allUsers.length} users.
        </div>
        <div className="mt-2 text-3xl">
          You have {userPoints} Happiness Point
        </div>
      </div>
      <div className="w-full h-[70%] flex justify-center items-end">
        <div className="bg-blue-500 h-[45%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-gray-500 rounded-full flex justify-center items-center font-bold text-2xl">
            {userTwo}
          </div>
        </div>
        <div className="bg-blue-500 h-[75%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex justify-center items-center font-bold text-2xl">
            {userOne}
          </div>
        </div>
        <div className="bg-blue-500 h-[30%] w-48 border border-black flex justify-center">
          <div className="w-20 h-20 bg-orange-700 rounded-full flex justify-center items-center font-bold text-2xl">
            {userThree}
          </div>
        </div>
      </div>
    </div>
  );
}
