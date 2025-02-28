import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey text-black">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/users"
          className="block p-6 w-64 text-center bg-blue text-black font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition"
        >
          Go to Users
        </Link>
        <Link
          href="/products"
          className="block p-6 w-64 text-center bg-yellow text-black font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition"
        >
          Go to Products
        </Link>
      </div>
    </div>
  );
}
