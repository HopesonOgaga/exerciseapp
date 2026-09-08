import React from "react";


export const UserNavProfile = () => {
  return (
    <section>
      <div className="flex items-center gap-4 p-4  bg-brand-primary/80  ">
        <div className="w-[10vw] h-[20vh] bg-brand-surface shadow-sm rounded-sm  border-4 border-brand-accent ">
          <img
            className="w-full h-full object-cover"
            src="/images/ladyexercise.jpg"
            alt="profile image"
          ></img>
        </div>
        <div className="flex flex-col gap-2 text-white capitalize">
          <p className="font-semibold ">hopeson ogaga</p>
          <p>@ogagahopesontega</p>
        </div>
      </div>
    </section>
  );
};
