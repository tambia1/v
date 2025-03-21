// version: 1.0.2

export type Callback = {
	position: number;
	callback: (result: CallbackResult) => void;
};

export type CallbackResult = {
	animation: Animation;
	results: number[];
	routes: number[][];
	time: number;
	timing: number[];
	positionInPoints: number;
	positionInPercent: number;
	isRunning: boolean;
};

type Props = {
	routes: number[][];
	time: number;
	timing: number[];
	onCalculate: ((callbackResult: CallbackResult) => void) | null;
	callbacks: Callback[];
};

export class Animation {
	public static readonly TIMING_LINEAR = [0, 100];
	public static readonly TIMING_EASE_IN = [0, 10, 100];
	public static readonly TIMING_EASE_OUT = [0, 90, 100];
	public static readonly TIMING_EASE = [0, 10, 50, 90, 100];

	private routes: number[][];
	private time: number;
	private timing: number[];

	private position: number;
	private actualPosition: number;
	private actualTime: number;

	private isRunning: boolean;

	private onCalculate: ((callbackResult: CallbackResult) => void) | null;

	private callbacks: Callback[];
	private callbacksCounters: number[];

	public results: number[];

	constructor({
		time = 1000,
		routes = [
			[0, 100],
			[0, 100],
		],
		timing = Animation.TIMING_LINEAR,
		onCalculate = null,
		callbacks = [],
	}: Partial<Props> = {}) {
		// init values
		this.routes = routes;
		this.timing = timing;
		this.time = time;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		this.isRunning = false;

		this.onCalculate = onCalculate;

		this.callbacks = callbacks;
		this.callbacksCounters = new Array(this.callbacks.length).fill(0);

		this.results = [];

		//calculate and init values
		this.setAnimation({
			time,
			routes,
			timing,
			onCalculate,
			callbacks,
		});
	}

	private static bezier_2(t: number, p0: number, p1: number): number {
		return p0 + t * (p1 - p0);
	}

	private static bezier_3(t: number, p0: number, p1: number, p2: number): number {
		return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
	}

	private static bezier_4(t: number, p0: number, p1: number, p2: number, p3: number): number {
		return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
	}

	private static bezier_5(t: number, p0: number, p1: number, p2: number, p3: number, p4: number): number {
		return (
			p0 * (1 - t) * (1 - t) * (1 - t) * (1 - t) +
			4 * p1 * t * (1 - t) * (1 - t) * (1 - t) +
			6 * p2 * t * t * (1 - t) * (1 - t) +
			4 * p3 * t * t * t * (1 - t) +
			p4 * t * t * t * t
		);
	}

