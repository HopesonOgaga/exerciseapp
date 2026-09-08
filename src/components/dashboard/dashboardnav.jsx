import React from "react";
import { RefreshCw, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardNav = () => {
  return (
    <section>
      <section className="flex justify-between px-6  py-4 bg-brand-primary  backdrop-blur-sm text-white  border-b border-brand-primary/20">
        <div className="flex gap-6 items-center ">
          <div>
            <Link to="/">
              {" "}
              <a
                href="#"
                className="capitalize font-extrabold tracking-wider text-2xl  hover:text-brand-surface transition-colors"
              >
                praisefit
              </a>
            </Link>
          </div>{" "}
          <p className="hover:text-brand-surface transition-colors cursor-pointer capitalize ">
            task
          </p>
          <p className="hover:text-brand-surface transition-colors cursor-pointer capitalize ">
            help
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <RefreshCw className="w-5 h-5 cursor-pointer" />
          </div>
          <div>
            <Bell className="w-5 h-5 cursor-pointer " />
          </div>
          <div>
            <User className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </section>
    </section>
  );
};
