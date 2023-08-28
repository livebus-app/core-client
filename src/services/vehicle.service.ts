import { Vehicle } from "@/models/vehicle.model";
import { BaseService } from "./base.service";
import { Telemetry } from "@/models/telemetry.model";
import { Device } from "@/models/camera.model";

export class VehicleService extends BaseService {
	constructor() {
		super("/vehicle");
	}

	async getVehicles() {
		return await this.get<Vehicle[]>();
	}

	async getVehicle(id: number) {
		return await this.get<Vehicle>(`${id}`);
	}

	async getDevices(id: number): Promise<Device[]> {
		return this.get<Device[]>(`${id}/devices`);
	}

	async getTelemetry(id: number) {
		return await this.get<Telemetry>(`${id}/telemetry`);
	}

	async getTelemetryHistory(id: number) {
		return await this.get<Telemetry[]>(`${id}/telemetry/history`);
	}
}
