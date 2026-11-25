import { useState, useEffect } from "react";

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // Cleanup timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Formats as "24 Nov, 2026"
  const formattedDate = now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ (\d{4})$/, ", $1");

  // Formats as "18:06:08" (24-hour format)
  const formattedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return{formattedDate, formattedTime } ;
}
