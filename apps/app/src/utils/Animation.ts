// version: 1.0.0

export type ICallback = {
	position: number;
	direction: number;
	callback: (result: ICallbackResult) => void;
};

export type ICallbackResult = {
	animation: Animation;
	results: number[];
	time: number;
	direction: number;
	delay: number;
	repeat: number;
	isDelayOnRepeat: boolean;
	isCyclic: boolean;
	positionInPoints: number;
	positionInPercent: number;
	isFinished: boolean;
};

type Props = {
	time: number;
	points: number[][];
	timing: number[];
	direction: -1 | 0 | 1;
	delay: number;
	repeat: number;
	isDelayOnRepeat: boolean;
	isCyclic: boolean;
	onCalculate: ((result: ICallbackResult) => void) | null;
	callbacks: ICallback[];
};

export class Animation {
	public static readonly DIRECTION_FORWARD = 1;
	public static readonly DIRECTION_STAND = 0;
	public static readonly DIRECTION_BACKWARD = -1;

	public static readonly TIMING_LINEAR = [0, 100];
	public static readonly TIMING_EASE_IN = [0, 10, 100];
	public static readonly TIMING_EASE_OUT = [0, 90, 100];
	public static readonly TIMING_EASE = [0, 10, 50, 90, 100];

	private points: number[][];
	private timing: number[];
	private time: number;
	private direction: number;
	private saveDirection: number;

	private position: number;
	private actualPosition: number;
	private actualTime: number;

	private isStarted: boolean;
	private isFinished: boolean;

	private onCalculate: ((result: ICallbackResult) => void) | null;

	private callbacks: ICallback[];
	private callbacksCounters: number[];

	private delay: number;
	private currentDelay: number;

	private repeat: number;
	private currentRepeat: number;
	private isDelayOnRepeat: boolean;

	private isCyclic: boolean;

	public results: number[];

	constructor({
		time = 1000,
		points = [
			[0, 100],
			[0, 100],
		],
		timing = Animation.TIMING_LINEAR,
		direction = Animation.DIRECTION_FORWARD,
		delay = 0,
		isDelayOnRepeat = false,
		repeat = 1,
		isCyclic = false,
		onCalculate = null,
		callbacks = [],
	}: Partial<Props> = {}) {
		// init values
		this.points = points;
		this.timing = timing;
		this.time = time;
		this.direction = direction;
		this.saveDirection = this.direction;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		this.isStarted = false;
		this.isFinished = true;

		this.onCalculate = onCalculate;

		this.callbacks = callbacks;
		this.callbacksCounters = new Array(this.callbacks.length).fill(0);

		this.delay = delay;
		this.currentDelay = this.delay;

		this.isDelayOnRepeat = isDelayOnRepeat;

		this.repeat = repeat;
		this.currentRepeat = this.repeat;

		this.isCyclic = isCyclic;

		this.results = [];

		//calculate and init values
		this.setAnimation({
			time: time,
			points: points,
			timing: timing,
			direction,
			delay: delay,
			isDelayOnRepeat: isDelayOnRepeat,
			repeat: repeat,
			isCyclic,
			onCalculate: onCalculate,
			callbacks: callbacks,
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
		return p0 * (1 - t) * (1 - t) * (1 - t) * (1 - t) + 4 * p1 * t * (1 - t) * (1 - t) * (1 - t) + 6 * p2 * t * t * (1 - t) * (1 - t) + 4 * p3 * t * t * t * (1 - t) + p4 * t * t * t * t;
	}

	private static bezier_6(t: number, p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number {
		return (
			p0 * Math.pow(1 - t, 5) +
			5 * p1 * t * Math.pow(1 - t, 4) +
			10 * p2 * Math.pow(t, 2) * Math.pow(1 - t, 3) +
			10 * p3 * Math.pow(t, 3) * Math.pow(1 - t, 2) +
			5 * p4 * Math.pow(t, 4) * (1 - t) +
			p5 * Math.pow(t, 5)
		);
	}

	private static bezier1D(t: number, arrayPoints: number[]): number {
		let arrayResults = 0;

		switch (arrayPoints.length) {
			case 2:
				arrayResults = Animation.bezier_2(t, arrayPoints[0], arrayPoints[1]);
				break;
			case 3:
				arrayResults = Animation.bezier_3(t, arrayPoints[0], arrayPoints[1], arrayPoints[2]);
				break;
			case 4:
				arrayResults = Animation.bezier_4(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3]);
				break;
			case 5:
				arrayResults = Animation.bezier_5(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4]);
				break;
			case 6:
				arrayResults = Animation.bezier_6(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4], arrayPoints[5]);
				break;
			default:
				throw new Error("Error in Animation.bezier1D(): too many points.");
		}

		return arrayResults;
	}

	private static bezier2D(t: number, arrayPoints: number[][]): number[] {
		const arrayResults: number[] = [];

		for (let i = 0; i < arrayPoints.length; i++) {
			arrayResults[i] = Animation.bezier1D(t, arrayPoints[i]);
		}

		return arrayResults;
	}

	public setAnimation({ time, points, timing, direction, delay: delay, isDelayOnRepeat, repeat, isCyclic, onCalculate, callbacks }: Props): void {
		// Save args
		this.points = points;
		this.timing = timing;
		this.time = time !== 0 ? time : 0.0000000001;
		this.direction = direction;
		this.saveDirection = direction;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		this.isStarted = false;
		this.isFinished = true;

		this.onCalculate = onCalculate;

		this.callbacks = callbacks || [];
		this.callbacksCounters = [];

		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		this.delay = delay;
		this.currentDelay = delay;

		this.isDelayOnRepeat = isDelayOnRepeat;

		this.repeat = repeat;
		this.currentRepeat = repeat;

		this.isCyclic = isCyclic;

		// Calculate results
		this.calculateResults();
	}

