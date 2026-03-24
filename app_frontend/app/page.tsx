"use client"; // <-- needed in App Router for client-side interactivity
import SearchBar from "./homePageComponents/searchBar";
import ContentGrid from "./homePageComponents/contentGrid";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  console.log(searchParams.get("search_query"))

 return (
  <>
  
    <main className="flex min-h-screen  h-full justify-center bg-background">

      <div className="w-10/12 h-screen  flex flex-col relative">

        <SearchBar></SearchBar>

        <ContentGrid></ContentGrid>

      </div>

    </main>
  
  </>

  );
}
