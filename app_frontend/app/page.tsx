"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const handleClick = () => {
    router.push("/game"); // Navigate to /game page
  };

  return (
  <>
  
    <main className="flex min-h-screen h-full justify-center bg-foreground">

      <div className="w-10/12 bg-red-600 grid grid-cols-8  gap-4 p-4 ">


        <div onClick={handleClick} className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>

        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>

        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>

        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>

        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>



        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>


        <div className="bg-blue-50 row-span-2 col-span-2">
        </div>
      </div>

    </main>
  
  </>

  );
}
