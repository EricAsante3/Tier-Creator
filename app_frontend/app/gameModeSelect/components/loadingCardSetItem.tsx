"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCardSetItem({className}: {className: string}) {
  return (

    <div className={`aspect-square shrink-0 ${className}`}>
        <Skeleton className="w-full h-full rounded-xl" />
    </div>

  );
}