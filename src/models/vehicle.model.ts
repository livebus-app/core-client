import { Device } from "./camera.model";

export type Vehicle = {
	id: number;
	name: string;
	Device?: Device[];
	maxSeats?: number;
};
