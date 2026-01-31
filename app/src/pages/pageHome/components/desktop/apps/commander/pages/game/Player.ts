import { Building, type BuildingName } from "./Building";
import { UtilsImage } from "./core/UtilsImage";
import { UtilsMath } from "./core/UtilsMath";
import imageelixirBg from "./images/misc/elixirBg.png";
import imageElixirFg from "./images/misc/elixirFg.png";
import { type UnitType as IUnitType, Unit } from "./Unit";

export type PlayerType = "good" | "bad";

type PlayerData = {
	castles: { x: number; y: number; type: BuildingName }[];
	stacks: { x: number; y: number }[];
	lifeFillStyle: string;
	lifeStrokeStyle: string;
	castleWeaponRangeFillStyle: string;
};

const styles: { [K in PlayerType]: PlayerData } = {
	bad: {
		castles: [{ x: 275, y: 210, type: "building2" }],

		stacks: [
			{ x: 120, y: 145 },
			{ x: 170, y: 145 },
			{ x: 230, y: 145 },
			{ x: 290, y: 145 },
			{ x: 350, y: 145 },
		],

		lifeFillStyle: "#cc0000ff",
		lifeStrokeStyle: "#ff0000ff",

		castleWeaponRangeFillStyle: "#aa000033",
	},

	good: {
		castles: [{ x: 275, y: 520, type: "building2" }],

		stacks: [
			{ x: 120, y: 610 },
			{ x: 170, y: 610 },
			{ x: 230, y: 610 },
			{ x: 290, y: 610 },
			{ x: 350, y: 610 },
		],

		lifeFillStyle: "#00cc00ff",
		lifeStrokeStyle: "#00ff00ff",

		castleWeaponRangeFillStyle: "#00aa0033",
	},
};

export class Player {
	public static readonly STACK_SCALE_SELECTED = 1.2;
	public static readonly STACK_SCALE_UNSELECTED = 1.0;
	public static readonly STACK_SCALE_NEXT = 0.4;

	private static readonly imageElixir = UtilsImage.getImage(imageElixirFg);
	private static readonly imageElixirBg = UtilsImage.getImage(imageelixirBg);

	private type: PlayerType;
	private playerName: string;

	private decks: IUnitType[] = [];
	private castles: Building[] = [];
	private units: Unit[] = [];

	private stacks: (Unit | null)[] = [null, null, null, null, null];
	private stackSelected = -1;
	private energy = 0;
	private energyMax = 0;
	private energyTiming = 0;

	private elixir = 0;
	private elixirMax = 0;
	private elixirTiming = 0;

	constructor(playerName: string, type: PlayerType, deck: IUnitType[]) {
		this.type = type;
		this.playerName = playerName;

		this.initDeck(deck);
		this.initCastles();
		this.initUnits();
		this.initStack();
		this.initElixir();
	}

	private initDeck(deck: IUnitType[]) {
		this.decks = [];

		while (deck.length > 0) {
			const j = UtilsMath.getRandomNumber(0, deck.length - 1);
			this.decks.push(deck[j]);

			deck.splice(j, 1);
		}
	}

