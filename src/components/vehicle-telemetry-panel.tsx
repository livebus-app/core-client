"use client";

import useSWR from "swr";
import { Vehicle } from "@/models/vehicle.model";
import { Badge } from "./ui/badge";
import { useVehicleTelemetry } from "@/hooks/useVehicleTelemetry";

export default function VehicleTelemetryPanel(props: VehicleTelemetryPanelProps) {
    const { telemetry } = useVehicleTelemetry(props.vehicle.id);

    return <section className="text-sm flex gap-4">
        <span>Número de passageiros: <Badge variant="outline">{telemetry?.passengerCount || 0}</Badge></span>
        <span>Alertas: <Badge variant="outline">0</Badge></span>
    </section>
}

type VehicleTelemetryPanelProps = {
    vehicle: Vehicle;
}