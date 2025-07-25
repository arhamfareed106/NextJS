import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 mt-auto border-">
      <div className="max-w-7xl mx-auto flex sm:flex-row justify-between items-center gap-4 px-4">
        <div className="text-sm ">
          © 2023—{new Date().getFullYear()} Mastersel.
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/changelog" className="text-sm  transition-colors">
            Changelog
          </Link>
        </nav>
      </div>
    </footer>
  );
}
