import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;

	width: 100%;
	height: 50px;
	left: 0px;
	box-sizing: border-box;
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.backgroundColors.primary};
`;

const Item = styled.div`
	display: inline-flex;
	font-size: 16px;
	padding: 10px;
	width: 100%;
	justify-content: left;
	margin-left: 4rem;

	background-color: transparent;
	color: inherit;
	font-family: inherit;
	border: none;
`;

export interface ToolBarProps {
	children?: React.ReactNode;
}

export const ToolBar = (props: ToolBarProps) => {
	return (
		<>
			<Container>{props.children}</Container>
		</>
	);
};

export interface ToolBarItemProps {
	children?: React.ReactNode;
}

export const ToolBarItem = (props: ToolBarItemProps) => {
	return <Item>{props.children}</Item>;
};
