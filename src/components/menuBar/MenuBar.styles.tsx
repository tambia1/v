import styled from "styled-components";

export const MenuBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: flex-start;
	flex-shrink: 0;

	width: 100%;
	height: 100%;

	position: relative;

	box-sizing: border-box;
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.backgroundColors.primary};

	transition: all ease-out 0.3s;
`;

export const MenuLogoContainer = styled.div`
	display: inline-flex;
	justify-content: left;
	align-items: center;
	background-color: #00f3;
	width: 100%;
	height: 50px;
	flex-shrink: 0;
	padding: 1rem;
	box-sizing: border-box;
	overflow: hidden;
`;

export const MenuLogoText = styled.h3`
	display: inline-flex;
	font-size: 12px;
	padding-bottom: 5px;
	margin-left: 10px;
`;

export const MenuLogoIcon = styled.div`
	display: inline-flex;
	width: 30px;
	height: 30px;
	background-image: url("/src/assets/redis_icon.png");
	background-size: contain;
	background-repeat: no-repeat;
	flex-shrink: 0;
`;

export const MenuItemsContainer = styled.div`
	width: 100%;
	height: 100%;
`;
