import { useEffect, useState } from "react";

export default function Get() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get");

        if (!res.ok) {
          throw new Error();
        }

        const fetchData = await res.json();
        setData(fetchData.message);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-red-500">
      <div>Get</div>
      <div>{data}</div>
    </div>
  );
}
