import { VehicleService } from "@/services/vehicle.service";
import VehicleList from "@/pages/vehicle-list/vehicle-list";

export default async function Home() {
	const vehicles = await new VehicleService().getVehicles();
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(2000);
	return (
		<main className="flex flex-col">
			<section className="flex flex-col">
				<VehicleList vehicles={vehicles} />
			</section>
		</main>
	);
}
