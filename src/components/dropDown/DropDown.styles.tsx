import styled from "styled-components";
import { Cell } from "../list/components/cell/Cell.styles";

export const DropDown = styled.div`
	& ${Cell} {
	}
`;

export const ListContainer = styled.div<{ $isOpen: boolean }>`
	margin-top: 0.1rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
`;
