import { Theme } from "@src/theme/Theme.types";
import { ReactNode } from "react";

import { IconName } from "../icon/Icon.types";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Root } from "./root/Root";

type Props = {
	width?: keyof Theme["size"];
	height?: keyof Theme["size"];
	$collapsed?: boolean;
	onClickCollapse?: () => void;
	headerIconName?: IconName;
	headerContent?: ReactNode;
	bodyContent: ReactNode;
	footerContent?: ReactNode;
};

export const Card = ({ $collapsed, onClickCollapse, headerIconName, headerContent, bodyContent, footerContent, width, height }: Props) => {
	return (
		<Card.Root width={width} height={height}>
			<Card.Header $collapsed={$collapsed} iconName={headerIconName} content={headerContent} onClickCollapse={onClickCollapse} />
			<Card.Body $collapsed={$collapsed} content={bodyContent} />
			<Card.Footer content={footerContent} />
		</Card.Root>
	);
};

Card.Root = Root;
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
