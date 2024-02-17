import styled, { css } from "styled-components";

export const Paging = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	background-color: #ffffff33;
`;

export type IPageState = "go" | "move";

export const Pages = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const PagesPanel = styled.div<{ $pageState: IPageState; $translateX: number }>`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;

	${(props) => {
		if (props.$pageState === "move") {
			return css`
				transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.6, 1) 0s;
			`;
		}

		return null;
	}}

	transform: translate3d(${(props) => props.$translateX}% , 0px, 0px);
`;

export const Page = styled.div`
	width: 100%;
	height: 100%;
	flex-shrink: 0;
	position: relative;
`;

export const Dots = styled.div`
	width: 100%;
	height: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const Dot = styled.div<{ $isSelected: boolean }>`
	width: 10px;
	height: 10px;
	display: inline-block;
	border-radius: 10px;
	margin: 4px;
	transition: background-color 0.7s ease 0s;
	background: ${(props) => (props.$isSelected ? "#ffffffff" : "#ffffff33")};
`;
