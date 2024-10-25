import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { Device } from "@src/utils/Device";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./About.styles";

export const About = () => {
	const { t } = useTranslation();

	const [dimensions, setDimensions] = useState({
		width: document.body.clientWidth,
		height: document.body.clientHeight,
		orientation: window.screen.orientation.type,
	});

	useEffect(() => {
		const getOrientation = () => {
			setDimensions({
				width: document.body.clientWidth,
				height: document.body.clientHeight,
				orientation: window.screen.orientation.type,
			});
		};

		window.addEventListener("resize", getOrientation);
		window.screen.orientation.addEventListener("change", getOrientation);

		return () => {
			window.removeEventListener("resize", getOrientation);
			window.screen.orientation.removeEventListener("change", getOrientation);
		};
	}, []);

	return (
		<S.About>
			<Text variant="header">{t(lang.settings.about.text)}</Text>

			<S.Spacer />
			<Text variant="body">
				{dimensions.width}x{dimensions.height}
			</Text>

			<S.Spacer />
			<Text variant="body">{dimensions.orientation}</Text>

			<S.Spacer />
			<Text variant="body">{navigator.userAgent}</Text>
			<Text variant="body">{Device.getDeviceInfo().deviceName}</Text>
			<Text variant="body">{Device.getDeviceInfo().iosName}</Text>
			<Text variant="body">{Device.getDeviceInfo().iosVersion}</Text>
			<Text variant="body">{Device.getDeviceInfo().browserName}</Text>
			<Text variant="body">{Device.getDeviceInfo().browserVersion}</Text>
		</S.About>
	);
};
