export interface Touchable {
	isTouched(x: number, y: number): boolean;
	onTouch(): void;
	onTouchHover(): void;
	onTouchHoverEnd(): void;
}
