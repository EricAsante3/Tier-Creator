"use client"; // <-- needed in App Router for client-side interactivity
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();

    const handleClick = () => {
        router.push("/game"); // Navigate to /game page
    };

  const [text, setText] = useState("");

  useEffect(() => {
    fetch("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1")
      .then((res) => res.json())
      .then((data) => setText(data.join("\n\n")));
  }, []);


  return (
  <>
  
    <main className="flex min-h-screen h-full justify-center bg-background">

      <div className="w-10/12  grid grid-cols-3  gap-4 p-4 max-h-screen ">


        <div className="flex flex-col   row-span-1 col-span-1 rounded-2xl p-4 space-y-2">
          <div className="bg-red-400 aspect-4/3 h-1/3 ">

          </div>

          <div className="aspect-4/3 h-32 ">
            <h2 className="font-bold text-text text-3xl w-full overflow-hidden line-clamp-3">
              {text}
            </h2>
          </div>
    


          <div className="flex flex-row">
            <h1 className=" text-text text-md w-full overflow-hidden line-clamp-18">
              {text}
            </h1>
            <h1 className="font-semibold text-text text-md w-full overflow-hidden line-clamp-5">
              {text}
            </h1>

          </div>


        </div>

        <div onClick={handleClick} className="bg-highlight row-span-1 col-span-1 rounded-2xl">
        </div>

        <div className="bg-foreground row-span-1 col-span-1 rounded-2xl">
        </div>



      </div>

    </main>
  
  </>

  );
}
