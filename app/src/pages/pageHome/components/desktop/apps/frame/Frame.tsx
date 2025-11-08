import * as S from "./Frame.styles";

type Props = {
	title: string;
	url: string;
};

export const Frame = ({ title, url }: Props) => {
	return (
		<S.Frame>
			<S.IFrame title={title} src={url} />
		</S.Frame>
	);
};
