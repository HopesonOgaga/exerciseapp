import React from "react";
import Nav from "../constant";
import Footer from "../constant/footer";

const info = [
  {
    title: " Create the perfect time",
    description: "The routine should fit your lifestyle.",
    image: "/images/ladyexercise.jpg",
    button: "start your rountine",
  },
  {
    title: " Create the perfect time",
    description: "The routine should fit your lifestyle.",
    image: "/images/ladyexercise.jpg",
    button: "start your rountine",
  },
  {
    title: " Create the perfect time",
    description: "The routine should fit your lifestyle.",
    image: "/images/ladyexercise.jpg",
    button: "start your rountine",
  },
];

const video_url = "https://res.cloudinary.com/dsiyqikl2/video/upload/v1787432084/ladyworkout_id1cvv.mp4"

export default function Index() {
  return (
    <section className="bg-mist-100">
      <Nav></Nav>
      <section>
        {/* video hero section */}
        <div className="relative w-full h-screen flex flex-col gap-6 justify-center items-center px-4">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
          <source src={video_url} type="video/mp4" />
          </video>

          {/* Light Dark Blur Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[1]" />

          {/* Hero Content - Clean & Direct */}
          <p className="text-white tracking-wider text-3xl sm:text-4xl capitalize font-semibold text-center max-w-2xl z-10 drop-shadow-md">
            Every day, it gets a little easier. But you gotta do it every day,
            that's the hard part.
          </p>

          <button className="w-44 h-12 shadow-md rounded-sm capitalize font-semibold cursor-pointer text-sm z-10 bg-brand-primary hover:bg-brand-primary/90 text-white transition-all">
            get started
          </button>

          <p className="z-10 text-white/90 text-sm font-medium drop-shadow-sm">
            Start for free. No credit card required.
          </p>
        </div>

        {/* card section */}

        <div className="flex flex-col lg:flex-row justify-center gap-6 mb-6 mt-4">
          {info.map((info, index) => {
            {
              return (
                <div className="bg-brand-secondary flex flex-col gap-5 w-full max-w-sm p-5 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full rounded-lg bg-brand-surface/30">
                    <img
                      className="w-full object-cover hover:scale-105 transition-transform duration-500 ease-out rounded-md "
                      src={info.image}
                      alt="Woman doing workout exercise routine"
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <h3 className="text-xl font-bold tracking-tight capitalize text-white">
                      {info.title}
                    </h3>
                    <p className="text-sm text-white capitalize leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                  <div>
                    <button className="h-14 bg-brand-primary text-white hover:bg-brand-accent cursor-pointer rounded-md p-4 capitalize">
                      {info.button}
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
      <Footer></Footer>
    </section>
  );
}