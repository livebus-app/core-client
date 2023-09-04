import { Vehicle } from "@/models/vehicle.model";
import { BaseService } from "./base.service";

export class AlertService extends BaseService {
	constructor() {
		super("/alerts");
	}

	async getNonExpired(vehicleId: number): Promise<Alert[]> {
		return this.get(`?vehicle_id=${vehicleId}`);
	}
}

type Alert = {
    id: number;
    type: string;
    description: string;
    deviceId: string;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}