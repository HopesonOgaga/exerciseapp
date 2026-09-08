import React from "react";
import { DashboardNav } from "./dashboardnav";
import { UserNavProfile } from "./usernavprofile";
import Footer from "../../constant/footer";
import { Search } from "./search";
import { Card } from "../cards";

export const Dashboard = () => {
  return (
    <section className="overflow-x-hidden">
      <DashboardNav></DashboardNav>
      <UserNavProfile></UserNavProfile>
      <Search></Search>
      <Card></Card>
      <Footer></Footer>
    </section>
  );
};
