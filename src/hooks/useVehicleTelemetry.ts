import useSWR from "swr";
import { VehicleService } from "@/services/vehicle.service";
import { DateRange } from "react-day-picker";

export function useVehicleTelemetry(id: number) {
  const service = new VehicleService();
  const { data, error, isLoading } = useSWR(
    `vehicle-telemetry-${id}`,
    () => service.getTelemetry(id),
    {
      refreshInterval: 5000,
    }
  );

  return {
    telemetry: data,
    isLoading,
    error,
  };
}

export function useVehicleTelemetryHistory(id?: number) {
  const service = new VehicleService();
  const { data, error, isLoading } = useSWR(
    id ? `vehicle-telemetry-history-${id}` : undefined,
    () => service.getTelemetryHistory(id || 0),
    {
      refreshInterval: 5000,
    }
  );

  return {
    telemetryHistory: data,
    isLoading,
    error,
  };
}

export function useVehicleTelemetryHistoryFrames(
  id?: number,
  dateRange?: DateRange
) {
  const service = new VehicleService();
  const { data, error, isLoading } = useSWR(
    id ? `vehicle-telemetry-history-frames-${id}` : undefined,
    () => service.getTelemetryHistory(id || 0)
  );

  return {
    telemetryHistory: data,
    isLoading,
    error,
  };
}
