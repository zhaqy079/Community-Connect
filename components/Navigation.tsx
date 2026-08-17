import Link from "next/link"
import Image from "next/image"
import Logo from "./ui/Logo"

export default function Navigation() {
  return (
    <div className="bg-[var(--cc-teal)] p-2">
      <nav className="flex">
        <Link href="/">
          {/* <Image src="/logo.svg" alt="Community Connect" width={60} height={60} /> */}
          <Logo width={50} height={50} />
        </Link>
      </nav>
    </div>
  )
}