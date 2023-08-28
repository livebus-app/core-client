export class BaseService {
	protected readonly apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	protected basePath: string;

	constructor(basePath: string) {
		this.basePath = basePath;
	}

	get serviceURL(): string {
		const url = new URL(this.basePath, this.apiUrl);

		return url.toString() + "/";
	}

	protected async get<T>(path?: string): Promise<T> {
		console.info(this.serviceURL);
		const url = new URL(path || "", this.serviceURL);
		const response = await fetch(url);

		return await response.json();
	}
}
