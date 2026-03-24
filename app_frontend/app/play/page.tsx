"use client"; // <-- needed in App Router for client-side interactivity

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, use } from "react";


import { CardSetList } from "@/data/types/types";
import { StatusResponse } from "@/data/types/types";
import { CardSetMetaData } from "@/data/types/types";
import { Card } from "@/data/types/types";

import Home from "../gameModeSelect/home";
import GameOTL from "../openTierList/gameOTL";

export default function Page() {
    const router = useRouter();

    const [cardSetMetaData, setCardSetMetaData] = useState<CardSetMetaData | null>(null)
    const [cardSetCards, setCardSetCards] = useState<Card[] | null>(null)
    const [gameMode, setGameMode] = useState<string | null>(null)

    return (
    <>
    { gameMode === "OTL" ?
      <GameOTL cards={cardSetCards}></GameOTL>
    :
      <Home cardSetMetaData={cardSetMetaData} setCardSetMetaData={setCardSetMetaData} cardSetCards={cardSetCards} setCardSetCards={setCardSetCards} setGameMode={setGameMode}></Home>

    }
    </>

  );
}
