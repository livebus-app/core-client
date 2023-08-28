import { Vehicle } from "@/models/vehicle.model";
import { BaseService } from "./base.service";

export class CameraService extends BaseService {
	constructor() {
		super("/device");
	}

	async getLivestream(id: number): Promise<{ url?: string }> {
		return this.get<{ url?: string }>(`livestream/${id}`);
	}

	async getStreamingData(id: number): Promise<CameraStreamingData> {
		return this.get<CameraStreamingData>(`${id}/streaming-data`);
	}

	async getFrames(id: string): Promise<FramesObject> {
		return this.get<FramesObject>(`${id}/frames`);
	}
}

type FramesObject = {
	Contents: CameraFrame[];
	IsTruncated: boolean;
	KeyCount: number;
	MaxKeys: number;
	Name: string;
	Prefix: string;
	EncodingType: string;
	NextContinuationToken: string;
}

type CameraFrame = {
	Key: string;
	LastModified: string;
	ETag: string;
	Size: number;
	StorageClass: string;
}

type Livestream = {
	url: string | null;
};

type StreamProcessor = {
	status: string;
	statusMessage: string;
};

export type CameraStreamingData = {
	livestream: Livestream;
	streamProcessor: StreamProcessor;
};
