import { useEffect, useState } from "react";

export default function Post() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: 12 }),
      });

      const fetchData = await res.json();
      setData(fetchData.value);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen bg-blue-500">
      <div>Post</div>
      <div>{data}</div>
    </div>
  );
}
