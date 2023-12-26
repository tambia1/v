export const Player = function (playerName, type, deck) {
	this.playerName = playerName;
	this.type = type;

	this.deck = [];
	while (deck.length > 0) {
		let j = spa.Math.getRandomNumber(0, deck.length - 1);
		this.deck.push(deck[j]);

		deck.splice(j, 1);
	}

	this.initCastles();
	this.initUnits();
	this.initStack();
	this.initElixir();
};

Player.TYPE_GOOD = "TYPE_GOOD";
Player.TYPE_BAD = "TYPE_BAD";

Player.styles = {
	[Player.TYPE_BAD]: {
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

		weaponRangeFillStyle: "#aa000033",
	},

	[Player.TYPE_GOOD]: {
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

		weaponRangeFillStyle: "#00aa0033",
	},
};

Player.STACK_SCALE_SELECTED = 1.2;
Player.STACK_SCALE_UNSELECTED = 1.0;
Player.STACK_SCALE_NEXT = 0.4;

Player.prototype.type = null;
Player.prototype.deck = null;
Player.prototype.castles = null;
Player.prototype.units = null;
Player.prototype.stack = null;

Player.prototype.initCastles = function () {
	this.castles = new Array(Player.styles[this.type].castles.length);

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i] = new Castle(Player.styles[this.type].castles[i].type);
		this.castles[i].setXY(Player.styles[this.type].castles[i].x, Player.styles[this.type].castles[i].y);
		this.castles[i].setLifeColor(Player.styles[this.type].lifeStrokeStyle, Player.styles[this.type].lifeFillStyle);
		this.castles[i].setWeaponRangeColor(Player.styles[this.type].weaponRangeFillStyle);
	}
};

Player.prototype.initUnits = function () {
	this.units = [];
};

Player.prototype.initStack = function () {
	this.stack = new Array(5);
	this.stackSelected = -1;

	this.energy = 0;
	this.energyMin = 0;
	this.energyMax = 0.5;
	this.energyTiming = 1000;
};

Player.prototype.initElixir = function () {
	this.elixir = 0;
	this.elixirMin = 0;
	this.elixirMax = 10;
	this.elixirTiming = 2000;
};

Player.prototype.drawElixir = function (ctx) {
	ctx.save();

	let x = 125;
	let y = this.type == Player.TYPE_GOOD ? 650 : 95;
	let w = 430 - x;
	let h = 10;

	for (let i = 0; i < 10; i++) {
		ctx.drawImage(Game.imageElixirBg, 0, 0, 145, 31, x + i * parseInt(w / 10), y, parseInt(w / 10), h);
	}

	ctx.rect(x, y, parseInt((w / 10) * this.elixir), h);
	ctx.clip();

	for (let i = 0; i < 10; i++) {
		ctx.drawImage(Game.imageElixir, 0, 0, 145, 31, x + i * parseInt(w / 10) + 0, y, parseInt(w / 10) - 0, h);
	}

	ctx.restore();
};

Player.prototype.drawStack = function (ctx) {
	if (this.stack[0] != null) {
		this.stack[0].drawImage(ctx);
	}

	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] != null) {
			this.stack[i].drawImage(ctx);
			this.stack[i].drawLoading(ctx);
		}
	}
};

Player.prototype.drawCastles = function (ctx) {
	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawWeaponRange(ctx);
	}

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawImage(ctx);
		this.castles[i].drawLife(ctx);
	}
};

Player.prototype.drawUnits = function (ctx) {
	for (let i = 0; i < this.units.length; i++) {
		// this.units[i].drawWeaponRange(ctx);
	}

	for (let i = 0; i < this.units.length; i++) {
		this.units[i].drawImage(ctx);
		this.units[i].drawLife(ctx);
	}
};

Player.prototype.drawAttacks = function (ctx) {
	for (let i = 0; i < this.units.length; i++) {
		this.units[i].drawAttack(ctx);
	}

	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].drawAttack(ctx);
	}
};

Player.prototype.getUnitFromDeck = function () {
	let type = this.deck.shift();
	let unit = new Unit(type);

	unit.setLifeColor(Player.styles[this.type].lifeStrokeStyle, Player.styles[this.type].lifeFillStyle);
	unit.setWeaponRangeColor(Player.styles[this.type].weaponRangeFillStyle);

	this.deck.push(type);

	return unit;
};

Player.prototype.putSelectedStackOnGrid = function (x, y) {
	if (this.stackSelected != -1) {
		let unit = this.stack[this.stackSelected];

		if (this.elixir >= unit.elixirNeeded) {
			this.stack[this.stackSelected] = null;
			this.stackSelected = -1;
			this.energy = 0;

			this.units.push(unit);

			unit.setXY(x, y);
			unit.setScale(1.0, 1.0, 0);

			this.elixir -= unit.elixirNeeded;
		}
	}
};

Player.prototype.update = function (timeDif) {
	this.updateElixir(timeDif);
	this.updateStackNext(timeDif);
	this.updateStack(timeDif);
	this.updateStackLoading(timeDif);
	this.updateStacks(timeDif);
	this.updateCastles(timeDif);
	this.updateUnits(timeDif);
};

Player.prototype.updateElixir = function (timeDif) {
	this.elixir += timeDif / this.elixirTiming;
	this.elixir = Math.min(this.elixir, this.elixirMax);
};

Player.prototype.updateStackNext = function (timeDif) {
	if (this.stack[0] == null) {
		let isNextStackUnique = null;

		do {
			this.stack[0] = this.getUnitFromDeck();
			this.stack[0].setLoading(1);
			isNextStackUnique = true;

			for (let i = 1; i < this.stack.length; i++) {
				if (this.stack[0].type == this.stack[i]?.type) {
					isNextStackUnique = false;
					break;
				}
			}
		} while (isNextStackUnique == false);

		this.stack[0].setXY(Player.styles[this.type].stacks[0].x, Player.styles[this.type].stacks[0].y);
		this.stack[0].setOpacity(0, 1, 700);
		this.stack[0].setScale(Player.STACK_SCALE_NEXT, Player.STACK_SCALE_NEXT, 0);
	}
};

Player.prototype.updateStack = function (timeDif) {
	this.energy += timeDif / this.energyTiming;
	this.energy = Math.min(this.energy, this.energyMax);

	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] == null && this.stack[0] != null && this.energy >= this.energyMax) {
			this.energy = 0;

			this.stack[i] = this.stack[0];
			this.stack[0] = null;

			this.stack[i].setXY(Player.styles[this.type].stacks[i].x, Player.styles[this.type].stacks[i].y);
			this.stack[i].setOpacity(this.stack[i].alpha, 1, 300);
			this.stack[i].setScale(Player.STACK_SCALE_UNSELECTED, Player.STACK_SCALE_UNSELECTED, 0);
		}
	}
};

Player.prototype.updateStackLoading = function (timeDif) {
	for (let i = 1; i < this.stack.length; i++) {
		if (this.stack[i] != null) {
			let loading = this.elixir / this.stack[i].elixirNeeded;

			this.stack[i].setLoading(loading);
		}
	}
};

Player.prototype.updateStacks = function (timeDif) {
	for (let i = 0; i < this.stack.length; i++) {
		this.stack[i]?.update(timeDif);
	}
};

Player.prototype.updateCastles = function (timeDif) {
	for (let i = 0; i < this.castles.length; i++) {
		this.castles[i].update(timeDif);
	}
};

Player.prototype.updateUnits = function (timeDif) {
	for (let i = 0; i < this.units.length; i++) {
		this.units[i].update(timeDif);
	}
};
