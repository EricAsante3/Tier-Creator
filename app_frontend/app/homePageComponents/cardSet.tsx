"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingCardSet from "./loadingCardSet";


export default function CardSet() {
  const router = useRouter();

    const handleClick = () => {
        router.push("/gamepreview"); // Navigate to /game page
    };

  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
      .then((res) => res.json())
      .then((data) => setText(data.join("\n\n")));
  }, []);




  return (
    <>
    { text === "" ?
        <LoadingCardSet></LoadingCardSet>
    :

        <motion.div
        onClick={handleClick}
        className="aspect-4/3 rounded-xl flex flex-col p-2 text-text cursor-pointer items-center justify-evenly "
        whileHover={{
            backgroundColor: "rgba(255,255,255,0.2)"
        }}
        transition={{ type: "spring" }}
        >
        <div className="w-full h-2/3 bg-red-600/20 rounded-xl"></div>

        <h1 className="font-semibold text-xs md:text-sm lg:text-lg w-full truncate overflow-hidden whitespace-nowrap">
            {text}
        </h1>

        <h1 className="font-semibold text-xs w-full truncate overflow-hidden whitespace-nowrap">
            Uploaded Date: 1/12/26
        </h1>
        </motion.div>

    }
    </>
);
}




