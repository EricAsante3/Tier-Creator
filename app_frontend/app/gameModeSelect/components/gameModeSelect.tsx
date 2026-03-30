"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface GameModeSelectProps{
  setGameMode: Dispatch<SetStateAction<String | null>>;
}

export default function GameModeSelect({setGameMode}: GameModeSelectProps) {

  return (

        <div onClick={() => setGameMode("OTL")} className="bg-black row-span-1 col-span-1 rounded-2xl h-full min-h-0">
          <div className="w-full h-1/8 p-4 space-y-4">
            <h2 className="text-text text-2xl font-bold">
              Game Mode
            </h2>

            <h2 className="text-text text-4xl font-bold">
              Open Tier List
            </h2>
          </div>
        </div>
  );
}
