import { useEffect, useState } from "react";
import * as S from "./Splash.styles";
import { lang } from "@src/locales/i18n";
import { version } from "@src/../package.json";
import { T } from "@src/locales/T";
import { Progress } from "@src/components/progress/Progress";
import { Icons } from "@src/icons/Icon.types";
import { Files } from "@src/services/Files";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		Files.download(
			Object.values(Icons),
			(props) => {
				setProgress(props.progress * 100);
			},
			() => {
				setProgress(100);

				setTimeout(() => {
					onFinish();
				}, 300);
			}
		);
	}, []);

	return (
		<S.Splash>
			<S.Title>
				<T>{lang.splash.title}</T>
			</S.Title>

			<S.Progress>
				<Progress progress={progress} />
			</S.Progress>

			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
