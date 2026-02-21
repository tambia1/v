/**
 * Interface for entities that can be drawn on a canvas
 */
export interface Drawable {
	draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * Interface for entities that can be updated each frame
 */
export interface Updatable {
	update(timeDif: number): void;
}

/**
 * Interface for entities that can be selected
 */
export interface Selectable {
	isSelected: boolean;
	setIsSelected(value: boolean): void;
	getIsSelected(): boolean;
}

/**
 * Interface for entities that can be hovered
 */
export interface Hoverable {
	isHovered: boolean;
	setIsHovered(value: boolean): void;
	getIsHovered(): boolean;
}