	private initCastles() {
		this.castles = new Array<Building>(styles[this.type].castles.length);

		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i] = new Building(styles[this.type].castles[i].type);
			this.castles[i].setXY(styles[this.type].castles[i].x, styles[this.type].castles[i].y);
			this.castles[i].setLifeColor(styles[this.type].lifeStrokeStyle, styles[this.type].lifeFillStyle);
			this.castles[i].setWeaponRangeColor(styles[this.type].castleWeaponRangeFillStyle);
		}
	}

	private initUnits() {
		this.units = [];
	}

	private initStack() {
		this.stacks = [null, null, null, null, null];
		this.stackSelected = -1;

		this.energy = 0;
		this.energyMax = 0.5;
		this.energyTiming = 1000;
	}

	private initElixir() {
		this.elixir = 0;
		this.elixirMax = 10;
		this.elixirTiming = 2000;
	}

	public getType() {
		return this.type;
	}

	public getPlayerName() {
		return this.playerName;
	}

	public getStacks() {
		return this.stacks;
	}

	public setStackSelected(stackSelected: number) {
		this.stackSelected = stackSelected;
	}

	public getStackSelected() {
		return this.stackSelected;
	}

	public getCastles() {
		return this.castles;
	}

	public getUnits() {
		return this.units;
	}

	public drawElixir(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const x = 125;
		const y = this.type === "good" ? 650 : 95;
		const w = 430 - x;
		const h = 10;

		for (let i = 0; i < 10; i++) {
			ctx.drawImage(Player.imageElixirBg, 0, 0, 145, 31, x + i * Math.floor(w / 10), y, Math.floor(w / 10), h);
		}

		ctx.rect(x, y, Math.floor((w / 10) * this.elixir), h);
		ctx.clip();

		for (let i = 0; i < 10; i++) {
			ctx.drawImage(Player.imageElixir, 0, 0, 145, 31, x + i * Math.floor(w / 10) + 0, y, Math.floor(w / 10) - 0, h);
		}

		ctx.restore();
	}

	public drawStack(ctx: CanvasRenderingContext2D) {
		if (this.stacks[0] != null) {
			this.stacks[0].drawImage(ctx);
		}

		for (let i = 1; i < this.stacks.length; i++) {
			const unit = this.stacks[i];

			if (unit != null) {
				unit.drawImage(ctx);
				unit.drawLoading(ctx);
			}
		}
	}

	public drawCastles(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i].drawWeaponRange(ctx);
		}

		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i].drawImage(ctx);
			this.castles[i].drawLife(ctx);
		}
	}

	public drawUnits(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].drawWeaponRange(ctx);
		}

		for (let i = 0; i < this.units.length; i++) {
			this.units[i].drawImage(ctx);
			this.units[i].drawLife(ctx);
		}
	}

	public drawAttacks(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].drawAttack(ctx);
		}

		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i].drawAttack(ctx);
		}
	}

	private getUnitFromDeck() {
		const type = this.decks.shift();

		if (type != null) {
			{
				const unit = new Unit(type);

				unit.setLifeColor(styles[this.type].lifeStrokeStyle, styles[this.type].lifeFillStyle);
				this.decks.push(type);

				return unit;
			}
		}

		return null;
	}

	public putSelectedStackOnGrid(x: number, y: number) {
		if (this.stackSelected !== -1) {
			const unit = this.stacks[this.stackSelected];

			if (unit != null && this.elixir >= unit.getElixirNeeded()) {
				this.stacks[this.stackSelected] = null;
				this.stackSelected = -1;
				this.energy = 0;

				this.units.push(unit);

				unit.setXY(x, y);
				unit.setScale(1.0, 1.0, 0);

				this.elixir -= unit.getElixirNeeded();
			}
		}
	}

	public update(timeDif: number) {
		this.updateElixir(timeDif);
		this.updateStackNext(timeDif);
		this.updateStack(timeDif);
		this.updateStackLoading(timeDif);
		this.updateStacks(timeDif);
		this.updateCastles(timeDif);
		this.updateUnits(timeDif);
	}

	public updateElixir(timeDif: number) {
		this.elixir += timeDif / this.elixirTiming;
		this.elixir = Math.min(this.elixir, this.elixirMax);
	}

	public updateStackNext(_timeDif: number) {
		if (this.stacks[0] == null) {
			let isNextStackUnique = null;

			do {
				this.stacks[0] = this.getUnitFromDeck()!;
				this.stacks[0].setLoading(1);
				isNextStackUnique = true;

				for (let i = 1; i < this.stacks.length; i++) {
					if (this.stacks[0].getType() === this.stacks[i]?.getType()) {
						isNextStackUnique = false;
						break;
					}
				}
			} while (isNextStackUnique === false);

			this.stacks[0].setXY(styles[this.type].stacks[0].x, styles[this.type].stacks[0].y);
			this.stacks[0].setOpacity(0, 1, 700);
			this.stacks[0].setScale(Player.STACK_SCALE_NEXT, Player.STACK_SCALE_NEXT, 0);
		}
	}

	public updateStack(timeDif: number) {
		this.energy += timeDif / this.energyTiming;
		this.energy = Math.min(this.energy, this.energyMax);

		for (let i = 1; i < this.stacks.length; i++) {
			if (this.stacks[i] == null && this.stacks[0] != null && this.energy >= this.energyMax) {
				this.energy = 0;

				this.stacks[i] = this.stacks[0];
				this.stacks[0] = null;

				this.stacks[i]!.setXY(styles[this.type].stacks[i].x, styles[this.type].stacks[i].y);
				this.stacks[i]!.setOpacity(this.stacks[i]!.getOpacity(), 1, 300);
				this.stacks[i]!.setScale(Player.STACK_SCALE_UNSELECTED, Player.STACK_SCALE_UNSELECTED, 0);
			}
		}
	}

	public updateStackLoading(_timeDif: number) {
		for (let i = 1; i < this.stacks.length; i++) {
			if (this.stacks[i] != null) {
				const loading = this.elixir / this.stacks[i]!.getElixirNeeded();

				this.stacks[i]!.setLoading(loading);
			}
		}
	}

	public updateStacks(timeDif: number) {
		for (let i = 0; i < this.stacks.length; i++) {
			this.stacks[i]?.update(timeDif);
		}
	}

	public updateCastles(timeDif: number) {
		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i].update(timeDif);
		}
	}

	public updateUnits(timeDif: number) {
		for (let i = 0; i < this.units.length; i++) {
			this.units[i].update(timeDif);
		}
	}
}
