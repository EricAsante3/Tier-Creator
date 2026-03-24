"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface GameModeSelectProps{
  setGameMode: Dispatch<SetStateAction<String | null>>;
}

export default function GameModeSelect({setGameMode}: GameModeSelectProps) {

  return (

        <div onClick={() => setGameMode("OTL")} className="bg-highlight row-span-1 col-span-1 rounded-2xl h-full min-h-0">
        </div>

  );
}
