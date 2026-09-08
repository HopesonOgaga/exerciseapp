import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/login">
            <button className="cursor-pointer capitalize tracking-wide text-sm font-semibold text-white hover:text-brand-surface transition-colors">
              login
            </button>
          </Link>

          <Link to="/signup">
            <button className="cursor-pointer capitalize tracking-wide text-sm font-semibold text-white hover:text-brand-surface transition-colors">
              get started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Nav;
