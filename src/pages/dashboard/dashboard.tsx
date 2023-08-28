"use client";

import { Maps } from "@/components/maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useVehicle } from "@/hooks/useVehicle";
import { useVehicleTelemetry, useVehicleTelemetryHistory } from "@/hooks/useVehicleTelemetry";
import Image from "next/image";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Text, Label, LineChart, Line, ReferenceLine, Legend } from "recharts"

export function Dashboard({ vehicleId }: { vehicleId: number }) {
    const { vehicle } = useVehicle(vehicleId);
    const { telemetry } = useVehicleTelemetry(vehicleId);
    const { telemetryHistory } = useVehicleTelemetryHistory(vehicleId);

    const sortedTelemetryHistory = useMemo(() => telemetryHistory?.sort((historyItemA, historyItemB) => new Date(historyItemA.timestamp) > new Date(historyItemB.timestamp) ? 1 : -1), [telemetryHistory]);
    
    return (
        <main className="h-full max-h-full grid gap-6 grid-cols-4 grid-rows-[200px, auto] overflow-auto">
            <Card className="row-span-1 col-span-1 flex flex-col gap-4 bg-gradient-to-tr from-muted/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-12 pb-2">
                    <CardTitle className="font-medium">
                        Número de passageiros
                        <p className="mt-2 text-sm text-muted-foreground">Ocupação máxima: {vehicle?.maxSeats || "N/A"}</p>
                    </CardTitle>
                    <svg className="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 256 256"><path fill="currentColor" d="M64.12 147.8a4 4 0 0 1-4 4.2H16a8 8 0 0 1-7.8-6.17a8.35 8.35 0 0 1 1.62-6.93A67.79 67.79 0 0 1 37 117.51a40 40 0 1 1 66.46-35.8a3.94 3.94 0 0 1-2.27 4.18A64.08 64.08 0 0 0 64 144c0 1.28 0 2.54.12 3.8Zm182-8.91A67.76 67.76 0 0 0 219 117.51a40 40 0 1 0-66.46-35.8a3.94 3.94 0 0 0 2.27 4.18A64.08 64.08 0 0 1 192 144c0 1.28 0 2.54-.12 3.8a4 4 0 0 0 4 4.2H240a8 8 0 0 0 7.8-6.17a8.33 8.33 0 0 0-1.63-6.94Zm-89 43.18a48 48 0 1 0-58.37 0A72.13 72.13 0 0 0 65.07 212A8 8 0 0 0 72 224h112a8 8 0 0 0 6.93-12a72.15 72.15 0 0 0-33.74-29.93Z"></path></svg>
                </CardHeader>
                <CardContent>
                    <div className="text-9xl font-bold">{telemetry?.passengerCount || 0}</div>
                </CardContent>
            </Card>
            <Card className="row-span-1 col-span-1 rounded-[--radius] border border-border bg-gradient-to-tr from-muted/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-12 pb-2">
                    <CardTitle className="font-medium">
                        Número de passageiros x Tempo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer className={"-ml-6"} width={"104%"} height={180}>
                        <LineChart data={sortedTelemetryHistory} className="mt-4 mr-4" >
                            <XAxis
                                dataKey="timestamp"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={true}
                                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                            />
                            <YAxis
                                allowDecimals={false}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={true}
                                tickFormatter={(value) => value}
                            />
                            <Line dot={false} strokeWidth={1.5} type={"monotone"} dataKey="passengerCount" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />

                            {vehicle?.maxSeats && <ReferenceLine y={vehicle.maxSeats} opacity={0.4} stroke="hsl(var(--primary))" strokeDasharray="3 3" />}

                            <Label value="Pages of my website" offset={0} position="insideBottom" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-2 row-span-4 bg-gradient-to-tr from-muted/20 overflow-hidden relative">
                <Maps />
            </Card>

            <Card className="col-span-2 row-span-3 overflow-hidden p-8 bg-gradient-to-tr from-muted/20 flex flex-col">
                <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 gap-12 pb-4">
                    <CardTitle className="font-medium">
                        Telemetria recente
                    </CardTitle>
                </CardHeader>
                <Table className="col-span-4 flex-shrink-0">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Número de passageiros</TableHead>
                            <TableHead>Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="overflow-auto h-full">
                        {
                            [...sortedTelemetryHistory || []].sort((a, b) => b.id - a.id)?.map(telemetryItem => (
                                <TableRow>
                                    <TableCell className="font-medium">{telemetryItem.id}</TableCell>
                                    <TableCell>{telemetryItem.passengerCount}</TableCell>
                                    <TableCell>{new Date(telemetryItem.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                            )
                            )
                        }
                    </TableBody>
                </Table>
            </Card>
        </main>
    )
}