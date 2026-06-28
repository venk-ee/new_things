import { Button } from "./Button"

export function HabitForm() {
    return <form className="flex gap-2">
        <input className="flex-1 rounded-lg bg-zinc-800 px-2 py-1 placeholder:text-zinc-600 outline-none focus-visible:ring-2 focus-visible:ring-violet-300" type="text" placeholder="New Habit....." />
        <Button>Add Habit</Button>
    </form>
}