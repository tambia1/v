import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const HeaderIcon = styled(Icon)<{ $collapsed: boolean }>`
	transition: transform 0.3s ease;
	transform: ${(props) => (props.$collapsed ? "rotateX(180deg)" : "rotateX(0deg)")};
`;
