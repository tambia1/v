import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon";

export const HeaderIcon = styled(Icon)<{ $collapsed: boolean }>`
	transition: transform 0.3s ease;
	transform: ${(props) => (props.$collapsed ? "rotateX(180deg)" : "rotateX(0deg)")};
`;
