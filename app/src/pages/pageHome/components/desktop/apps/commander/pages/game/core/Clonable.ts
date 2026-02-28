export interface Clonable<T> {
	clone(params: { x: number; y: number }): T;
}
