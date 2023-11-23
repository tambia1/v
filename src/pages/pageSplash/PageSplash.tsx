import { useEffect } from "react";
import * as S from "./PageSplash.styles";
import { version } from "@src/../package.json";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useNavigate } from "react-router-dom";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { Pages } from "../Pages.types";

export const PageSplash = () => {
	const navigate = useNavigate();

	useEffect(() => {
		Files.download(Object.values(Icons), null, () => {
			navigate(Pages.home);
		});
	}, []);

	return (
		<S.PageSplash>
			<S.Title>
				<T>{lang.splash.title}</T>
			</S.Title>

			<S.Version>{version}</S.Version>
		</S.PageSplash>
	);
};
