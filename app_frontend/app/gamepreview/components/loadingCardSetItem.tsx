"use client";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCardSetItem({className}: {className: string}) {
  return (
    <SkeletonTheme
      baseColor="var(--foreground)"
      highlightColor="var(--highlight)"
    >

        <div className={`aspect-square shrink-0 ${className}`}>
            <Skeleton className="w-full h-full rounded-xl" />
        </div>

    </SkeletonTheme>
  );
}