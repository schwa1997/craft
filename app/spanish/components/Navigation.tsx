"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-2">
              <div className="relative group-hover:rotate-12 transition-transform">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-600"
                >
                  <path
                    d="M70 50a20 20 0 0 0-20-20 20 20 0 0 0-20 20 20 20 0 0 0 20 20"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 30a20 20 0 0 1 0 40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="0, 5"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-green-800 group-hover:text-green-600 transition-colors">
                ChanGing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/energy">Energy</NavLink>
            <NavLink href="/goal">Goals</NavLink>
            <NavLink href="/spanish">Spanish</NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-green-600 hover:bg-green-50 hover:text-green-800 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Changed to popover style */}
        <div
          className={`md:hidden absolute right-4 top-16 w-56 rounded-lg bg-white shadow-lg border border-green-100 transition-all duration-200 ease-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-2 space-y-1">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink
              href="/energy"
              onClick={() => setMobileMenuOpen(false)}
            >
              Energy
            </MobileNavLink>
            <MobileNavLink
              href="/goal"
              onClick={() => setMobileMenuOpen(false)}
            >
              Goals
            </MobileNavLink>
            <MobileNavLink
              href="/spanish"
              onClick={() => setMobileMenuOpen(false)}
            >
              Spanish
            </MobileNavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 py-1.5 text-sm font-medium text-green-600 hover:text-white transition-all duration-300 group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-green-500 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 origin-center z-0"></span>
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 hover:text-green-900 transition-colors"
    >
      {children}
    </Link>
  );
}
