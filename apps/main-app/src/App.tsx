function App() {
  return (
    <div className="flex flex-row h-[50rem] gap-4">
      <div className="w-[20rem] h-full bg-yellow-200" />
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="h-[3rem] w-full bg-red-200" />
        {/* <div className="h-full w-full bg-green-200" /> */}
        <iframe src="http://localhost:3000" className="h-full w-full" />
        <iframe
          src="http://localhost:3001"
          className="fixed inset-0 w-screen h-screen"
          allowTransparency
        />
      </div>
    </div>
  );
}

export default App;
