import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

function getDisplayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Account"
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const pill = (isActive) =>
  `px-4 py-2 rounded-full text-sm font-semibold capitalize transition-colors ${
    isActive
      ? "bg-gray-900 text-white"
      : "text-white hover:bg-orange-600"
  }`;

function Nav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const name = getDisplayName(user);

  const links = [
    ...(user ? [{ to: "/dashboard", label: "dashboard" }] : []),
    { to: "/about", label: "about us" },
    { to: "/contactus", label: "contact us" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    setMobileOpen(false);
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-orange-500 transition-shadow duration-200 ${
        scrolled || mobileOpen ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: logo + links */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 pr-3 py-1.5 rounded-full hover:bg-orange-600 transition-colors pl-1.5"
          >
            <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-orange-600 font-extrabold text-lg">
              p
            </span>
            <span className="hidden sm:block capitalize font-extrabold tracking-tight text-xl text-white">
              praisefit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-2">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => pill(isActive)}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="cursor-pointer flex items-center gap-1 p-1 pr-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-orange-600 text-sm font-bold">
                  {getInitials(name)}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-white transition-transform ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                role="menu"
                className={`absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 transition-all duration-150 ${
                  menuOpen
                    ? "opacity-100 scale-100"
                    : "pointer-events-none opacity-0 scale-95"
                }`}
              >
                <p className="px-3 pt-1 pb-1 text-xs text-gray-500">Signed in as</p>
                <div className="flex items-center gap-3 px-3 py-2 mb-1 rounded-xl">
                  <span className="grid place-items-center h-11 w-11 rounded-full bg-orange-500 text-white font-bold">
                    {getInitials(name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate capitalize">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  role="menuitem"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <LayoutDashboard size={17} /> Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  role="menuitem"
                  className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={17} /> Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="capitalize text-sm font-semibold text-white bg-gray-900 hover:bg-black px-5 py-2.5 rounded-full transition-colors"
              >
                log in
              </Link>
              <Link
                to="/signup"
                className="capitalize text-sm font-semibold text-gray-900 bg-white hover:bg-orange-50 px-5 py-2.5 rounded-full transition-colors"
              >
                sign up
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden cursor-pointer grid place-items-center h-10 w-10 rounded-full text-white hover:bg-orange-600 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile panel (solid orange) */}
      <div
        className={`md:hidden grid transition-all duration-300 ease-out ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-4 pb-4">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `${pill(isActive)} py-3`}
              >
                {label}
              </NavLink>
            ))}

            <div className="h-px bg-white/30 my-2" />

            {user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-1">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-white text-orange-600 font-bold">
                    {getInitials(name)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate capitalize">
                      {name}
                    </p>
                    <p className="text-xs text-white/80 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gray-900 py-3 rounded-full"
                >
                  <LogOut size={16} /> Log out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 text-center capitalize text-sm font-semibold text-white bg-gray-900 py-3 rounded-full"
                >
                  log in
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center capitalize text-sm font-semibold text-gray-900 bg-white py-3 rounded-full"
                >
                  sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;