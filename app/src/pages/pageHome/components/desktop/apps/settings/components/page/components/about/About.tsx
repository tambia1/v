import * as S from "./About.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const About = () => {
	const { t } = useTranslation();

	const [dimensions, setDimensions] = useState({
		width: document.body.clientWidth,
		height: document.body.clientHeight,
		orientation: window.screen.orientation.type,
	});

	const getOrientation = () => {
		setDimensions({
			width: document.body.clientWidth,
			height: document.body.clientHeight,
			orientation: window.screen.orientation.type,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", getOrientation);
		window.screen.orientation.addEventListener("change", getOrientation);

		return () => {
			window.removeEventListener("resize", getOrientation);
			window.screen.orientation.removeEventListener("change", getOrientation);
		};
	}, []);

	return (
		<S.About>
			<Text size="l">{t(lang.settings.about.text)}</Text>
			<S.Spacer />
			<Text size="m">
				{dimensions.width}x{dimensions.height}
			</Text>
			<Text size="m">{dimensions.orientation}</Text>{" "}
		</S.About>
	);
};
