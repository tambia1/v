import styled from "@emotion/styled";
import { BackButton, Headers } from "@src/components/navigator/Navigator.styles";
import { Text } from "@src/components/text/Text.styles";
import oswaldFont from "./pages/fonts/Oswald-VariableFont_wght.ttf";

export const themeGame = {
	button: {
		active: {
			bg: "#2B1A14",
			surface: "#3A241C",
			frame: "#5A3A24",
			edge: "#8C5A32",
			glow: "#FF8A1F",
			glowSoft: "rgba(255, 138, 31, 0.25)",
			text: "#FFD58A",

			hover: {
				bg: "#331F18",
				glow: "#FFB14A",
			},

			pressed: {
				bg: "#1F130E",
				surface: "#2A1A14",
				frame: "#4A2F1D",
				glow: "#CC6E1A",
				text: "#E6B86A",
			},
		},

		disabled: {
			bg: "#1C1F22",
			surface: "#262A2E",
			frame: "#2F3337",
			edge: "#4A4F55",
			text: "#9CA1A6",

			pressed: {
				bg: "#15181B",
				surface: "#1F2327",
				frame: "#262A2E",
				text: "#7E8388",
			},
		},
	},

	ui: {
		bgMain: "#0F1215",
		bgPanel: "#161A1F",
	},
};

export const Commander = styled.div`
	@font-face {
		font-family: "Oswald";
		font-weight: normal;
		font-style: normal;
		src: url(${oswaldFont});
	}

	font-family: "Oswald", sans-serif;
	font-weight: bold;

	width: 100%;
	height: 100%;

	display: flex;

	& ${Headers} {
		background-image: linear-gradient(45deg, #2F3337, #4A4F55);
		color: ${(props) => props.theme.color.success400};
	}

	& ${Headers} ${BackButton} {
		background-color: ${themeGame.button.active.bg};
		color: ${themeGame.button.active.text};
	}

	& ${Headers} ${BackButton}:hover {
		background-color: ${themeGame.button.active.hover.bg};
		color: ${themeGame.button.active.hover.glow};
	}

	& ${Headers} ${Text} {
		color: ${themeGame.button.active.text};
		text-shadow: 0 0 10px ${themeGame.button.active.glowSoft};
	}
`;
