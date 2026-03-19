"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.get("search_query"))

  const [input, setInput] = useState(searchParams.get("search") || "");
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/?search_query=${input}`);
    }
  };

  return (
    <div className="w-full min-h-24 h-1/8 max-h-32 xl:max-h-128 flex items-center justify-center absolute top-0 z-10">

        <div className="bg-foreground border-highlight border-2 min-w-xl max-w-1/2 w-1/2 h-1/2 rounded-full pr-8 pl-8 pt-1 pb-1">

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full h-full outline-none bg-transparent text-text font-archivo text-3xl"
            />

        </div>
        
    </div>

  );
}
