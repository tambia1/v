import { Castle, IType as ICastleType } from "./Castle";
import { IType as IUnitType, Unit } from "./Unit";
import Utils from "./Utils";

export type IType = "good" | "bad";

type IStyle = {
	castles: { x: number; y: number; type: ICastleType }[];
	stacks: { x: number; y: number }[];
	lifeFillStyle: string;
	lifeStrokeStyle: string;
	castleWeaponRangeFillStyle: string;
};

const styles: { [K in IType]: IStyle } = {
	bad: {
		castles: [
			{ x: 190, y: 244, type: "castle1" },
			{ x: 275, y: 200, type: "castle2" },
			{ x: 360, y: 244, type: "castle1" },
		],

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
		castles: [
			{ x: 190, y: 475, type: "castle1" },
			{ x: 275, y: 520, type: "castle2" },
			{ x: 360, y: 475, type: "castle1" },
		],

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
	private static readonly STACK_SCALE_UNSELECTED = 1.0;
	private static readonly STACK_SCALE_NEXT = 0.4;

	private static readonly imageElixir = Utils.getImage("./images/misc/elixir.png");
	private static readonly imageElixirBg = Utils.getImage("./images/misc/elixirBg.png");

	private type: IType;
	private playerName: string;

	private deck: IUnitType[] = [];
	private castles: Castle[] = [];
	private units: Unit[] = [];

	private stack: (Unit | null)[] = [null, null, null, null, null];
	private stackSelected: number = -1;
	private energy: number = 0;
	private energyMax: number = 0;
	private energyTiming: number = 0;

	private elixir: number = 0;
	private elixirMax: number = 0;
	private elixirTiming: number = 0;

	constructor(playerName: string, type: IType, deck: IUnitType[]) {
		this.type = type;
		this.playerName = playerName;

		this.initDeck(deck);
		this.initCastles();
		this.initUnits();
		this.initStack();
		this.initElixir();
	}

	private initDeck(deck: IUnitType[]) {
		this.deck = [];

		while (deck.length > 0) {
			let j = Utils.getRandomNumber(0, deck.length - 1);
			this.deck.push(deck[j]);

			deck.splice(j, 1);
		}
	}

	private initCastles() {
		this.castles = new Array<Castle>(styles[this.type].castles.length);

		for (let i = 0; i < this.castles.length; i++) {
			this.castles[i] = new Castle(styles[this.type].castles[i].type);
			this.castles[i].setXY(styles[this.type].castles[i].x, styles[this.type].castles[i].y);
			this.castles[i].setLifeColor(styles[this.type].lifeStrokeStyle, styles[this.type].lifeFillStyle);
			this.castles[i].setWeaponRangeColor(styles[this.type].castleWeaponRangeFillStyle);
		}
	}

	private initUnits() {
		this.units = [];
	}

	private initStack() {
		this.stack = [null, null, null, null, null];
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

	public getPlayerName() {
		return this.playerName;
	}

	public drawElixir(ctx: CanvasRenderingContext2D) {
		ctx.save();

		let x = 125;
		let y = this.type == "good" ? 650 : 95;
		let w = 430 - x;
		let h = 10;

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
		if (this.stack[0] != null) {
			this.stack[0].drawImage(ctx);
		}

		for (let i = 1; i < this.stack.length; i++) {
			let unit = this.stack[i];

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
			// this.units[i].drawWeaponRange(ctx);
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
		let type = this.deck.shift();

		if (type != null) {
			{
				let unit = new Unit(type);

				unit.setLifeColor(styles[this.type].lifeStrokeStyle, styles[this.type].lifeFillStyle);
				this.deck.push(type);

				return unit;
			}
		}

		return null;
	}

	public putSelectedStackOnGrid(x: number, y: number) {
		if (this.stackSelected != -1) {
			let unit = this.stack[this.stackSelected];

			if (unit != null && this.elixir >= unit.getElixirNeeded()) {
				this.stack[this.stackSelected] = null;
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
		if (this.stack[0] == null) {
			let isNextStackUnique = null;

			do {
				this.stack[0] = this.getUnitFromDeck()!;
				this.stack[0].setLoading(1);
				isNextStackUnique = true;

				for (let i = 1; i < this.stack.length; i++) {
					if (this.stack[0].getType() == this.stack[i]?.getType()) {
						isNextStackUnique = false;
						break;
					}
				}
			} while (isNextStackUnique == false);

			this.stack[0].setXY(styles[this.type].stacks[0].x, styles[this.type].stacks[0].y);
			this.stack[0].setOpacity(0, 1, 700);
			this.stack[0].setScale(Player.STACK_SCALE_NEXT, Player.STACK_SCALE_NEXT, 0);
		}
	}

	public updateStack(timeDif: number) {
		this.energy += timeDif / this.energyTiming;
		this.energy = Math.min(this.energy, this.energyMax);

		for (let i = 1; i < this.stack.length; i++) {
			if (this.stack[i] == null && this.stack[0] != null && this.energy >= this.energyMax) {
				this.energy = 0;

				this.stack[i] = this.stack[0];
				this.stack[0] = null;

				this.stack[i]!.setXY(styles[this.type].stacks[i].x, styles[this.type].stacks[i].y);
				this.stack[i]!.setOpacity(this.stack[i]!.getOpacity(), 1, 300);
				this.stack[i]!.setScale(Player.STACK_SCALE_UNSELECTED, Player.STACK_SCALE_UNSELECTED, 0);
			}
		}
	}

	public updateStackLoading(_timeDif: number) {
		for (let i = 1; i < this.stack.length; i++) {
			if (this.stack[i] != null) {
				let loading = this.elixir / this.stack[i]!.getElixirNeeded();

				this.stack[i]!.setLoading(loading);
			}
		}
	}

	public updateStacks(timeDif: number) {
		for (let i = 0; i < this.stack.length; i++) {
			this.stack[i]?.update(timeDif);
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
