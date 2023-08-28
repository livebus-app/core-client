"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "@/models/vehicle.model";
import Link from "next/link";

export function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
    return (
        <div className="w-full">
            <h3 className="scroll-m-20 text-xl font-semibold mb-4">Veículos</h3>
            <div className="w-full grid gap-12 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="bg-gradient-to-tr from-yellow-950/20 hover:from-yellow-950/30 transition-colors">
                        <CardHeader>
                            <CardTitle className="mb-4 flex justify-between items-center">
                                <span className="font-medium">Veículo #{vehicle.id}</span>
                                <span className="text-muted-foreground font-normal uppercase font-mono-sans text-sm">{vehicle.name}</span>
                            </CardTitle>
                            <CardDescription className="font-mono-sans flex flex-col gap-2">
                                <span className="block"><span className="text-foreground">Dispositivos conectados:</span> 2</span>
                                <span className="block"><span className="text-foreground">Última atualização:</span> {new Date().toLocaleString()}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/vehicle/${vehicle.id}`}>
                                <Button className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M204 64v104a12 12 0 0 1-24 0V93L72.49 200.49a12 12 0 0 1-17-17L163 76H88a12 12 0 0 1 0-24h104a12 12 0 0 1 12 12Z"></path></svg>
                                    Acessar
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}