import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-6 w-full border-t border-gray-200 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-gray-500">
        <p>© 2026 Community Connect. All rights reserved.</p>


        <nav className="flex gap-6">
          <Link
            href="/about"
            className="transition hover:text-[var(--cc-teal)]"
          >
            About
          </Link>

          <Link
            href="/faq"
            className="transition hover:text-[var(--cc-teal)]"
          >
            FAQ
          </Link>

          <Link
            href="/enquiry"
            className="transition hover:text-[var(--cc-teal)]"
          >
            Enquiry
          </Link>
        </nav>
      </div>
    </footer>
  );
}