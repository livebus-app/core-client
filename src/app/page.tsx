import { VehicleService } from "@/services/vehicle.service";
import VehicleList from "@/pages/vehicle-list/vehicle-list";

export default async function Home() {
	const vehicles = await new VehicleService().getVehicles();

	return (
		<main className="flex flex-col">
			<section className="flex flex-col">
				<VehicleList vehicles={vehicles} />
			</section>
		</main>
	);
}
