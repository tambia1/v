import { TalkingHead } from "@met4citizen/talkinghead";
import { LipsyncEn } from "@met4citizen/talkinghead/modules/lipsync-en.mjs";
import { Loader } from "@src/components/loader/Loader";
import { type Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Color, type Material, Mesh, type MeshStandardMaterial, type Object3D, type Texture } from "three";

import * as S from "./Avatar.styles";
import type { Character } from "./characters";

export type AvatarHandle = {
	speak: (text: string, durationMs: number) => void;
	stop: () => void;
};

type Props = {
	ref?: Ref<AvatarHandle>;
	character: Character;
	isListening?: boolean;
};

const getWordTimings = (words: string[], durationMs: number) => {
	const weights = words.map((word) => word.length + 1 + (/[,;:.!?]$/.test(word) ? 3 : 0));
	const total = weights.reduce((sum, weight) => sum + weight, 0);
	const wtimes: number[] = [];
	const wdurations: number[] = [];
	let time = 0;

	weights.forEach((weight) => {
		const duration = (weight / total) * durationMs;
		wtimes.push(time);
		wdurations.push(duration);
		time += duration;
	});

	return { wtimes, wdurations };
};

const repaint = (texture: Texture, color: string) => {
	const image = texture.image as CanvasImageSource & { width: number; height: number };
	const canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	const context = canvas.getContext("2d");

	if (!context) {
		return texture;
	}

	context.drawImage(image, 0, 0);

	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imageData.data;
	const target = new Color(color).getHex();
	const r = (target >> 16) & 255;
	const g = (target >> 8) & 255;
	const b = target & 255;
	let sum = 0;
	let count = 0;

	for (let i = 0; i < pixels.length; i += 4) {
		if (pixels[i + 3] > 0) {
			sum += pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
			count++;
		}
	}

	const average = sum / count || 1;

	for (let i = 0; i < pixels.length; i += 4) {
		const factor = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / average;
		pixels[i] = Math.min(255, r * factor);
		pixels[i + 1] = Math.min(255, g * factor);
		pixels[i + 2] = Math.min(255, b * factor);
	}

	context.putImageData(imageData, 0, 0);

	const result = texture.clone();
	result.image = canvas;
	result.needsUpdate = true;

	return result;
};

const customize = (scene: Object3D, character: Character) => {
	scene.traverse((object) => {
		if (!(object instanceof Mesh)) {
			return;
		}

		const materials: Material[] = Array.isArray(object.material) ? object.material : [object.material];

		for (const material of materials) {
			if (character.hide?.includes(material.name)) {
				object.visible = false;
			}

			const color = character.colors?.[material.name];

			if (color && "color" in material) {
				const standard = material as MeshStandardMaterial;

				if (standard.map) {
					standard.map = repaint(standard.map, color);
				} else {
					standard.color.set(color);
				}
			}
		}
	});
};

export const Avatar = ({ ref, character, isListening = false }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const headRef = useRef<TalkingHead | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useImperativeHandle(ref, () => ({
		speak: (text, durationMs) => {
			const head = headRef.current;
			const words = text.split(/\s+/).filter(Boolean);

			if (!head || words.length === 0) {
				return;
			}

			head.stopSpeaking();

			const sampleRate = head.audioCtx.sampleRate;
			const audio = head.audioCtx.createBuffer(1, Math.ceil((sampleRate * durationMs) / 1000), sampleRate);

			head.speakAudio({ audio, words, ...getWordTimings(words, durationMs) }, { lipsyncLang: "en" });
		},
		stop: () => {
			headRef.current?.stopSpeaking();
		},
	}));

	useEffect(() => {
		const container = containerRef.current;

		if (!container) {
			return;
		}

		const head = new TalkingHead(container, {
			lipsyncModules: [],
			lipsyncLang: "en",
			cameraView: "head",
			cameraRotateEnable: false,
		});

		head.lipsync.en = new LipsyncEn();
		headRef.current = head;

		return () => {
			headRef.current = null;
			head.dispose();
			container.replaceChildren();
		};
	}, []);

	useEffect(() => {
		const head = headRef.current;

		if (!head) {
			return;
		}

		let isCancelled = false;

		setIsLoading(true);
		setError("");

		head
			.showAvatar({ ...character.avatar, lipsyncLang: "en" }, null, (gltf) => customize(gltf.scene, character))
			.then(() => {
				if (!isCancelled) {
					setIsLoading(false);
				}
			})
			.catch((e: unknown) => {
				if (!isCancelled) {
					setIsLoading(false);
					setError(e instanceof Error ? e.message : String(e));
				}
			});

		return () => {
			isCancelled = true;
		};
	}, [character]);

	useEffect(() => {
		const head = headRef.current;

		if (!head || isLoading) {
			return;
		}

		if (isListening) {
			head.lookAtCamera(10000);
		}
	}, [isListening, isLoading]);

	return (
		<S.Avatar>
			<S.Canvas ref={containerRef} />

			{(isLoading || error) && <S.Overlay>{error || <Loader />}</S.Overlay>}
		</S.Avatar>
	);
};
