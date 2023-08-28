import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { VehicleService } from "@/services/vehicle.service";
import Link from "next/link";
import { VehicleList } from "@/pages/vehicle-list/vehicle-list";

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
