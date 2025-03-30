import styled from "styled-components";
import { List } from "../list/List.styles";

export const PopupMenu = styled.div`
	position: relative;
`;

export const Items = styled.div<{ $isOpen: boolean }>`
	margin-top: 0.5rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
	position: absolute;
	width: 20rem;
	z-index: 1;
	background-color: ${(props) => props.theme.color.primary100};
	border-radius: 2rem;
	max-height: 25rem;

	& ${List}{
		overflow-y: hidden;

		&::-webkit-scrollbar-track {
			margin-top: 1rem;
			margin-bottom: 1rem;
		}

		animation: ${({ $isOpen }) => ($isOpen ? "expand 0s ease forwards 0.3s" : "none")};

		@keyframes expand {
			0% {
				overflow-y: hidden;
			}
			100% {
				overflow-y: auto;
			}
		}
	}
`;
