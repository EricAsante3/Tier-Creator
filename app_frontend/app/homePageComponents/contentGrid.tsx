"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingCardSet from "./loadingCardSet";
import { useData } from "@/data/data";
import { CardSetMetaDataList } from "../../data/types/types";
import { CardSetMetaData } from "../../data/types/types";
import CardSet from "./cardSet";


export default function ContentGrid() {
  const router = useRouter();
  const { apiClient } = useData();

  const items = ["sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh"]
 
  const [loadedCardSets, setLoadedCardSets] = useState<CardSetMetaData[] | null>(null);

  useEffect(() => {
    async function getCardsets() {
      const data = await apiClient.current.get<CardSetMetaDataList>("/getCardSets");
      setLoadedCardSets(data.CardSets)
      console.log(data)
    }
    
    getCardsets()
  }, [])


  return (
      <div className=" overflow-y-auto grid grid-cols-5 gap-2 2xl:gap-4 pt-28 overflow-visible">

        { loadedCardSets === null ? 
        
          (Array.from({ length: 20 }).map((_, i) => (
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
