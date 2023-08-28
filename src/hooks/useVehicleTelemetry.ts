import useSWR from 'swr';
import { VehicleService } from "@/services/vehicle.service";

export function useVehicleTelemetry(id: number) {
    const service = new VehicleService();
    const { data, error, isLoading } = useSWR(`vehicle-telemetry-${id}`, () => service.getTelemetry(id), {
        refreshInterval: 5000,
    });

    return {
        telemetry: data,
        isLoading,
        error
    };
}

export function useVehicleTelemetryHistory(id: number) {
    const service = new VehicleService();
    const { data, error, isLoading } = useSWR(`vehicle-telemetry-history-${id}`, () => service.getTelemetryHistory(id), {
        refreshInterval: 5000,
    });

    return {
        telemetryHistory: data,
        isLoading,
        error
    };
}