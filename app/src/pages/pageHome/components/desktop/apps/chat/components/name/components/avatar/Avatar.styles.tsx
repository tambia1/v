import styled from "styled-components";
import imageAvatar0 from "./assets/avatar0.png";
import imageAvatar1 from "./assets/avatar1.png";
import imageAvatar2 from "./assets/avatar2.png";
import imageAvatar3 from "./assets/avatar3.png";

export const avatars = [imageAvatar0, imageAvatar1, imageAvatar2, imageAvatar3] as const;
export type IAvatar = Exclude<keyof typeof avatars, keyof []>;

const size = {
	s: "2.0rem",
	l: "10.0rem",
} as const;
export type ISize = keyof typeof size;

export const Avatar = styled.div<{ $index: IAvatar; $size: ISize }>`
	width: ${(props) => size[props.$size]};
	height: ${(props) => size[props.$size]};
	background-size: contain;
	background-repeat: no-repeat;
	background-image: url(${(props) => avatars[props.$index]});
`;
