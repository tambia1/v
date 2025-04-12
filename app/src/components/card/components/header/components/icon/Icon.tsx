import { IconName } from "@src/components/icon/Icon.types";
import type { ReactNode } from "react";
import * as S from "./Icon.styles";

export type Props = {
	collapsed?: boolean;
	iconName?: IconName;
	content?: ReactNode;
};

export const Icon = ({ content, iconName = "iconChevronDown", collapsed = false }: Props) => {
	if (!content) {
		return null;
	}

	return <S.HeaderIcon iconName={iconName} size="xxs" collapsed={collapsed} />;
};
