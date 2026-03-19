"use client"; // <-- needed in App Router for client-side interactivity
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingCardSet() {

  return (
    <SkeletonTheme baseColor="var(--foreground)" highlightColor="var(--highlight)">
      <div className="w-full aspect-4/3 rounded-xl flex flex-col p-2 justify-evenly ">

        {/* Image skeleton (takes 2/3 height) */}
        <div className="h-2/3 w-full ">
            <Skeleton height="90%" className="rounded-xl" />
        </div>

        {/* Title */}
        <div className="w-full">
            <Skeleton height="60%" />
        </div>

        {/* Date */}
        <div className="w-2/3">
            <Skeleton height="60%" />
        </div>

      </div>
    </SkeletonTheme>
  );
}






