export interface Touchable {
	isTouched(x: number, y: number): boolean;
	onTouchStart(): void;
	onTouchEnd(): void;
	onTouchHoverStart(): void;
	onTouchHoverEnd(): void;
}
