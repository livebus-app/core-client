"use client";

import useSWR from "swr";
import { VehicleService } from "@/services/vehicle.service";

export function useDevices(id: number) {
    console.info("123")
    const { data: devices, } = useSWR(`vehicles/${id}/devices`, () => new VehicleService().getDevices(id));

    return { devices };
}