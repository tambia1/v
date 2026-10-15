export interface Product {
	name: string;
	buildProgress: number;
	timeToBuild: number;

	getTimeToBuild(): number;
	getBuildProgress(): void;
	addBuildProgress(progress: number): void;
	isBuilt(): void;
}
