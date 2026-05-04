"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";


interface SearchBarProps
{
  setQueryParam: Dispatch<SetStateAction<string | null>>
}

export default function SearchBar({setQueryParam}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(searchParams.get("search_query") || "");
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const currentQuery = searchParams.get("search_query") || "";

      if (input !== currentQuery) {
        if (input === "" || null){
          setQueryParam(null)
          router.push(`/`);
        } else {
          setQueryParam(input)
          router.push(`/?search_query=${input}`);
        }
      }
    }
  };

  return (
    <div className="w-full min-h-24 h-1/8 max-h-32 xl:max-h-128 flex items-center justify-center absolute top-4 z-10">

        <div className="bg-foreground border-highlight border-2 min-w-xl max-w-1/2 w-1/2 h-1/2 rounded-full flex items-center justify-center input_shadow">

            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={ input === "" || input === null ? "Search..." : input }
                className="w-9/10 h-full outline-none text-text font-ConcertOne text-[clamp(1rem,2.2vw,6rem)] "
            />
            

        </div>
        
    </div>

  );
}
