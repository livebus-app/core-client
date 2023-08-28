"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import Hls from "hls.js";
import { Device } from "@/models/camera.model";
import { CameraService, CameraStreamingData } from "@/services/camera.service";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";

export function LivePlayer({ sourceURL, loading }: LivePlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && sourceURL && Hls.isSupported()) {
            const hls = new Hls();
            hls.lowLatencyMode = true;

            hls.loadSource(sourceURL);
            hls.attachMedia(videoRef.current);

            videoRef.current.play();
        }
    }, [sourceURL]);

    return (
        <section className={`max-w-full relative bg-red-950 rounded-[--radius] overflow-hidden`}>
            {loading && (
                <div className="w-full h-full absolute grid place-items-center bg-muted">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="4" cy="12" r="3" fill="currentColor">
                            <animate
                                id="svgSpinners3DotsFade0"
                                fill="freeze"
                                attributeName="opacity"
                                begin="0;svgSpinners3DotsFade1.end-0.25s"
                                dur="0.75s"
                                values="1;.2"
                            ></animate>
                        </circle>
                        <circle cx="12" cy="12" r="3" fill="currentColor" opacity=".4">
                            <animate
                                fill="freeze"
                                attributeName="opacity"
                                begin="svgSpinners3DotsFade0.begin+0.15s"
                                dur="0.75s"
                                values="1;.2"
                            ></animate>
                        </circle>
                        <circle cx="20" cy="12" r="3" fill="currentColor" opacity=".3">
                            <animate
                                id="svgSpinners3DotsFade1"
                                fill="freeze"
                                attributeName="opacity"
                                begin="svgSpinners3DotsFade0.begin+0.3s"
                                dur="0.75s"
                                values="1;.2"
                            ></animate>
                        </circle>
                    </svg>
                </div>
            )}
            {!sourceURL && !loading && (
                <div className="w-full h-full absolute grid place-items-center bg-muted">
                    <div className="flex items-center justify-center flex-col gap-2 text-">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 256 256"
                        >
                            <path
                                fill="currentColor"
                                d="M213.92 210.62a8 8 0 1 1-11.84 10.76l-52-57.15a60 60 0 0 0-57.41 7.24a8 8 0 1 1-9.42-12.93A75.43 75.43 0 0 1 128 144c1.28 0 2.55 0 3.82.1l-26.92-29.61A108 108 0 0 0 61 135.31A8 8 0 0 1 49.73 134A8 8 0 0 1 51 122.77a124.27 124.27 0 0 1 41.71-21.66L69.37 75.4a155.43 155.43 0 0 0-40.29 24A8 8 0 0 1 18.92 87A171.87 171.87 0 0 1 58 62.86L42.08 45.38a8 8 0 1 1 11.84-10.76ZM128 192a12 12 0 1 0 12 12a12 12 0 0 0-12-12ZM237.08 87A172.3 172.3 0 0 0 106 49.4a8 8 0 1 0 2 15.87A158.33 158.33 0 0 1 128 64a156.25 156.25 0 0 1 98.92 35.37A8 8 0 0 0 237.08 87ZM195 135.31a8 8 0 0 0 11.24-1.3a8 8 0 0 0-1.3-11.24a124.25 124.25 0 0 0-51.73-24.2a8 8 0 1 0-3.21 15.67a108.12 108.12 0 0 1 45 21.07Z"
                            ></path>
                        </svg>
                        <span className="text-xs">Offline</span>
                    </div>
                </div>
            )}
            <video className="bg-card" ref={videoRef} autoPlay />
        </section>
    );
}

export function CameraInfo({ camera }: { camera: Device }) {
    const { toast } = useToast();

    const [isFetching, setIsFetching] = useState(false);
    const [streamingData, setStreamingData] = useState<CameraStreamingData>();

    const fetchData = async () => {
        setIsFetching(true);
        const livestreamData = await new CameraService().getStreamingData(
            camera.id,
        );

        setStreamingData(livestreamData);
        setIsFetching(false);
    };

    useEffect(() => {
        fetchData();
    }, [camera]);

    const copyCode = () => {
        navigator.clipboard.writeText(camera.id.toString());
        console.info("123")
        toast({
            description: "Código copiado para a área de transferência",
        });
    };

    const livePlayerActions = [
        {
            label: "Recarregar",
            action: fetchData,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                >
                    <path
                        fill="currentColor"
                        d="M240 56v48a8 8 0 0 1-8 8h-48a8 8 0 0 1 0-16h27.4l-26.59-24.36l-.25-.24a80 80 0 1 0-1.67 114.78a8 8 0 0 1 11 11.63A95.44 95.44 0 0 1 128 224h-1.32a96 96 0 1 1 69.07-164L224 85.8V56a8 8 0 1 1 16 0Z"
                    ></path>
                </svg>
            ),
        },
        {
            label: "Copiar código",
            action: copyCode,
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                >
                    <path
                        fill="currentColor"
                        d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"
                    ></path>
                </svg>
            ),
        },
    ];

    return (
        <div>
            <header>
                <div className="flex items-center justify-between gap-4">
                    <h1 className="ffont-mono-sans uppercase">{camera.name}</h1>
                    <LivePlayerActions actions={livePlayerActions} />
                </div>
            </header>

            <main className="mt-4">
                <LivePlayer
                    loading={isFetching}
                    sourceURL={streamingData?.livestream.url || ""}
                />
                <div className="mt-4 flex flex-col gap-3">
                    <div className="text-xs w-full flex items-center justify-between">
                        <span className="text-muted-foreground">Code</span>
                        <span
                            onClick={copyCode}
                            className="font-medium cursor-pointer select-none flex items-center gap-2 font-mono-sans"
                        >
                            {camera.id}
                        </span>
                    </div>
                    <div className="text-xs w-full flex items-center justify-between">
                        <span className="text-muted-foreground">Streaming endpoint</span>
                        <Badge
                            className="uppercase font-medium cursor-pointer select-none flex items-center gap-2 font-mono-sans"
                        >
                            {
                                streamingData?.livestream.url ? "Copiar" : "OFFLINE"
                            }
                        </Badge>
                    </div>
                </div>
            </main>
        </div>
    );
}

export function LivePlayerActions({
    actions,
}: { actions: { label: string; action: () => void; icon: JSX.Element }[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant={"outline"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="currentColor"
                            d="M140 128a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm56-12a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm-136 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z"
                        ></path>
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((action) => (
                    <DropdownMenuItem
                        key={action.label}
                        className="items-center gap-2"
                        onClick={action.action}
                    >
                        {action.icon}
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export type LivePlayerProps = {
    sourceURL?: string;
    loading?: boolean;
};
