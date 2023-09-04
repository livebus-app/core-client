"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDevices } from "@/hooks/useDevices";
import { useFrames } from "@/hooks/useFrames";
import { useVehicleTelemetry, useVehicleTelemetryHistory } from "@/hooks/useVehicleTelemetry";
import { CameraService } from "@/services/camera.service";
import { VehicleService } from "@/services/vehicle.service";
import Image from "next/image";
import { useState } from "react";

export default function FrameList(props: FrameListProps) {
    const vehicleService = new VehicleService();
    const { telemetryHistory } = useVehicleTelemetryHistory(props.vehicleId);

    return (
        <section>
            <header>
               
            </header>
            <main>
                <section className="grid grid-cols-6">
                    {
                        [...telemetryHistory || []].sort((a, b) => parseInt(b.timestamp) > parseInt(a.timestamp) ? 1 : -1).filter(telemetryItem => telemetryItem.objectKey).map(telemetryItem => (
                            <div key={telemetryItem.objectKey} className="relative h-auto object-fill pb-[100%] overflow-hidden">
                                <Image key={telemetryItem.objectKey} className="overflow-hidden object-cover" fill={true} src={`https://s3.amazonaws.com/lvb-frames-storage/${telemetryItem.objectKey}`} alt="" />
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