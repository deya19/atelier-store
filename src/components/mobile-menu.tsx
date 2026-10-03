"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="button !min-h-11 !w-11 !p-0 md:hidden"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Menu"}</span>
        <span className="flex w-4 flex-col gap-1.5">
          <span className={`h-px w-full bg-current transition-transform ${isOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-full bg-current transition-transform ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-canvas text-ink md:hidden" id="mobile-navigation">
          <div className="container-page flex min-h-20 items-center justify-between border-b border-border">
            <span className="font-display text-xl tracking-[0.16em]">ATELIER</span>
            <button aria-label="Close menu" className="button !min-h-11 !w-11 !p-0" onClick={() => setIsOpen(false)} type="button">
              <span className="text-2xl font-light leading-none">×</span>
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="container-page flex flex-col py-10">
            <Link className="border-b border-border py-5 font-display text-4xl tracking-[-0.03em]" href="/#new-arrivals" onClick={() => setIsOpen(false)}>New arrivals</Link>
            <Link className="border-b border-border py-5 font-display text-4xl tracking-[-0.03em]" href="/#collections" onClick={() => setIsOpen(false)}>Collections</Link>
            <Link className="border-b border-border py-5 font-display text-4xl tracking-[-0.03em]" href="/#journal" onClick={() => setIsOpen(false)}>Journal</Link>
            <div className="mt-10 flex flex-col gap-4 text-xs uppercase tracking-[0.16em] text-muted">
              <Link href="#about" onClick={() => setIsOpen(false)}>About Atelier</Link>
              <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
