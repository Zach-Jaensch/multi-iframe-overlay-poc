import { useEffect } from "react";
import { useSearchParams } from "react-router";

function App() {
  const [getSP, setSP] = useSearchParams();
  useEffect(() => {
    function messageHandler(event: MessageEvent) {
      if (event.data.type === "modal") {
        if (event.data.payload.modal === undefined) {
          setSP({});
        } else {
          setSP({ modal: event.data.payload.modal });
        }
      }
    }
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);
  const modal = getSP.get("modal");

  return (
    <div className="flex flex-row h-[50rem] gap-4">
      <div className="w-[20rem] h-full bg-yellow-200" />
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="h-[3rem] w-full bg-red-200" />
        <iframe
          src={import.meta.env.VITE_DOMAIN_APP_URL}
          className="h-full w-full"
        />
        <iframe
          src={`${import.meta.env.VITE_DOMAIN_APP_URL}/overlay?modal=${modal}`}
          className={`fixed inset-0 w-screen h-screen ${modal ? "" : "hidden"}`}
          allowTransparency
        />
      </div>
    </div>
  );
}

export default App;