	private static bezier_6(t: number, p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number {
		return (
			p0 * (1 - t) ** 5 +
			5 * p1 * t * (1 - t) ** 4 +
			10 * p2 * t ** 2 * (1 - t) ** 3 +
			10 * p3 * t ** 3 * (1 - t) ** 2 +
			5 * p4 * t ** 4 * (1 - t) +
			p5 * t ** 5
		);
	}

	private static bezier1D(t: number, arrayPoints: number[]): number {
		const map: { [K: number]: number } = {
			2: Animation.bezier_2(t, arrayPoints[0], arrayPoints[1]),
			3: Animation.bezier_3(t, arrayPoints[0], arrayPoints[1], arrayPoints[2]),
			4: Animation.bezier_4(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3]),
			5: Animation.bezier_5(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4]),
			6: Animation.bezier_6(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4], arrayPoints[5]),
		};

		return map[arrayPoints.length];
	}

	private static bezier2D(t: number, arrayPoints: number[][]): number[] {
		const arrayResults: number[] = [];

		for (let i = 0; i < arrayPoints.length; i++) {
			arrayResults[i] = Animation.bezier1D(t, arrayPoints[i]);
		}

		return arrayResults;
	}

	public setAnimation({ routes, time, timing, onCalculate, callbacks }: Props): void {
		this.routes = routes;
		this.timing = timing;
		this.time = time !== 0 ? time : 0.0000000001;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		this.isRunning = false;

		this.onCalculate = onCalculate;

		this.callbacks = callbacks || [];
		this.callbacksCounters = [];

		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		this.calculateResults();
	}

	public setRoutes(routes: Props["routes"]): void {
		this.routes = routes;
		this.reset();
	}

	public calculate(): void {
		// Get current time
		const currentTime = +new Date();

		// If time is not set yet (this.time == 0) then take current time
		this.actualTime = this.actualTime || currentTime;

		// If we still not started then take current time and keep position
		if (this.isRunning === false) {
			this.actualTime = currentTime;
		}

		// Add this amount of time that passed to the current position
		const add = currentTime - this.actualTime;
		this.actualTime = currentTime;

		this.position = this.position + add;
		this.actualPosition = this.position;

		// Check if animation finished according to position and fix position if we are out of bounds
		if (this.position >= this.time) {
			this.isRunning = false;
			this.actualPosition = this.position - this.time;
			this.position = this.time;
		}

		// Calculate results
		this.calculateResults();

		// Save results to send to callbacks
		const callbackResult: CallbackResult = {
			animation: this,
			results: this.results,
			routes: this.routes,
			time: this.time,
			timing: this.timing,
			positionInPoints: this.getPositionInPoints(),
			positionInPercent: this.getPositionInPercent(),
			isRunning: this.isRunning,
		};

		// Run main callback
		this.onCalculate?.(callbackResult);

		// Run any other callback exist
		for (let i = 0; i < this.callbacks.length; i++) {
			if (this.position >= this.callbacks[i].position && this.callbacksCounters[i] === 0) {
				this.callbacksCounters[i] = 1;
				this.callbacks[i].callback(callbackResult);
			}
		}
	}

	private calculateResults(): void {
		// Manipulate position according to the time array
		let t = this.position / this.time;
		t = Animation.bezier1D(t, this.timing) / 100.0;
		this.results = Animation.bezier2D(t, this.routes);
	}

	public setPositionInPoints(position: number): void {
		this.position = position;
		this.actualPosition = this.position;
	}

	public getPositionInPoints(): number {
		return this.position;
	}

	public setPositionInPercent(positionPercent: number): void {
		this.setPositionInPoints((positionPercent * this.time) / 100);
	}

	public getPositionInPercent(): number {
		return ~~((this.position / this.time) * 100);
	}

	public getActualPositionInPercent(): number {
		return (this.actualPosition / this.time) * 100;
	}

	public resume(): void {
		this.isRunning = true;
		this.actualTime = 0;

		this.calculate();
	}

	public pause(): void {
		this.isRunning = false;

		this.calculate();
	}

	public reset(): void {
		this.isRunning = false;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		// reset all callbacks counters because we finished animation cycle
		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		// calculate results
		this.calculate();
	}

	public static rotate3dX(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		const ang = (a * Math.PI) / 180;

		return { x: x, y: y * Math.cos(ang) - z * Math.sin(ang), z: y * Math.sin(ang) + z * Math.cos(a) };
	}

	public static rotate3dY(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		const ang = (a * Math.PI) / 180;

		return { x: z * Math.sin(ang) + x * Math.cos(ang), y: y, z: z * Math.cos(ang) - x * Math.sin(ang) };
	}

	public static rotate3dZ(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		const ang = (a * Math.PI) / 180;

		return { x: x * Math.cos(ang) - y * Math.sin(ang), y: x * Math.sin(ang) + y * Math.cos(ang), z: z };
	}

	public static rotate3D(x: number, y: number, z: number, a: number, b: number, c: number): { x: number; y: number; z: number } {
		let arr = { x: x, y: y, z: z };
		arr = Animation.rotate3dZ(arr.x, arr.y, arr.z, c);
		arr = Animation.rotate3dY(arr.x, arr.y, arr.z, b);
		arr = Animation.rotate3dX(arr.x, arr.y, arr.z, a);

		return arr;
	}

	public static onElementVisible(
		element: HTMLElement,
		callback: (target: HTMLElement, isVisible: boolean, observer: IntersectionObserver) => void,
	): IntersectionObserver | null {
		const options = {};
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				callback(entry.target as HTMLElement, entry.intersectionRatio > 0, observer);
			});
		}, options);

		if (element) {
			observer.observe(element);

			return observer;
		}

		return null;
	}
}

export class AnimationLooper {
	private animations: Animation[];
	private requestAnimationFrameId: number;
	private isLooping: boolean;

	constructor() {
		this.animations = [];
		this.requestAnimationFrameId = 0;
		this.isLooping = true;
	}

	public setAnimations(animations: Animation[]): void {
		this.animations = animations;
	}

	public startLoop(): void {
		const requestAnimationFrameFunction = () => {
			this.animations.forEach((animation) => animation.calculate());

			if (this.isLooping === true) {
				this.requestAnimationFrameId = window.requestAnimationFrame(requestAnimationFrameFunction);
			}
		};

		this.isLooping = true;
		requestAnimationFrameFunction();
	}

	public stopLoop() {
		this.isLooping = false;
		window.cancelAnimationFrame(this.requestAnimationFrameId);
	}
}
