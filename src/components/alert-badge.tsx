"use client";

import useAlerts from "@/hooks/useAlerts";
import { Badge } from "./ui/badge";

export default function AlertBadge({ vehicleId }: { vehicleId: number }) {
    const { alerts } = useAlerts(vehicleId);

    if (!alerts?.length) return null;

    return (
        <div className="relative">
            <div className="absolute bg-yellow-500 animate-pulse w-full h-full blur-xl saturate-150"></div>
            <Badge className="h-full font-lg flex gap-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"></path></svg>
                Alerta de objeto periculoso
            </Badge>
        </div>
    )
}