import React from "react";
import { HabitCard } from "./habitcard";
import { DailyHabitCard } from "./dailyhabit";
import { TodoCard } from "./todo";

export const Card = () => {
  return (
    <section className="mx-auto grid max-w-7xl items-start gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
      <HabitCard />
      <DailyHabitCard />
      <TodoCard />
    </section>
  );
};