import Link from "next/link"
import Image from "next/image"
import Logo from "./ui/Logo"

export default function Navigation() {
  return (
    <div className="border-b border-black/10 bg-[var(--cc-teal)]">
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
            !text-white
            text-white hover:bg-white/10  focus-visible:bg-white/10"
          >
            Saved
          </Link>

          <Link
            href="/accessibility"
            aria-label="Accessibility settings"
            className="
          inline-flex items-center gap-2 rounded-lg
          px-3 py-2 text-sm !text-white
          hover:bg-white/10 hover:text-white
          sm:text-base
          "
          >
            <span className="hidden sm:inline">
              Accessibility
            </span>
            <Image
              src="/accessibility_tools.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />


          </Link>
        </div>
      </nav >
    </div >
  )
}