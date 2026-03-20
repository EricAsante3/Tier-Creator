"use client"; // <-- needed in App Router for client-side interactivity

import GameModeSelect from "./components/gameModeSelect";
import CardSetDisplay from "./components/cardSetDisplay";
import CardSetInfo from "./components/cardSetInfo";

export default function Home() {

  return (
  <>
  
    <main className="flex h-full justify-center bg-background">

      <div className="w-10/12 grid grid-cols-3  p-4 h-full max-h-screen  min-h-screen">

        <CardSetInfo />

        <GameModeSelect />

        <div className=" row-span-1 col-span-1 rounded-2xl p-4 ">

          <CardSetDisplay />

        </div>

      </div>

    </main>
  
  </>

  );
}
