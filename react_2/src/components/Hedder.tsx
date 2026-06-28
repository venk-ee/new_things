import { Button } from './Button';

export function Headder() {
    return <header className="flex items-center justify-between ">
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">haabit tracker</h1>
            <span className="text-zinc-400 text-sm">1/1 done today </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
            <span className="text-zinc-400 text-sm">july 5-9</span>
            <div className="flex items-center gap-3">
                <Button> prev</Button>
                <Button>next</Button>
            </div>
        </div>
    </header>
}