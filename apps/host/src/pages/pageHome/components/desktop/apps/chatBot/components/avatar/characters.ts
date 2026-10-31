import type { TalkingHeadAvatar } from "@met4citizen/talkinghead";

import avatarSdkUrl from "./models/avatarsdk.glb?url";
import brunetteUrl from "./models/brunette.glb?url";
import mpfbUrl from "./models/mpfb.glb?url";

export type Character = {
	id: string;
	name: string;
	avatar: TalkingHeadAvatar;
	colors?: Record<string, string>;
	hide?: string[];
};

export const characters: Character[] = [
	{
		id: "brunette",
		name: "Julia",
		avatar: {
			url: brunetteUrl,
			body: "F",
			avatarMood: "neutral",
		},
		colors: {
			Wolf3D_Hair: "#000000",
			Wolf3D_Skin: "",
			Wolf3D_Body: "",
			Wolf3D_Eye: "",
			Wolf3D_Glasses: "",
			Wolf3D_Outfit_Top: "#0000ff",
			Wolf3D_Outfit_Bottom: "",
			Wolf3D_Outfit_Footwear: "",
		},
		hide: [],
	},
	{
		id: "avatarsdk",
		name: "Alex",
		avatar: {
			url: avatarSdkUrl,
			body: "M",
			avatarMood: "neutral",
			retarget: {
				Neck: { z: -0.01, rx: -0.15 },
				Neck1: { z: -0.01, rx: -0.15 },
				Neck2: { z: -0.01, rx: -0.15 },
				LeftShoulder: { rz: -0.3 },
				RightShoulder: { rz: 0.3 },
				scaleToEyesLevel: 1.0,
				origin: { y: -0.1 },
			},
			baseline: { headRotateX: -0.04, eyeBlinkLeft: 0.05, eyeBlinkRight: 0.05 },
		},
		colors: {
			AvatarHead: "",
			AvatarBody: "",
			AvatarLeftEyeball: "",
			AvatarRightEyeball: "",
			outfit_top: "",
			outfit_bottom: "",
			outfit_shoes: "",
		},
		hide: [],
	},
	{
		id: "mpfb",
		name: "Emma",
		avatar: {
			url: mpfbUrl,
			body: "F",
			avatarMood: "happy",
			baseline: { headRotateX: -0.01, eyeBlinkLeft: 0.05, eyeBlinkRight: 0.05 },
		},
		colors: {
			"Human.ponytail01": "",
			"Human.mindfront_eyebrows_02": "",
			"Human.body": "",
			"Human.high-poly": "",
			"Human.female_casualsuit01": "",
		},
		hide: [],
	},
];
