import type { Theme } from "@src/theme/Theme.types";
import type { InputHTMLAttributes } from "react";
import { useTheme } from "styled-components";
import * as S from "./Input.styles";

export type TextAlign = "left" | "center" | "right";

export type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
	className?: string;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	size?: keyof Theme["size"];
	textAlign?: TextAlign;
	onTextChange?: (content: string) => void;
	onPressEnter?: () => void;
};

export const Input = ({ className, value, placeholder, disabled, size = "size800", textAlign = "left", onTextChange, onPressEnter, ...rest }: Props) => {
	const theme = useTheme();

	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		onTextChange?.(e.currentTarget.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onPressEnter?.();
		}
	};

	return (
		<S.Input
			className={className}
			$width={theme.size[size]}
			$textALign={textAlign}
			value={value}
			placeholder={placeholder}
			type="text"
			disabled={disabled}
			onChange={handleTextChange}
			onKeyDown={handleKeyDown}
			{...rest}
		/>
	);
};
