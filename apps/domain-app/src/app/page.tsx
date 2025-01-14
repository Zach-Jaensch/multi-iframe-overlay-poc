"use client";

export default function Home() {
  function handleOpen(modal: string) {
    window.parent.postMessage(
      { type: "modal", payload: { modal } },
      { targetOrigin: "*" },
    );
  }

  return (
    <div className="flex h-full w-full bg-green-200   flex-row gap-4 p-4 flex-wrap">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="w-[10rem] h-[15rem] bg-yellow-200 flex">
          <button
            className="mt-auto ml-auto p-1 border-2"
            onClick={() => handleOpen(`item-${i}`)}
          >
            Open modal
          </button>
        </div>
      ))}
    </div>
  );
}
