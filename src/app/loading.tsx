import MotionLoader from "@/components/MotionLoader";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen w-full ">
      <MotionLoader />
    </div>
  );
}
