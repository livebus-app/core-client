import { Card } from "@/components/ui/card";

export default function Loading() {
    return (
        <div>
            <div className="h-[36px] col-span-4 flex items-center justify-between mb-4">
                <Card className="h-[36px] w-[154px] bg-muted/50 animate-pulse"></Card>
                <Card className="h-[36px] w-[154px] bg-muted/50 animate-pulse"></Card>
            </div>
            <main className="h-full max-h-full grid gap-6 grid-cols-4 grid-rows-[200px, auto] overflow-auto">
                <Card className="animate-pulse row-span-1 col-span-1 flex flex-col gap-4 bg-muted/50">

                </Card>
                <Card className="animate-pulse row-span-1 col-span-1 rounded-[--radius] border border-border bg-muted/50">

                </Card>

                <Card className="animate-pulse col-span-2 row-span-4 bg-muted/50 overflow-hidden relative">

                </Card>

                <Card className="animate-pulse col-span-2 row-span-3 overflow-hidden p-8 bg-muted/50 flex flex-col">

                </Card>
            </main>
        </div>
    )
}