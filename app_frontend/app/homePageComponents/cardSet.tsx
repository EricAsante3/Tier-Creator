"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingCardSet from "./loadingCardSet";
import { CardSetMetaData } from "../../data/types/types";
import { CardSetQuery } from "../../data/types/types";

export interface InputInterface {
  cardSetData: CardSetQuery;
}


export default function CardSet({cardSetData}: InputInterface) {
  const router = useRouter();

    const handleClick = () => {
        // router.push(`/play?cardset=${cardSetData.set_id}`);
    };

  return (
    <>


        <motion.div
        onClick={handleClick}
        className="aspect-4/3 rounded-xl flex flex-col p-2 text-text cursor-pointer items-center justify-evenly "
        whileHover={{
            backgroundColor: "rgba(255,255,255,0.2)"
        }}
        transition={{ type: "spring" }}
        >
        <div className="w-full h-2/3 rounded-xl overflow-hidden bg-white">
        <img
            src={cardSetData.Metadata.thumbnail_url}
            alt="Thumbnail"
            className="w-full h-full object-cover"
        />
        </div>

        <h1 className=" w-full font-bold text-xs md:text-sm lg:text-lg line-clamp-2">
            {cardSetData.Metadata.title}
        </h1>

        <h1 className="font-semibold text-xs w-full truncate overflow-hidden whitespace-nowrap">
            Uploaded Date: 1/12/26
        </h1>
        </motion.div>

    </>
);
}




