"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingCardSet from "./loadingCardSet";
import { useData } from "@/data/data";
import { CardSetMetaDataList } from "../../data/types/types";
import { CardSetMetaData } from "../../data/types/types";

import { CardSetQuery } from "../../data/types/types";

import CardSet from "./cardSet";

interface ContentGridProps{
  queryParam: string | null
}




export default function ContentGrid({queryParam}: ContentGridProps) {
  const { apiClient } = useData();
  const [loadedCardSets, setLoadedCardSets] = useState<CardSetQuery[] | null>(null);

  async function getCardsets(queryParam: string | null) {
    const data = await apiClient.current.post<{CardSets: CardSetQuery[]}>("/queryCards", {"query": queryParam});
    setLoadedCardSets(data.CardSets)
    console.log(data)
  }

  useEffect(() => {
    setLoadedCardSets(null)
    getCardsets(queryParam)
  }, [queryParam])



  return (
      <div className=" overflow-y-auto grid grid-cols-5 gap-2 2xl:gap-4 pt-34 overflow-visible">

        { loadedCardSets === null ? 
        
          (Array.from({ length: 30 }).map((_, i) => (
            <LoadingCardSet key={i}>
            </LoadingCardSet>
          )))
        :
          (loadedCardSets.map((item, i) => (
              <CardSet cardSetData={item} key={i}>
              </CardSet>
          )))
      }

      </div>

  );
}
