export const Explosion = function (type) {
	this.type = type;

	for (const k in Explosion.types[type]) {
		this[k] = Explosion.types[type][k];
	}

	this.isExploding = false;

	this.animation = new spa.Animation();
	this.animation.setRoute(this.time, [[0, this.frames]], spa.Animation.TIMING_LINEAR, spa.Animation.DIRECTION_FORWARD, 0, false, 0, false, null, [
		{ position: this.time, direction: spa.Animation.DIRECTION_FORWARD, callback: this.onExplosionFinish.bind(this) },
	]);
	this.animation.setPositionInPercent(100);
	this.animation.pause();

	this.sprite = parseInt(this.animation.arrayResults[0]);

	this.setWH(50, 50);
	this.setXY(0, 0);
};

Explosion.types = {
	explosion1: { imageName: "images/explosions/explosion_1_38_128.webp", image: null, size: 128, frames: 38, cols: 8, rows: 5, time: 5000 },
	explosion2: { imageName: "images/explosions/explosion_2_38_128.webp", image: null, size: 128, frames: 38, cols: 8, rows: 5, time: 5000 },
	explosion3: { imageName: "images/explosions/explosion_3_5_128.webp", image: null, size: 128, frames: 5, cols: 5, rows: 1, time: 800 },
	explosion4: { imageName: "images/explosions/explosion_4_39_128.webp", image: null, size: 128, frames: 39, cols: 8, rows: 5, time: 5000 },
	explosion5: { imageName: "images/explosions/explosion_5_5_128.webp", image: null, size: 128, frames: 5, cols: 8, rows: 1, time: 800 },
	explosion6: { imageName: "images/explosions/explosion_6_35_128.webp", image: null, size: 128, frames: 35, cols: 8, rows: 5, time: 3000 },
	explosion7: { imageName: "images/explosions/explosion_7_35_128.webp", image: null, size: 128, frames: 35, cols: 8, rows: 5, time: 3000 },
	explosion8: { imageName: "images/explosions/explosion_8_35_128.webp", image: null, size: 128, frames: 35, cols: 8, rows: 5, time: 3000 },
};

Explosion.prototype.x = null;
Explosion.prototype.y = null;
Explosion.prototype.w = null;
Explosion.prototype.h = null;

Explosion.prototype.draw = function (ctx) {
	if (this.sprite < this.frames) {
		ctx.save();

		let col = parseInt(this.sprite % this.cols);
		let row = parseInt(this.sprite / this.cols);

		ctx.drawImage(Explosion.types[this.type].image, col * this.size, row * this.size, this.size, this.size, this.cx, this.cy, this.w, this.h);

		ctx.restore();
	}
};

Explosion.prototype.setWH = function (w, h) {
	this.w = w;
	this.h = h;
};

Explosion.prototype.setXY = function (x, y) {
	this.x = x;
	this.y = y;
};

Explosion.prototype.startExplosion = function () {
	this.isExploding = true;

	this.animation.reset();
	this.animation.resume();
};

Explosion.prototype.stopExplosion = function () {
	this.isExploding = false;

	this.animation.setPositionInPercent(100);
	this.animation.pause();
};

Explosion.prototype.onExplosionFinish = function () {
	if (this.isExploding == true) {
		this.startExplosion();
	} else {
		this.stopExplosion();
	}
};

Explosion.prototype.update = function (timeDif) {
	this.animation.calculate();
	this.sprite = parseInt(this.animation.arrayResults[0]);

	this.cx = this.x - this.w / 2;
	this.cy = this.y - this.h / 2;
};
