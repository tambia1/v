import { T } from "@src/locales/T";
import * as S from "./MessageBar.styles";
import { Button } from "@src/components/button/Button";

interface Props {
	onClickSend: (message: string) => void;
}

export const MessageBar = ({ onClickSend }: Props) => {
	return (
		<S.MessageBar>
			<S.Message />
			<Button variant="full" onClick={() => onClickSend("")}>
				<T>Send</T>
			</Button>
		</S.MessageBar>
	);
};
