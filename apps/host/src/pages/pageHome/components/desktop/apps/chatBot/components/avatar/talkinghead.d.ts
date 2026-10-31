declare module "@met4citizen/talkinghead" {
	import type { Object3D } from "three";

	export type TalkingHeadMood = "neutral" | "happy" | "angry" | "sad" | "fear" | "disgust" | "love" | "sleep";

	export type TalkingHeadAvatar = {
		url: string;
		body?: "M" | "F";
		avatarMood?: TalkingHeadMood;
		lipsyncLang?: string;
		baseline?: Record<string, number>;
		retarget?: Record<string, unknown>;
	};

	export type TalkingHeadAudio = {
		audio: AudioBuffer;
		words: string[];
		wtimes: number[];
		wdurations: number[];
	};

	export class TalkingHead {
		constructor(node: HTMLElement, opt?: Record<string, unknown>);
		audioCtx: AudioContext;
		lipsync: Record<string, unknown>;
		showAvatar(
			avatar: TalkingHeadAvatar,
			onprogress?: ((event: ProgressEvent) => void) | null,
			onpreprocess?: ((gltf: { scene: Object3D }) => void) | null,
		): Promise<void>;
		speakAudio(audio: TalkingHeadAudio, opt?: { lipsyncLang?: string; isRaw?: boolean } | null): void;
		stopSpeaking(): void;
		lookAtCamera(ms: number): void;
		setMood(mood: TalkingHeadMood): void;
		start(): void;
		stop(): void;
		dispose(): void;
	}
}

declare module "@met4citizen/talkinghead/modules/lipsync-en.mjs" {
	export class LipsyncEn {}
}
