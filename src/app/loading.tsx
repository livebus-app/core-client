export default function Loading() {
    return <div className="absolute w-screen h-screen inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-semibold">
                live<span className="text-yellow-400">bus</span>
            </h1>
        </div>
    </div>
}