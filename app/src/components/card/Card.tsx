import { ReactNode } from "react";
import { IconName } from "../icon/Icon.types";
import { Body } from "./components/body/Body";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Compose } from "./compose/Compose";

type Props = {
	collapsed: boolean;
	onClickCollapse?: () => void;
	headerIconName?: IconName;
	headerContent: ReactNode;
	bodyContent: ReactNode;
	footerContent?: ReactNode;
};

export const Card = ({ collapsed, onClickCollapse, headerIconName, headerContent, bodyContent, footerContent }: Props) => {
	return (
		<Card.Compose>
			<Card.Header collapsed={collapsed} iconName={headerIconName} content={headerContent} onClickCollapse={onClickCollapse} />
			<Card.Body collapsed={collapsed} content={bodyContent} />
			<Card.Footer content={footerContent} />
		</Card.Compose>
	);
};

Card.Compose = Compose;
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
