import { VehicleService } from "@/services/vehicle.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/pages/dashboard/dashboard";
import CameraList from "@/pages/camera-list/camera-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home({ params }: { params: { id: number } }) {
	const vehicle = await new VehicleService().getVehicle(params.id);

	return (
		<Tabs defaultValue="dashboard" className="relative h-full max-h-full overflow-auto grid grid-rows-[min-content,auto] gap-8">
			<header className="flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Link href={"/"}>
						<Button size={"icon"} variant={"secondary"}>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H69l51.52 51.51a12 12 0 0 1-17 17l-72-72a12 12 0 0 1 0-17l72-72a12 12 0 0 1 17 17L69 116h147a12 12 0 0 1 12 12Z"></path></svg>
						</Button>
					</Link>
					<h1 className="text-3xl font-medium">{vehicle.name}</h1>
				</div>
				<TabsList className="w-max">
					<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
					<TabsTrigger value="live">Live</TabsTrigger>
				</TabsList>
			</header>
			<TabsContent className="h-full mt-0 max-h-full overflow-auto" value="dashboard">
				<Dashboard vehicleId={vehicle.id} />
			</TabsContent>
			<TabsContent className="h-full mt-0 max-h-full overflow-auto" value="live">
				<CameraList vehicleId={params.id} />
			</TabsContent>
		</Tabs>
	);
}
