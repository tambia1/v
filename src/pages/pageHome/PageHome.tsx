import { version } from "@src/../package.json";
import { content } from "@src/locale/en";
import * as S from "./PageHome.styles";

export const PageHome = () => {
	return (
		<S.Container>
			<S.Title>Hello</S.Title>
			<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.Container>
	);
};
