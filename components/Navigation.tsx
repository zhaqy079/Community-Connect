import Link from "next/link"
import Image from "next/image"
import Logo from "./ui/Logo"
import AccessibilityOptions from "./ui/AccessibilityOptions"

export default function Navigation() {
  return (
    <div className="relative z-40 border-b border-black/10 bg-[var(--cc-teal)]">
      <nav aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-6xl items-center px-4 sm:px-8" >
        <Link href="/"
          aria-label="Community Connect home"
          className="rounded-xl focus-visible:outline-white">
          {/* <Image src="/logo.svg" alt="Community Connect" width={60} height={60} /> */}
          <Logo width={48} height={48} />
        </Link>
        {/* Saved Services Navigation */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link
            href="/saved"
            className="rounded-lg px-3 py-2 
            text-sm !text-white
            hover:bg-white/10  focus-visible:bg-white/10"
          >
            Saved
          </Link>

          <AccessibilityOptions />
        </div>
      </nav>
    </div >
  )
}