import { useEffect, useState } from "react";
import { axiosInstanceWithAuth } from "../api/Axios";

export default function Leaderboard() {
  const [userOne, setUserOne] = useState("User 1");
  const [userTwo, setUserTwo] = useState("User 2");
  const [userThree, setUserThree] = useState("User 3");
  const [userRank, setUserRank] = useState(-1);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axiosInstanceWithAuth.get("/leaderboard/top").then((res) => {
      if (res.data.length <= 0) return;
      if (res.data.length <= 1) setUserOne(res.data[0].fullname);
      if (res.data.length <= 2) setUserTwo(res.data[1].fullname);
      if (res.data.length <= 3) setUserThree(res.data[2].fullname);
    });
    axiosInstanceWithAuth.get("/leaderboard/").then((res) => {
      setUserRank(res.data);
    });
    axiosInstanceWithAuth.get("/leaderboard/all").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  return (
    <div className="bg-purple-500 h-screen flex flex-col justify-center items-center">
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

      <div className="flex h-10 flex-col">
        <div className="">
          You are in {userRank} position out of {allUsers.length} users.
        </div>
        {/* <div className="flex gap-10">
          <div>{}</div>
          <div>Happiness Point</div>
        </div> */}
      </div>
    </div>
  );
}
