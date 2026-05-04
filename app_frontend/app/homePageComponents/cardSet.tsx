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
        router.push(`/play?cardset=d35646a2-92a2-47ad-9db3-ba432435e31c`);
    };

  return (
    <>


        <motion.div
        onClick={handleClick}
        className="aspect-4/3 rounded-xl flex flex-col p-2 text-text cursor-pointer items-center "

        whileHover={{
        backgroundColor: "var(--highlight)"
        }}

        transition={{ type: "spring" }}
        >
        <div className="w-full h-2/3 rounded-xl overflow-hidden  mb-2 relative">
            <img
                src={cardSetData.Metadata.thumbnail_url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
            />

            <div className="absolute top-[5%] right-[5%] bg-background/50 aspect-square min-w-6 w-[10%] flex items-center justify-center text-[3vw]">
                <h1 className="text-text text-sm font-bold">
                67
                </h1>
            </div>
        </div>

        <h1 className=" w-full font-bold line-clamp-2">
            {cardSetData.Metadata.title}
        </h1>

        <h3 className=" w-full truncate opacity-50 overflow-hidden whitespace-nowrap text-[clamp(0.5rem,0.7vw,3rem)]">
            Uploaded: 1/12/26
        </h3>

        </motion.div>

    </>
);
}




