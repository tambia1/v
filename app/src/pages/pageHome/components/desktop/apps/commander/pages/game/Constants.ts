// Grid configuration
export const GRID_SIZE = 40; // Size of each grid cell in pixels

export const COLORS = {
	// Map colors
	LAND_STROKE: "#00ff0033",
	SEA_FILL: "#0000ff88",

	// UI colors
	BOX_TITLE: "#ffff66",
	BOX_TEXT: "#ffffff",
	BOX_BG: "#000000",

	BOX_ITEM_HOVER: "#ffffff11",

	// Unit colors
	UNIT_LIFE_STROKE: "#ffffff",
	UNIT_LIFE_FILL: "#00ff00",
} as const;

// Player colors
export const PLAYER_COLORS = ["#00ff0088", "#ff000088", "#0000ff88", "#ffff0088", "#ff00ff88", "#00ffff88", "#ff800088", "#8000ff88"] as const;
