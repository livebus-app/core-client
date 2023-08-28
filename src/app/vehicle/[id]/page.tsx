import { VehicleService } from "@/services/vehicle.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/pages/dashboard/dashboard";
import CameraList from "@/pages/camera-list/camera-list";

export default async function Home({ params }: { params: { id: number } }) {
	const vehicle = await new VehicleService().getVehicle(params.id);
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(10000);
	return (
		<Tabs defaultValue="dashboard" className="relative h-full max-h-full overflow-auto grid grid-rows-[min-content,auto] gap-4">
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
