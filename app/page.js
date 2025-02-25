import Search from "@/components/search";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] 
    items-center justify-items-center font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-1 row-start-2 items-center sm:items-start">
        {/* <Search></Search>
         */}
         <Link href="/search" className="cursor underline">Simple Search</Link>
         <Link href="/multi_search" className="underline">Multi Search</Link>
         <Link href="/geosearch" className="underline">Geo Search</Link>
         <Link href="/sematic" className="underline">Sematic Search</Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
