import { List } from "@src/components/list/List.styles";
import styled from "styled-components";

export const Items = styled.div<{ $isOpen: boolean; $width: string }>`
	margin-top: 0.5rem;
	display: grid;
	grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	transition: all 0.3s ease;
	position: absolute;
	width: ${(props) => props.$width};
	z-index: 1;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 1rem;
	max-height: 25rem;

	& ${List}{
		overflow-y: hidden;
		scrollbar-gutter: stable;

		&::-webkit-scrollbar-track {
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
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
