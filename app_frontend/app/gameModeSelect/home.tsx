"use client"; // <-- needed in App Router for client-side interactivity

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

import GameModeSelect from "./components/gameModeSelect";
import CardSetDisplay from "./components/cardSetDisplay";
import CardSetInfo from "./components/cardSetInfo";
import { useData } from "@/data/data";

import { CardSetList } from "@/data/types/types";
import { StatusResponse } from "@/data/types/types";
import { CardSetMetaData } from "@/data/types/types";
import { Card } from "@/data/types/types";

interface HomeProps{
  cardSetMetaData: CardSetMetaData | null;
  cardSetCards: Card[] | null

  setCardSetMetaData: Dispatch<SetStateAction<CardSetMetaData | null>>;
  setCardSetCards: Dispatch<SetStateAction<Card[] | null>>;
  setGameMode: Dispatch<SetStateAction<String | null>>;
}




export default function Home({cardSetMetaData, setCardSetMetaData, cardSetCards, setCardSetCards, setGameMode}: HomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("cardset")
  const { apiClient } = useData();
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return; // skip if already fetched
    didFetch.current = true;

    if (setId == null) {
      router.push("/");
    }

    async function getCardset() {
      const data = await apiClient.current.get<CardSetList | StatusResponse>(`/getCards?pk=${setId}`);
      
      console.log("Hereweeeee")
      if ("error" in data) {
        router.push("/");
      } else {
        setCardSetMetaData(data.METADATA)
        setCardSetCards(data.cards)
      }

      console.log("CardSet", data)
    }
    
    getCardset()

  }, [])


  return (
  <>
  
    <main className="flex h-full justify-center bg-background">

      <div className="w-10/12 grid grid-cols-3  p-10 h-full max-h-screen  min-h-screen">

        <CardSetInfo METADATA={cardSetMetaData} />

        <GameModeSelect setGameMode={setGameMode}/>

        <div className=" row-span-1 col-span-1 rounded-2xl p-4 ">

          <CardSetDisplay cards={cardSetCards} />

        </div>

      </div>

    </main>
  
  </>

  );
}
