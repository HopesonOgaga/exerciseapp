import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext"; // Adjust path to your AuthContext

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth(); // Assuming signUp method is exposed in AuthContext, or use supabase directly

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;
      setSuccessMsg("Account created successfully! Please check your email to verify your account.");
    } catch (err) {
      setErrorMsg(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
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
            </div>

            {/* Detailed Error Pop / Banner */}
            {errorMsg && (
              <div className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-fadeIn">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Sign Up Error</h3>
                  <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Success Banner */}
            {successMsg && (
              <div className="flex items-start gap-3 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm animate-fadeIn">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-800">Success</h3>
                  <p className="text-xs text-green-700 mt-0.5">{successMsg}</p>
                </div>
              </div>
            )}

            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer hover:bg-orange-600 active:bg-orange-400 bg-brand-primary text-white font-semibold h-11 w-full capitalize rounded-lg shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "sign up"}
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