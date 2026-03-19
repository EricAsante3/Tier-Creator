"use client";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCardSetItem() {
  return (
    <SkeletonTheme
      baseColor="var(--foreground)"
      highlightColor="var(--highlight)"
    >

        <div className="aspect-square w-[15%] flex-shrink-0">
            <Skeleton className="w-full h-full rounded-xl" />
        </div>

    </SkeletonTheme>
  );
}