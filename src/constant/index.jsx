import React from "react";

function Nav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div>
          <a
            href="#"
            className="capitalize font-extrabold tracking-wider text-2xl text-white hover:text-brand-surface transition-colors"
          >
            praisefit
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 capitalize tracking-wide text-sm font-medium text-white/90">
            <li>
              <a
                href="#"
                className="hover:text-brand-surface transition-colors"
              >
                about us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-surface transition-colors"
              >
                professional services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-brand-surface transition-colors"
              >
                resources
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="cursor-pointer capitalize tracking-wide text-sm font-semibold text-white hover:text-brand-surface transition-colors">
            login
          </button>

          <button className="cursor-pointer bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            get started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
