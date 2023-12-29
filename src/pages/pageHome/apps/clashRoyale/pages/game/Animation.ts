type ICallback = {
	positionInPoints: number;
	direction: number;
	callback: (result: ICallbackResult) => void;
};

type ICallbackResult = {
	animation: Animation;
	arrayResults: number[];
	timeLength: number;
	delayBeforeStart: number;
	isDelayBeforeStartOnRepeat: boolean;
	positionInPoints: number;
	positionInPercent: number;
	direction: number;
	numberOfRepeats: number;
	isCyclic: boolean;
	isFinished: boolean;
};

type Props = {
	timeLength: number;
	arrayPoints: number[][];
	arrayTiming: number[];
	direction: -1 | 0 | 1;
	delayBeforeStart: number;
	isDelayBeforeStartOnRepeat: boolean;
	numberOfRepeats: number;
	isCyclic: boolean;
	calculateCallback: ((result: ICallbackResult) => void) | null;
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

	private arrayPoints: number[][];
	private arrayTiming: number[];
	private timeLength: number;
	private direction: number;
	private saveDirection: number;

	private position: number;
	private actualPosition: number;
	private time: number;

	private isStarted: boolean;
	private isFinished: boolean;

	private calculateCallback: ((result: ICallbackResult) => void) | null;

	private callbacks: ICallback[];
	private callbacksCounters: number[];

	private delayBeforeStart: number;
	private currentDelayBeforeStart: number;

	private isDelayBeforeStartOnRepeat: boolean;

	private numberOfRepeats: number;
	private currentNumberOfRepeats: number;

	private isCyclic: boolean;

	private isLooping: boolean;
	private requestAnimationFrameId: number | null;
	private requestAnimationFrameFunction: (() => void) | null;

	private arrayResults: number[];

	constructor({
		timeLength = 1000,
		arrayPoints = [
			[0, 100],
			[0, 100],
		],
		arrayTiming = Animation.TIMING_LINEAR,
		direction = Animation.DIRECTION_FORWARD,
		delayBeforeStart = 0,
		isDelayBeforeStartOnRepeat = false,
		numberOfRepeats = 1,
		isCyclic = false,
		calculateCallback = null,
		callbacks = [],
	}: Props) {
		// init values
		this.arrayPoints = arrayPoints;
		this.arrayTiming = arrayTiming;
		this.timeLength = timeLength;
		this.direction = direction;
		this.saveDirection = this.direction;

		this.position = 0;
		this.actualPosition = 0;
		this.time = 0;

		this.isStarted = false;
		this.isFinished = true;

		this.calculateCallback = calculateCallback;

		this.callbacks = callbacks;
		this.callbacksCounters = new Array(this.callbacks.length).fill(0);

		this.delayBeforeStart = delayBeforeStart;
		this.currentDelayBeforeStart = this.delayBeforeStart;

		this.isDelayBeforeStartOnRepeat = isDelayBeforeStartOnRepeat;

		this.numberOfRepeats = numberOfRepeats;
		this.currentNumberOfRepeats = this.numberOfRepeats;

		this.isCyclic = isCyclic;

		this.isLooping = false;
		this.requestAnimationFrameId = null;
		this.requestAnimationFrameFunction = null;

		this.arrayResults = [];

		//calculate and init values
		this.setRoute(timeLength, arrayPoints, arrayTiming, direction, delayBeforeStart, isDelayBeforeStartOnRepeat, numberOfRepeats, isCyclic, calculateCallback, callbacks);
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
		let arrayResults: number[] = [];

		for (let i = 0; i < arrayPoints.length; i++) {
			arrayResults[i] = Animation.bezier1D(t, arrayPoints[i]);
		}

		return arrayResults;
	}

	public setRoute(
		timeLength: number,
		arrayPoints: number[][],
		arrayTiming: number[],
		direction: number,
		delayBeforeStart: number,
		isDelayBeforeStartOnRepeat: boolean,
		numberOfRepeats: number,
		isCyclic: boolean,
		calculateCallback: ((result: ICallbackResult) => void) | null,
		callbacks: ICallback[] | null
	): void {
		// Save args
		this.arrayPoints = arrayPoints;
		this.arrayTiming = arrayTiming;
		this.timeLength = timeLength !== 0 ? timeLength : 0.0000000001;
		this.direction = direction;
		this.saveDirection = direction;

		this.position = 0;
		this.actualPosition = 0;
		this.time = 0;

		this.isStarted = false;
		this.isFinished = true;

		this.calculateCallback = calculateCallback;

		this.callbacks = callbacks || [];
		this.callbacksCounters = [];

		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		this.delayBeforeStart = delayBeforeStart;
		this.currentDelayBeforeStart = delayBeforeStart;

		this.isDelayBeforeStartOnRepeat = isDelayBeforeStartOnRepeat;

		this.numberOfRepeats = numberOfRepeats;
		this.currentNumberOfRepeats = numberOfRepeats;

		this.isCyclic = isCyclic;

		// Calculate results
		this.calculateResults();
	}

	private calculate(): void {
		// Get current time
		const currentTime = +new Date();

		// If time is not set yet (this.time == 0) then take current time
		this.time = this.time || currentTime;

		// If we already started then wait till delay before start finishes
		if (this.isStarted === true && this.currentDelayBeforeStart > 0) {
			this.currentDelayBeforeStart -= currentTime - this.time;

			if (this.currentDelayBeforeStart < 0) {
				this.currentDelayBeforeStart = 0;
			}
		}

		// If we still not started then take current time and keep position
		if (this.isStarted === false || this.currentDelayBeforeStart > 0 || this.isFinished === true) {
			this.time = currentTime;
		}

		// Add this amount of time that passed to the current position
		const add = (currentTime - this.time) * this.direction;
		this.time = currentTime;

		this.position = this.position + add;
		this.actualPosition = this.position;

		// Check if animation finished according to position
		// and fix position if we are out of bounds
		if (this.direction === 1 && this.position >= this.timeLength) {
			this.isFinished = true;
			this.actualPosition = this.position - this.timeLength;
			this.position = this.timeLength;
		} else if (this.direction === -1 && this.position <= 0) {
			this.isFinished = true;
			this.actualPosition = this.position + this.timeLength;
			this.position = 0;
		}

		// Calculate results
		this.calculateResults();

		// Save results to send to callbacks
		const callbackResult = {
			animation: this,
			arrayResults: this.arrayResults,
			timeLength: this.timeLength,
			delayBeforeStart: this.currentDelayBeforeStart,
			isDelayBeforeStartOnRepeat: this.isDelayBeforeStartOnRepeat,
			positionInPoints: this.getPositionInPoints(),
			positionInPercent: this.getPositionInPercent(),
			direction: this.direction,
			numberOfRepeats: this.currentNumberOfRepeats,
			isCyclic: this.isCyclic,
			isFinished: this.isFinished,
		};

		// Run main callback
		this.calculateCallback?.(callbackResult);

		// If we have no delay anymore then we can check callbacks
		if (this.currentDelayBeforeStart === 0) {
			// Run any other callback exist
			for (let i = 0; i < this.callbacks.length; i++) {
				if (
					this.position * this.direction >= this.callbacks[i].positionInPoints * this.direction &&
					this.callbacksCounters[i] === 0 &&
					(this.callbacks[i].direction === 0 || this.direction === this.callbacks[i].direction)
				) {
					this.callbacksCounters[i] = 1;
					this.callbacks[i].callback(callbackResult);
				}
			}
		}

		// If we finished but repeats needed (currentNumberOfRepeats > 0) then keep running
		if (this.isStarted === true && this.isFinished === true && this.currentNumberOfRepeats > 1) {
			this.currentNumberOfRepeats--;

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
			if (this.isDelayBeforeStartOnRepeat === true) {
				this.currentDelayBeforeStart = this.delayBeforeStart;
			}
		}
	}

	private calculateResults(): void {
		// Manipulate position according to the time array
		let t = this.position / this.timeLength;
		t = Animation.bezier1D(t, this.arrayTiming) / 100.0;
		this.arrayResults = Animation.bezier2D(t, this.arrayPoints);
	}

	public setPositionInPoints(position: number): void {
		this.position = position;
		this.actualPosition = this.position;
	}

	public getPositionInPoints(): number {
		return this.position;
	}

	public setPositionInPercent(positionPercent: number): void {
		this.setPositionInPoints((positionPercent * this.timeLength) / 100);
	}

	public getPositionInPercent(): number {
		return ~~((this.position / this.timeLength) * 100);
	}

	public getActualPositionInPercent(): number {
		return (this.actualPosition / this.timeLength) * 100;
	}

	public resume(): void {
		this.isStarted = true;
		this.isFinished = false;
		this.time = 0;

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
		this.time = 0;

		this.direction = this.saveDirection;

		this.currentDelayBeforeStart = this.delayBeforeStart;
		this.currentNumberOfRepeats = this.numberOfRepeats;

		// also reset all callbacks counters because we finished animation cycle
		for (let i = 0; i < this.callbacks.length; i++) {
			this.callbacksCounters[i] = 0;
		}

		// calculate results
		this.calculateResults();
	}

	public startLoop(): void {
		this.requestAnimationFrameFunction = () => {
			this.calculate();

			if (this.isLooping == true && this.requestAnimationFrameFunction) {
				this.requestAnimationFrameId = window.requestAnimationFrame(this.requestAnimationFrameFunction);
			}
		};

		this.isLooping = true;
		this.requestAnimationFrameFunction();
	}

	public stopLoop() {
		this.isLooping = false;

		if (this.requestAnimationFrameId) {
			window.cancelAnimationFrame(this.requestAnimationFrameId);
			this.requestAnimationFrameId = null;
		}
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
