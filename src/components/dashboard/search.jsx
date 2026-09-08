import React from "react";

export const Search = () => {
  return (
    <section className="flex items-center gap-14 p-4 justify-center w-full ">
      <div className="w-[40%]">
        <input
          type="text"
          placeholder="search"
          className="w-[90%] h-[5vh] rounded-sm border-2 border-brand-accent/80 p-2 m-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
        ></input>
      </div>
      <div>
        <button className="bg-brand-primary/70  text-white capitalize cursor-pointer py-2 px-4 rounded-sm hover:bg-brand-accent/80 focus:outline-none focus:ring-2 focus:ring-brand-accent/50">
          add task
        </button>
      </div>
    </section>
  );
};
