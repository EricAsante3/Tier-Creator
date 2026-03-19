"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CardSet from "./cardSet";
import LoadingCardSet from "./loadingCardSet";

export default function ContentGrid() {
  const router = useRouter();

  const items = ["sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh", "sda", "sda", "sdsa", "sda", "asdsa", "sda", "hhh"]
 

  return (
      <div className=" overflow-y-auto grid grid-cols-5 gap-2 2xl:gap-4 pt-28 overflow-visible">
        {items.map((item, i) => (
            <CardSet key={i}>
                
            </CardSet>
        ))}

        <LoadingCardSet></LoadingCardSet>
      </div>

  );
}
