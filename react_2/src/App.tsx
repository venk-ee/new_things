import { Headder } from "./components/Hedder"
import { HabitForm } from "./components/habit_form"
import { HabitList } from "./components/habit_list"
export default function App() {
  return <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
    <Headder />
    <HabitForm />
    <HabitList />

  </div>
}



