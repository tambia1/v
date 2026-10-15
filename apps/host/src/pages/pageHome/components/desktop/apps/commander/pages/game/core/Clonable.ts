import { Entity } from "./Entity";

export interface Clonable {
	clone(params: { x: number; y: number }): Entity;
}
