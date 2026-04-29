"use client"; // <-- needed in App Router for client-side interactivity
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import LoadingCardSet from "./loadingCardSet";
import { useData } from "@/data/data";
import { CardSetMetaDataList } from "../../data/types/types";
import { CardSetMetaData } from "../../data/types/types";
import { SmileCircleIcon } from "@/icons/icons";

import { CardSetQuery } from "../../data/types/types";

import CardSet from "./cardSet";

interface ContentGridProps{
  queryParam: string | null
}




export default function ContentGrid({queryParam}: ContentGridProps) {
  const { apiClient } = useData();
  const [loadedCardSets, setLoadedCardSets] = useState<CardSetQuery[] | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;


  async function getCardsets(queryParam: string | null) {
    let data;
    if (queryParam && queryParam !== "") {
      data = await apiClient.current.post<{CardSets: CardSetQuery[]}>("/queryCards", {"query": queryParam});
    } else {
      data = await apiClient.current.post<{CardSets: CardSetQuery[]}>("/queryCards", {"random": 1});
    }
    setLoadedCardSets(data.CardSets)
    console.log(data)
  }

  useEffect(() => {
    setLoadedCardSets(null)
    getCardsets(queryParam)
  }, [queryParam])




  // Slice the full list based on current page
  const totalPages = loadedCardSets ? Math.ceil(loadedCardSets.length / ITEMS_PER_PAGE) : 0;

  const paginatedCardSets = loadedCardSets
    ? loadedCardSets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : null;





  return (
    <>


      <div className=" overflow-y-auto  pt-16 overflow-visible ">
        

        {
          loadedCardSets !== null && loadedCardSets.length === 0 ? (

            <div className="w-full aspect-3/1 flex p-2 items-center justify-center flex-col space-y-2">
              <SmileCircleIcon className="aspect-square w-80"/>
              <h1 className="text-text text-lg">No results found for "{queryParam}"</h1>
            </div>

          ) : (

            <div className="w-full  flex p-2 items-end justify-between">
              <div>
                <h1 className="text-lg font-bold text-text">
                  {loadedCardSets === null
                    ? "Loading..."
                    : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        loadedCardSets.length
                      )} of ${loadedCardSets.length} results for "${queryParam}"`
                  }
                </h1>
              </div>
            </div>

          )
        }

        </div>

        <div className="grid grid-cols-5 gap-2 2xl:gap-4">
        
          { paginatedCardSets === null ? 
          
            (Array.from({ length: 30 }).map((_, i) => (
              <LoadingCardSet key={i}>
              </LoadingCardSet>
            )))
          :

          <>

            {(paginatedCardSets.map((item, i) => (

                <CardSet cardSetData={item} key={i}>
                </CardSet>
                
            )))}

            <div className="w-full row-span-4 col-span-5 aspect-8/1 p-4">

              <div>
                {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-4">


                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-foreground text-white rounded  disabled:opacity-50"
                  >
                    <h1>
                      Prev
                    </h1>
                  </button>



                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded ${
                        currentPage === page ? "bg-highlight text-white" : "bg-foreground text-white cursor-pointer"
                      }`}
                    >
                      <h1>
                        {page}
                      </h1>
                    </button>
                  ))}


                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-foreground text-white rounded cursor-pointer disabled:opacity-50"
                  >
                    <h1>
                      Next
                    </h1>
                  </button>


                </div>
              )}
              </div>

              <div className="bg-foreground w-full h-full rounded-2xl">
              </div>
        
            </div>

          </>

        }

      </div>

    </>
  );
}
