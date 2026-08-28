"use client";

import { useState } from "react";
import Link from "next/link"
import Image from "next/image"
import Logo from "./ui/Logo"


export default function Navigation() {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

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
            !text-white
            text-white hover:bg-white/10  focus-visible:bg-white/10"
          >
            Saved
          </Link>

          <button
            type="button"
            aria-label="Open accessibility settings"
            aria-expanded={isAccessibilityOpen}
            aria-controls="accessibility-panel"
            onClick={() =>
              setIsAccessibilityOpen(current => !current)
            }
            className="
            inline-flex items-center gap-2
            rounded-lg px-3 py-2
            text-sm text-white
            hover:bg-white/10
            sm:text-base
          "
          >
            <span>Accessibility</span>

            <Image
              src="/accessibility_tools.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />

          </button>
        </div>
      </nav >

      {isAccessibilityOpen && (
        <section
          id="accessibility-panel"
          aria-label="Accessibility settings"
          className="
            absolute right-4 top-full
            z-50 w-[calc(100%-2rem)] max-w-sm
            rounded-xl border border-gray-200
            bg-white p-5 text-gray-900
            shadow-md sm:right-8
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Accessibility
            </h2>

            <button
              type="button"
              aria-label="Close accessibility settings"
              onClick={() =>
                setIsAccessibilityOpen(false)
              }
              className="
                rounded-md px-2 py-1
                text-gray-600 hover:bg-gray-100
              "
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-medium">
              Text size
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Decrease text size"
                className="
                  rounded-lg border border-gray-300
                  px-3 py-2 font-semibold
                  hover:bg-gray-100
                "
              >
                A−
              </button>

              <button
                type="button"
                aria-label="Increase text size"
                className="
                  rounded-lg border border-gray-300
                  px-3 py-2 text-lg font-semibold
                  hover:bg-gray-100
                "
              >
                A+
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="font-medium">
                Easy English
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Use shorter service descriptions.
              </p>
            </div>

            <button
              type="button"
              aria-pressed="false"
              className="
                rounded-lg border border-gray-300
                px-3 py-2 font-medium
                hover:bg-gray-100
              "
            >
              Off
            </button>
          </div>

          <button
            type="button"
            className="
              mt-6 text-sm font-medium
              text-[var(--cc-teal)] underline
            "
          >
            Reset settings
          </button>
        </section>
      )}
    </div >
  )
}