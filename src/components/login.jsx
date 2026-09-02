import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl min-h-screen md:min-h-[600px] my-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Form Container */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-3xl capitalize text-gray-900 tracking-tight">
                welcome back, olivia
              </h1>
              <p className="text-gray-500 text-sm">
                welcome back, please enter your details
              </p>
            </div>

            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 capitalize"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 capitalize"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="cursor-pointer hover:bg-orange-700 active:bg-orange-400 bg-brand-primary text-white font-semibold h-11 w-full capitalize rounded-lg shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  login
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600 capitalize">
                  dont have an account?{" "}
                  <a
                    href="/signup"
                    className="text-orange-400 hover:text-orange-500 hover:underline font-semibold transition-colors capitalize"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Hero Image Container */}
        <div
          className="hidden md:flex flex-1 bg-cover bg-center relative items-end p-12"
          style={{ backgroundImage: "url('/images/walter.gif')" }}
        >
          {/* Subtle Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="relative z-10 flex flex-col gap-4 max-w-md bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <p className="text-white text-base font-medium leading-relaxed drop-shadow">
              we move 10x faster than our peers and stay consistent. while
              they're bogged down, we keep moving forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;