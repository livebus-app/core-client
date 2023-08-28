import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { VehicleService } from "@/services/vehicle.service";
import { CameraInfo } from "@/components/liveplayer";
import VehicleTelemetryPanel from "@/components/vehicle-telemetry-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/pages/dashboard/dashboard";
import { FrameList } from "@/pages/frame-list/frame-list";
import { CameraList } from "@/pages/camera-list/camera-list";

export default async function Home({ params }: { params: { id: number } }) {
	const vehicle = await new VehicleService().getVehicle(params.id);

	return (
		<Tabs className="relative h-full max-h-full overflow-auto grid grid-rows-[min-content,auto] gap-4">
			<header className="flex justify-between items-center">
				<h1 className="text-2xl font-semibold">{vehicle.name}</h1>
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
