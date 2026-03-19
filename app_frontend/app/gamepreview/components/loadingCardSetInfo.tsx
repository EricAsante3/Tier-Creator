"use client";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCardSetInfo() {
  return (
    <SkeletonTheme
      baseColor="var(--foreground)"
      highlightColor="var(--highlight)"
    >

    <div className="flex flex-col   row-span-1 col-span-1 rounded-2xl p-4 space-y-2">
        <div className=" aspect-4/3 h-1/3 ">
            <Skeleton height="100%" className="rounded-xl" />
        </div>

        <div className="aspect-4/3 h-32 ">
            <Skeleton height="90%" className="rounded-xl" />
        </div>

        <div className="flex flex-row gap-2 h-full">
            <div className="flex-1">
                <Skeleton height="100%" className="rounded-xl" />
            </div>

            <div className="flex-1">
                <Skeleton height="100%" className="rounded-xl" />
            </div>
        </div>

    </div>

    </SkeletonTheme>
  );
}