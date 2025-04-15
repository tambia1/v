import { IconName } from "@src/components/icon/Icon.types";
import * as S from "./Icon.styles";

export type Props = {
	collapsed?: boolean;
	iconName: IconName;
};

export const Icon = ({ iconName, collapsed = false }: Props) => {
	if (!iconName) {
		return null;
	}

	return <S.HeaderIcon iconName={iconName} size="size200" collapsed={collapsed} />;
};
