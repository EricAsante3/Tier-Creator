"use client"; // <-- needed in App Router for client-side interactivity
import SearchBar from "./homePageComponents/searchBar";
import ContentGrid from "./homePageComponents/contentGrid";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [queryParam, setQueryParam] = useState<string | null>(searchParams.get("search_query"));

 return (
  <>
  
    <main className="flex min-h-screen  h-full justify-center bg-background relative">

      <SearchBar setQueryParam={setQueryParam}></SearchBar>

      <div className=" w-full flex flex-col items-center justify-center relative overflow-y-scroll ">
        <div className="w-10/12 h-screen ">
                <ContentGrid queryParam={queryParam}></ContentGrid>

        </div>


      </div>

    </main>
  
  </>

  );
}
