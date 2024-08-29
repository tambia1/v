import * as S from "./Menu.styles";
import { List } from "../list/List";

export interface Props {
	className?: string | undefined;
	visible: boolean;
}
export const Menu = ({ className, visible, ...rest }: Props) => {
	return (
		<S.Menu className={className} {...rest}>
			{visible && <S.Cover />}
			<List>
				<List.Cell>aaaa</List.Cell>
			</List>
		</S.Menu>
	);
};
