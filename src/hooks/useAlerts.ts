"use client";

import { AlertService } from '@/services/alert.service';
import useSWR from "swr";

export default function useAlerts(vehicleId: number) {
    const { data, error } = useSWR(`alerts-${vehicleId}`, () => new AlertService().getNonExpired(vehicleId), { refreshInterval: 5000 });

    return {
        alerts: data,
        isLoading: !error && !data,
        isError: error
    };
}