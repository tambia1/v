import { Entity } from "../core/Entity";
import { Position } from "../core/Position";

type ProductionBuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	costGold: number;
	costIron: number;
	costOil: number;

	productionStore: Entity[];
};

export abstract class ProductionBuilding extends Entity {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public productionStore: Entity[];
	public productionQueue: Entity[];
	public products: Entity[];

	constructor(params: ProductionBuildingParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.productionStore = params.productionStore;
		this.productionQueue = [];
		this.products = [];
	}

	public addEntityToProductionQueue(entity: Entity) {
		this.productionQueue.push(entity);
	}

	public removeEntityFromProductionQueue(entity: Entity) {
		const index = this.productionQueue.indexOf(entity);
		if (index > -1) {
			this.productionQueue.splice(index, 1);
		}
	}

	public addEntity(entity: Entity) {
		this.products.push(entity);
	}

	public removeEntity(entity: Entity) {
		const index = this.products.indexOf(entity);
		if (index > -1) {
			this.products.splice(index, 1);
		}
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		if (this.productionQueue.length === 0) {
			return;
		}

		const currentEntity = this.productionQueue[0];
		const progressToAdd = timeDif / 1000;
		currentEntity.addBuildProgress(progressToAdd);

		if (currentEntity.isBuilt()) {
			this.productionQueue.shift();
			this.products.push(currentEntity);
		}
	}
}
