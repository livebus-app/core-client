"use client";
import { VehicleService } from "@/services/vehicle.service";
import useSWR from "swr";

export function useVehicle(id: number) {
    const { data, error } = useSWR(`/vehicle/${id}`, () => new VehicleService().getVehicle(id));

    return {
        vehicle: data,
        isLoading: !error && !data,
        isError: error,
    };
}