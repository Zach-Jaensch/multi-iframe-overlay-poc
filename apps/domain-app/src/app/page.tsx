export default function Home() {
  return (
    <div className="flex h-full w-full bg-green-200   flex-row gap-4 p-4 flex-wrap">
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="w-[10rem] h-[15rem] bg-yellow-200" />
      ))}
    </div>
  );
}
