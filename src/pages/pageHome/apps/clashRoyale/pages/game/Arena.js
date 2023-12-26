export const Arena = function (type) {
	this.type = type;
};

Arena.types = {
	arena1: { imageName: "images/arenas/arena1.jpg", image: null },
	arena2: { imageName: "images/arenas/arena2.jpg", image: null },
	arena3: { imageName: "images/arenas/arena3.jpg", image: null },
	arena4: { imageName: "images/arenas/arena4.jpg", image: null },
	arena5: { imageName: "images/arenas/arena5.jpg", image: null },
	arena6: { imageName: "images/arenas/arena6.jpg", image: null },
	arena7: { imageName: "images/arenas/arena7.jpg", image: null },
	arena8: { imageName: "images/arenas/arena8.jpg", image: null },
	arena9: { imageName: "images/arenas/arena9.jpg", image: null },
	arena10: { imageName: "images/arenas/arena10.jpg", image: null },
	arena11: { imageName: "images/arenas/arena11.jpg", image: null },
};

Arena.prototype.drawImage = function (ctx) {
	ctx.save();
	ctx.drawImage(Arena.types[this.type].image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
	ctx.restore();
};
