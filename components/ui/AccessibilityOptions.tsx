"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DEFAULT_TEXT_SIZE = 100;
const MIN_TEXT_SIZE = 87.5;
const MAX_TEXT_SIZE = 125;
const TEXT_SIZE_STEP = 12.5;

export default function AccessibilityOptions() {
  const [
    isOpen,
    setIsOpen
  ] = useState(false);

  const [
    textSize,
    setTextSize
  ] = useState(DEFAULT_TEXT_SIZE);

  const [
    easyEnglish,
    setEasyEnglish
  ] = useState(false);

  const [
    settingsLoaded,
    setSettingsLoaded
  ] = useState(false);

  // Read saved settings after the component loads.
  useEffect(() => {
    const savedTextSize =
      localStorage.getItem(
        "community-connect-text-size"
      );

    const savedEasyEnglish =
      localStorage.getItem(
        "community-connect-easy-english"
      );

    if (savedTextSize) {
      const parsedTextSize =
        Number(savedTextSize);

      if (!Number.isNaN(parsedTextSize)) {
        setTextSize(parsedTextSize);
      }
    }

    if (savedEasyEnglish) {
      setEasyEnglish(
        savedEasyEnglish === "true"
      );
    }

    setSettingsLoaded(true);
  }, []);

  // Apply and save the text-size setting.
  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    document.documentElement.style.fontSize =
      `${textSize}%`;

    localStorage.setItem(
      "community-connect-text-size",
      String(textSize)
    );
  }, [textSize, settingsLoaded]);

  // Apply and save the Easy English setting.
  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    document.documentElement.dataset.easyEnglish =
      String(easyEnglish);

    localStorage.setItem(
      "community-connect-easy-english",
      String(easyEnglish)
    );
  }, [easyEnglish, settingsLoaded]);

  function decreaseTextSize() {
    setTextSize(current =>
      Math.max(
        MIN_TEXT_SIZE,
        current - TEXT_SIZE_STEP
      )
    );
  }

  function increaseTextSize() {
    setTextSize(current =>
      Math.min(
        MAX_TEXT_SIZE,
        current + TEXT_SIZE_STEP
      )
    );
  }

  function resetSettings() {
    setTextSize(DEFAULT_TEXT_SIZE);
    setEasyEnglish(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        onClick={() =>
          setIsOpen(current => !current)
        }
        className="
          inline-flex items-center gap-2
          rounded-lg px-3 py-2
          text-sm text-white
          hover:bg-white/10
          focus-visible:bg-white/10
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

      {isOpen && (
        <section
          id="accessibility-panel"
          aria-label="Accessibility settings"
          className="
            absolute right-0 top-full z-50
            mt-2 w-[calc(100vw_-_2rem)]
            max-w-sm rounded-xl
            border border-gray-200
            bg-white p-5 text-gray-900
            shadow-xl
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Accessibility
            </h2>

            <button
              type="button"
              aria-label="Close accessibility settings"
              onClick={() => setIsOpen(false)}
              className="
                rounded-md px-2 py-1
                text-sm text-gray-600
                hover:bg-gray-100
              "
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">
                Text size
              </p>

              <p
                className="mt-1 text-sm text-gray-600"
                aria-live="polite"
              >
                Current size: {textSize}%
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Decrease text size"
                disabled={
                  textSize <= MIN_TEXT_SIZE
                }
                onClick={decreaseTextSize}
                className="
                  rounded-lg border
                  border-gray-300 px-3 py-2
                  font-semibold hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                A−
              </button>

              <button
                type="button"
                aria-label="Increase text size"
                disabled={
                  textSize >= MAX_TEXT_SIZE
                }
                onClick={increaseTextSize}
                className="
                  rounded-lg border
                  border-gray-300 px-3 py-2
                  text-lg font-semibold
                  hover:bg-gray-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                A+
              </button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
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
              aria-pressed={easyEnglish}
              onClick={() =>
                setEasyEnglish(
                  current => !current
                )
              }
              className={`
                min-w-14 rounded-lg border
                px-3 py-2 font-medium
                ${easyEnglish
                  ? "border-[var(--cc-teal)] bg-[var(--cc-teal)] text-white"
                  : "border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {easyEnglish ? "On" : "Off"}
            </button>
          </div>

          <button
            type="button"
            onClick={resetSettings}
            className="
              mt-6 text-sm font-medium
              text-[var(--cc-teal)]
              underline
            "
          >
            Reset settings
          </button>
        </section>
      )}
    </div>
  );
}