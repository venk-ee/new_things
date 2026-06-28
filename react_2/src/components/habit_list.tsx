import { Button } from "./Button"
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { format } from "date-fns"
export function HabitList() {
    const habits = [{ id: "1", name: "lol" },]

    if (habits.length == 0) {
        return <p className="text-zinc-400 text-center">No habits yet... Add one to start</p>
    }

    return <div className="flex flex-col gap-3">
        {habits.map(habit => (
            <HabitItem key={habit.id} habit={habit} />
        ))}

    </div>
}

type HabitItemProps = {
    habit: { id: string, name: string }
}
function HabitItem({ habit }: HabitItemProps) {
    const visibleDays = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    })

    return <div className="rounded-xl bg-zinc-800  p-4">
        <div className="flex items-center justify-between ">
            <div className="flex gap-3 items-center">
                <span className="fount-medium">{habit.name}</span>
                <span className="text-sm text-amber-400">Streak:3 </span>
            </div>
            <div className="flex gap-2">
                <Button>delete</Button>
            </div>
        </div>
        <div className="flex gap-1.5 ">
            {visibleDays.map(date => (
                <Button key={date.toISOString()}>
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span>{format(date, "d")}</span>
                </Button>
            ))}
        </div>
    </div>
}