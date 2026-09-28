
import React from "react";
import Nav from "../constant/nav";
import Footer from "../constant/footer";

export const Contactus = () => {
  return (
    <>
      <Nav />

      <main className="w-full px-6 py-16 md:py-24">
        <section className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="mb-16 flex flex-col gap-4">
          

            <h1 className="max-w-3xl text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
              Let’s make your days a little easier.
            </h1>

            <p className="max-w-lg text-base leading-7 text-gray-500 md:text-lg">
              Have a question, suggestion, or just want to say hello?
              We’d love to hear from you.
            </p>
          </div>

          {/* Contact Area */}
          <div className="grid overflow-hidden rounded-3xl bg-brand-surface md:grid-cols-5">
            {/* Left Side */}
            <div className="flex flex-col justify-between p-8 md:col-span-2 md:p-12">
              <div>
                <p className="mb-3 text-2xl font-bold text-gray-900">
                  Start a conversation.
                </p>

                <p className="leading-7 text-gray-600">
                  Whether you're having trouble with your routine, have an
                  idea for Praisefit, or simply want to connect, send us a
                  message.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    hello@praisefit.com
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Response time
                  </p>

                  <p className="mt-1 text-gray-700">
                    Usually within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:col-span-3 md:p-12">
              <form className="space-y-7">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Your name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-brand-primary"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-brand-primary"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Subject
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What can we help with?"
                    className="w-full border-b border-gray-200 bg-transparent px-0 py-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-brand-primary"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    className="w-full resize-none border-b border-gray-200 bg-transparent px-0 py-3 text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-brand-primary"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="cursor-pointer group relative mt-2 w-full overflow-hidden rounded-md border border-brand-primary bg-white px-6 py-4 font-semibold text-brand-primary transition"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    Send message
                  </span>

                  <span className="absolute inset-x-0 bottom-0 h-0 bg-brand-primary transition-all duration-300 ease-out group-hover:h-full" />
                </button>
              </form>
            </div>
          </div>

          
        </section>
      </main>

      <Footer />
    </>
  );
};
