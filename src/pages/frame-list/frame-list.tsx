"use client";

import { DatePickerWithRange } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDevices } from "@/hooks/useDevices";
import { useFrames } from "@/hooks/useFrames";
import {
  useVehicleTelemetry,
  useVehicleTelemetryHistory,
  useVehicleTelemetryHistoryFrames,
} from "@/hooks/useVehicleTelemetry";
import { CameraService } from "@/services/camera.service";
import { VehicleService } from "@/services/vehicle.service";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function FrameList(props: FrameListProps) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const vehicleService = new VehicleService();

  const { telemetryHistory, isLoading } = useVehicleTelemetryHistoryFrames(
    props.vehicleId,
    dateRange
  );

  function onChangeDate(date: DateRange) {
    setDateRange(date);
  }

  return (
    <section>
      <header className="mb-8">
        <DatePickerWithRange onChange={onChangeDate} />
      </header>
      <main>
        {isLoading ? (
          <>Carregando</>
        ) : (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...(telemetryHistory || [])]
              .sort((a, b) =>
                parseInt(b.timestamp) > parseInt(a.timestamp) ? 1 : -1
              )
              .filter((telemetryItem) => telemetryItem.objectKey)
              .map((telemetryItem) => (
                <div
                  key={telemetryItem.objectKey}
                  className="rounded-sm relative h-auto object-fill pb-[100%] overflow-hidden ring-1 ring-border"
                >
                  <Image
                    key={telemetryItem.objectKey}
                    className="overflow-hidden object-cover"
                    fill={true}
                    src={`https://s3.amazonaws.com/lvb-frames-storage/${telemetryItem.objectKey}`}
                    alt=""
                  />
                </div>
              ))}
          </section>
        )}
      </main>
    </section>
  );
}

type FrameListProps = {
  vehicleId: number;
};
