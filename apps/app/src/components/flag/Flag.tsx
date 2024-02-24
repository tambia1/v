import * as S from "./Flag.styles";
import { FlagName } from "./Flag.types";
import { ITheme } from "@src/theme/Theme.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	flagName: FlagName;
	size?: keyof ITheme["size"];
}

export const Flag = ({ className, flagName, size = "m", ...rest }: Props) => {
	return <S.Flag className={className} $size={size} $flagName={flagName} {...rest}></S.Flag>;
};
