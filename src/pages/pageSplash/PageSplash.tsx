import { useEffect, useState } from "react";
import * as S from "./PageSplash.styles";
import { version } from "@src/../package.json";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useNavigate } from "react-router-dom";
import { Progress } from "@src/components/progress/Progress";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { Pages } from "../Pages.types";

export const PageSplash = () => {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		Files.download(
			Object.values(Icons),
			(props) => {
				setProgress(props.progress * 100);
			},
			() => {
				setTimeout(() => {
					navigate(Pages.home);
				}, 100);
			}
		);
	}, []);

	return (
		<S.PageSplash>
			<S.Title>
				<T>{lang.splash.title}</T>
			</S.Title>

			<S.Progress>
				<Progress progress={progress} />
			</S.Progress>

			<S.Version>{version}</S.Version>
		</S.PageSplash>
	);
};
