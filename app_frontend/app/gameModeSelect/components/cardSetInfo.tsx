"use client"; // <-- needed in App Router for client-side interactivity
import { useState, useEffect } from "react";
import LoadingCardSetInfo from "./loadingCardSetInfo";
import { CardSetMetaData } from "@/data/types/types";

interface CardSetInfoProps {
  METADATA: CardSetMetaData | null;
}

export default function CardSetInfo({METADATA}: CardSetInfoProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
      .then((res) => res.json())
      .then((data) => setText(data.join("\n\n")));
  }, []);

  return (
    <>
      { METADATA === null ?
      
        <LoadingCardSetInfo></LoadingCardSetInfo>

        :
        
        <div className="flex flex-col row-span-1 col-span-1 rounded-2xl p-4 space-y-2 min-h-0 ">

        <div className="aspect-4/3 h-1/3 rounded-xl overflow-hidden bg-white">
          <img
              src={METADATA.thumbnail_url}
              alt="Thumbnail"
              className="w-full h-full object-cover"
          />
        </div>


          <div className=" min-20 h-fit max-h-20  mb-4">
            <h2 className="font-bold text-text text-3xl w-full overflow-hidden line-clamp-2">
              {METADATA.title}
            </h2>
          </div>
    
          <div className="flex flex-row h-full space-x-4">
            <h1 className=" text-text/50 text-md w-full overflow-hidden line-clamp-15">
                {METADATA.desc}
            </h1>
            <div className="w-full space-y-4 text-text/50">

              <h1 className="font-bold text-lg w-full">
                Created By: {METADATA.created}
              </h1>

              <h1 className="font-bold text-lg w-full">
                Uploaded: {METADATA.created}
              </h1>

            </div>



          </div>

        </div>

      }
    </>
  );
}
