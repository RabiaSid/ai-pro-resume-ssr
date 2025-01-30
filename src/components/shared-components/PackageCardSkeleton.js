import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PackageCardSkeleton = () => {
  return (
    <div className="w-[300px] h-[420px] overflow-hidden border-2 rounded-3xl p-0 m-0 flex flex-col">
      <div className="h-[38px] p-0 m-0">
        <Skeleton className="p-0 w-full h-full !leading-[1.5]" />
      </div>
      <div className="flex flex-col items-center flex-1 py-6">
        <div className="px-4 w-full flex-1 mt-8">
          <Skeleton className="!h-2 !w-full" count={4} />
        </div>
        <div className="w-[200px] h-[42px] rounded-3xl overflow-hidden leading-[0px]">
          <Skeleton className=" !w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default PackageCardSkeleton;
