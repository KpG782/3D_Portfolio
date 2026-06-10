import Link from "next/link";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[70vh] max-w-[1152px] flex-col items-start justify-center px-5 md:px-8">
        <p className="station-label">[ 404 · NO SPAN FOUND ]</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-4xl">
          This route never entered the system.
        </h1>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the trace
        </Link>
      </main>
    </>
  );
}
