"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Star } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-pink-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <div className="flex items-center space-x-2">
              <div className="relative animate-spin-slow group-hover:animate-spin transition-transform">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-pink-400"
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
                    strokeDasharray="0,5"
                  />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-pink-500 group-hover:text-purple-400 transition-colors">
                ChanGing
              </span>
              {/* 小星星装饰 */}
              <Star className="absolute -top-2 -right-2 text-yellow-300 h-4 w-4 animate-bounce-slow" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Y2KNavLink href="/">Home</Y2KNavLink>
            <Y2KNavLink href="/energy">Energy</Y2KNavLink>
            <Y2KNavLink href="/goal">Goals</Y2KNavLink>
            <Y2KNavLink href="/spanish">Spanish</Y2KNavLink>
            <Y2KNavLink href="/period">Period</Y2KNavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-pink-400 hover:bg-pink-50 hover:text-purple-400 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden absolute right-4 top-16 w-56 rounded-xl bg-white/90 shadow-lg border border-pink-200 transition-all duration-300 ease-out
          ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
        >
          <div className="py-2 space-y-1">
            <Y2KMobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</Y2KMobileNavLink>
            <Y2KMobileNavLink href="/energy" onClick={() => setMobileMenuOpen(false)}>Energy</Y2KMobileNavLink>
            <Y2KMobileNavLink href="/goal" onClick={() => setMobileMenuOpen(false)}>Goals</Y2KMobileNavLink>
            <Y2KMobileNavLink href="/spanish" onClick={() => setMobileMenuOpen(false)}>Spanish</Y2KMobileNavLink>
            <Y2KMobileNavLink href="/period" onClick={() => setMobileMenuOpen(false)}>Period</Y2KMobileNavLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }

        @keyframes bounce-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </header>
  );
}

function Y2KNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-3 py-1.5 text-sm font-extrabold text-pink-500 hover:text-purple-400 transition-all duration-300 group"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-full scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-80 transition-all duration-300 z-0"></span>
    </Link>
  );
}

function Y2KMobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-sm font-bold text-pink-500 hover:bg-gradient-to-r hover:from-pink-200 hover:via-purple-200 hover:to-cyan-200 hover:text-purple-700 rounded-lg transition-all duration-300"
    >
      {children}
    </Link>
  );
}
