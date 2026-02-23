type EntityParams = {
	name: string;
	image: HTMLImageElement;
};

export abstract class Entity {
	public name: string;
	public image: HTMLImageElement;

	constructor(params: EntityParams) {
		this.name = params.name;
		this.image = params.image;
	}
}
