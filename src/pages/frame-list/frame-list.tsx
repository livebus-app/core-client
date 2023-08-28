"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDevices } from "@/hooks/useDevices";
import { useFrames } from "@/hooks/useFrames";
import { CameraService } from "@/services/camera.service";
import { VehicleService } from "@/services/vehicle.service";
import Image from "next/image";
import { useState } from "react";

export default function FrameList(props: FrameListProps) {
    const vehicleService = new VehicleService();
    const [selectedDevice, setSelectedDevice] = useState<string>();

    const { devices } = useDevices(props.vehicleId);
    const { framesObject } = useFrames(selectedDevice)


    return (
        <section>
            <header>
                { }
                <Select onValueChange={value => setSelectedDevice(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Dispositivo" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            devices?.map(device => (
                                <SelectItem key={device.id} value={device.id.toString()}>{device.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </header>
            <main>
                <section className="grid grid-cols-6">
                    {
                        framesObject?.Contents?.map(frame => (
                            <div key={frame.Key} className="relative h-64 object-fill">
                                <Image key={frame.Key} className="overflow-hidden object-cover" fill={true} src={`https://s3.amazonaws.com/lvb-frames-storage/${frame.Key}`} alt="" />
                            </div>
                        ))
                    }
                </section>
            </main>
        </section>
    )
}

type FrameListProps = {
    vehicleId: number;
}