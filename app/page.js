import Search from "@/components/search";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] 
    items-center justify-items-center font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Search></Search>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
