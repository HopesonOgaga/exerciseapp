import React, { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl min-h-screen md:min-h-[600px] my-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Form Container */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="flex flex-col gap-2">
                <a
                    href="/"
                    className="text-orange-400 hover:text-orange-500 hover:underline font-thin transition-colors capitalize text-sm"
                  >
                    head back to homepage
                  </a>
              <h1 className="font-bold text-3xl capitalize text-gray-900 tracking-tight">
                create an account
              </h1>

              <p className=""></p>
             
            </div>

            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 capitalize"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

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
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Create a password"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-gray-700 capitalize"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  placeholder="Confirm your password"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="cursor-pointer hover:bg-orange-700 active:bg-orange-400 bg-brand-primary text-white font-semibold h-11 w-full capitalize rounded-lg shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  sign up
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600 capitalize">
                  already have an account?{" "}
                  <a
                    href="/login"
                    className="text-orange-400 hover:text-orange-500 hover:underline font-semibold transition-colors capitalize"
                  >
                    Log in
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

export default SignUp;