	public calculate(): void {
		// Get current time
		const currentTime = +new Date();

		// If time is not set yet (this.time == 0) then take current time
		this.actualTime = this.actualTime || currentTime;

		// If we already started then wait till delay before start finishes
		if (this.isStarted === true && this.currentDelay > 0) {
			this.currentDelay -= currentTime - this.actualTime;

			if (this.currentDelay < 0) {
				this.currentDelay = 0;
			}
		}

		// If we still not started then take current time and keep position
		if (this.isStarted === false || this.currentDelay > 0 || this.isFinished === true) {
			this.actualTime = currentTime;
		}

		// Add this amount of time that passed to the current position
		const add = (currentTime - this.actualTime) * this.direction;
		this.actualTime = currentTime;

		this.position = this.position + add;
		this.actualPosition = this.position;

		// Check if animation finished according to position
		// and fix position if we are out of bounds
		if (this.direction === 1 && this.position >= this.time) {
			this.isFinished = true;
			this.actualPosition = this.position - this.time;
			this.position = this.time;
		} else if (this.direction === -1 && this.position <= 0) {
			this.isFinished = true;
			this.actualPosition = this.position + this.time;
			this.position = 0;
		}

		// Calculate results
		this.calculateResults();

		// Save results to send to callbacks
		const callbackResult: ICallbackResult = {
			animation: this,
			results: this.results,
			time: this.time,
			delay: this.currentDelay,
			isDelayOnRepeat: this.isDelayOnRepeat,
			positionInPoints: this.getPositionInPoints(),
			positionInPercent: this.getPositionInPercent(),
			direction: this.direction,
			repeat: this.currentRepeat,
			isCyclic: this.isCyclic,
			isFinished: this.isFinished,
		};

		// Run main callback
		this.onCalculate?.(callbackResult);

		// If we have no delay anymore then we can check callbacks
		if (this.currentDelay === 0) {
			// Run any other callback exist
			for (let i = 0; i < this.callbacks.length; i++) {
				if (
					this.position * this.direction >= this.callbacks[i].position * this.direction &&
					this.callbacksCounters[i] === 0 &&
					(this.callbacks[i].direction === 0 || this.direction === this.callbacks[i].direction)
				) {
					this.callbacksCounters[i] = 1;
					this.callbacks[i].callback(callbackResult);
				}
			}
		}

		// If we finished but repeats needed (currentNumberOfRepeats > 0) then keep running
		if (this.isStarted === true && this.isFinished === true && this.currentRepeat > 1) {
			this.currentRepeat--;

			this.isFinished = false;

			// If we are not cycling then but we still need to repeat then start position from the beginning
			// else switch direction
			if (this.isCyclic === false) {
				this.position = this.actualPosition;
			} else {
				this.direction = -this.direction;
			}

			// Also reset all callbacks counters because we finished animation cycle
			for (let i = 0; i < this.callbacks.length; i++) {
				this.callbacksCounters[i] = 0;
			}

			// Also if isDelayBeforeStartOnRepeat == true then we need to wait again
			if (this.isDelayOnRepeat === true) {
				this.currentDelay = this.delay;
			}
		}
	}

	private calculateResults(): void {
		// Manipulate position according to the time array
		let t = this.position / this.time;
		t = Animation.bezier1D(t, this.timing) / 100.0;
		this.results = Animation.bezier2D(t, this.points);
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
		this.isStarted = true;
		this.isFinished = false;
		this.actualTime = 0;

		this.calculate();
	}

	public pause(): void {
		this.isStarted = false;

		this.calculate();
	}

	public reset(): void {
		this.isStarted = false;
		this.isFinished = true;

		this.position = 0;
		this.actualPosition = 0;
		this.actualTime = 0;

		this.direction = this.saveDirection;

		this.currentDelay = this.delay;
		this.currentRepeat = this.repeat;

		// reset all callbacks counters because we finished animation cycle
		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		// calculate results
		this.calculate();
	}

	public static rotate3dX(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		a = (a * Math.PI) / 180;

		return { x: x, y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) };
	}

	public static rotate3dY(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		a = (a * Math.PI) / 180;

		return { x: z * Math.sin(a) + x * Math.cos(a), y: y, z: z * Math.cos(a) - x * Math.sin(a) };
	}

	public static rotate3dZ(x: number, y: number, z: number, a: number): { x: number; y: number; z: number } {
		a = (a * Math.PI) / 180;

		return { x: x * Math.cos(a) - y * Math.sin(a), y: x * Math.sin(a) + y * Math.cos(a), z: z };
	}

	public static rotate3D(x: number, y: number, z: number, a: number, b: number, c: number): { x: number; y: number; z: number } {
		let arr = { x: x, y: y, z: z };
		arr = Animation.rotate3dZ(arr.x, arr.y, arr.z, c);
		arr = Animation.rotate3dY(arr.x, arr.y, arr.z, b);
		arr = Animation.rotate3dX(arr.x, arr.y, arr.z, a);

		return arr;
	}

	public static onElementVisible(element: HTMLElement, callback: (target: HTMLElement, isVisible: boolean, observer: IntersectionObserver) => void): IntersectionObserver | null {
		const options = {};
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				callback(entry.target as HTMLElement, entry.intersectionRatio > 0, observer);
			});
		}, options);

		if (element) {
			observer.observe(element);

			return observer;
		} else {
			return null;
		}
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

			if (this.isLooping == true) {
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
