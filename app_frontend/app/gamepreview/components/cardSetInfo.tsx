"use client"; // <-- needed in App Router for client-side interactivity
import { useState, useEffect } from "react";
import LoadingCardSetInfo from "./loadingCardSetInfo";

export default function CardSetInfo() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
      .then((res) => res.json())
      .then((data) => setText(data.join("\n\n")));
  }, []);

  return (
    <>
      { text === "" ?
      
        <LoadingCardSetInfo></LoadingCardSetInfo>

        :
        
        <div className="flex flex-col row-span-1 col-span-1 rounded-2xl p-4 space-y-2 min-h-0 ">
          <div className="bg-red-400 aspect-4/3 h-1/3 ">
          </div>

          <div className="aspect-4/3 h-32 ">
            <h2 className="font-bold text-text text-2xl w-full overflow-hidden line-clamp-3">
              {text}
            </h2>
          </div>
    
          <div className="flex flex-row h-full">
            <h1 className=" text-text text-sm w-full overflow-hidden line-clamp-15">
              {text}
            </h1>
            <h1 className=" text-text text-sm w-full overflow-hidden line-clamp-15">
              {text}
            </h1>

          </div>

        </div>

      }
    </>
  );
}
