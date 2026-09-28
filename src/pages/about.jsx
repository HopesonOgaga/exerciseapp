import React from "react";
import Nav from "../constant/nav";
import Footer from "../constant/footer";

const cardinfo = [
  {
    information:
      "Hi there! If you’re reading this, you probably have a lot going on. Work, school, personal goals, and all the little things that make up your day. Praisefit was created to make it easier to organize those things, build routines that fit your life, and stay consistent without making your day feel complicated.",
    image: "/images/about/pcfront.webp",
  },
  {
    information:
      "We believe building better habits should feel simple. Praisefit gives you a clear place to plan your tasks, create routines, and keep track of the small things that matter to you every day.",
    image: "/images/about/routine.webp",
  },
  {
    information:
      "Your routine doesn't have to be perfect. What matters is having a system that helps you keep moving forward. Praisefit is designed to help you stay organized, see your progress, and make consistency a little easier.",
    image: "/images/about/thankyoiu.webp",
  },
];

export const About = () => {
  return (
    <>
      <Nav />

      <section className="flex justify-center px-6 py-16 md:py-24">
        <section className="w-full max-w-6xl">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold capitalize text-gray-300">
              About Praisefit
            </p>

            <h1 className="max-w-4xl text-2xl font-bold capitalize leading-tight md:text-4xl">
              A simpler way to build better days
            </h1>
          </div>

          {/* Story */}
          <section className="mt-16 space-y-24">
            {cardinfo.map((info, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-between gap-12 md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text */}
                <div className="flex justify-center md:w-1/2">
                  <p className="max-w-md text-lg leading-8 text-gray-600">
                    {info.information}
                  </p>
                </div>

                {/* Image */}
                <div className="md:w-1/2">
                  <img
                    className="w-full rounded-2xl object-cover"
                    src={info.image}
                    alt="Praisefit routine dashboard"
                  />
                </div>
              </div>
            ))}
          </section>
        </section>
      </section>
      <Footer></Footer>
    </>
  );
};
