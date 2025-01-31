"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Modal() {
  function handleClose() {
    window.parent.postMessage(
      { type: "modal", payload: { modal: undefined } },
      { targetOrigin: "*" },
    );
  }

  const modal = useSearchParams().get("modal");

  if (!modal) {
    return null;
  }

  return (
    <>
      <div className="bg-black bg-opacity-30 absolute inset-0" />
      <div className="h-[40rem] w-[40rem] bg-white rounded-lg p-4 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-row justify-between">
          <div>Modal - {modal}</div>
          <button className=" p-1 border-2" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative">
      {/* @ts-expect-error -- invalid ts config */}
      <Suspense fallback={null}>
        <Modal />
      </Suspense>
    </div>
  );
}
