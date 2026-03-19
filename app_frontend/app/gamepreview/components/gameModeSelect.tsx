"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";

export default function GameModeSelect() {
  const router = useRouter();

    const handleClick = () => {
        router.push("/game"); // Navigate to /game page
    };
  return (

        <div onClick={handleClick} className="bg-highlight row-span-1 col-span-1 rounded-2xl">
        </div>

  );
}
