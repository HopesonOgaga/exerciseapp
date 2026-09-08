import React from "react";
import { HabitCard } from "./habitcard";
import { DailyHabitCard } from "./dailyhabit";
import { TodoCard } from "./todo";

export const Card = () => {
  return (
    <section className="flex gap-4 justify-around p-4">
      <HabitCard></HabitCard>
      <DailyHabitCard></DailyHabitCard>
      <TodoCard></TodoCard>
    </section>
  );
};
