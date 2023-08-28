"use client";

import { CameraInfo } from "@/components/liveplayer";
import { Card } from "@/components/ui/card";
import { useDevices } from "@/hooks/useDevices";

export function CameraList({ vehicleId }: { vehicleId: number }) {
    const { devices } = useDevices(vehicleId);

    return <Card className="p-8">
        <main className="w-full grid gap-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {devices?.map(device => <CameraInfo key={device.id} camera={device} />)}
        </main>
    </Card>
}