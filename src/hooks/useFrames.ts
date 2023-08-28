"use client";

import useSWR from "swr";

import { CameraService as DeviceService } from "@/services/camera.service";

export function useFrames(id?: string) {
    const { data: framesObject, } = useSWR(id ? `devices/${id}/frames` : undefined, () => new DeviceService().getFrames(id || ""));

    return { framesObject };
}