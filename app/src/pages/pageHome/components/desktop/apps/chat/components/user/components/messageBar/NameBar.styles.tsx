import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import styled from "styled-components";

export const NameBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	height: 7rem;
	padding: 1rem;
	box-sizing: border-box;
	gap: 1rem;
`;

export const InputName = styled(Input)`
	width: 100%;
	font-size: 150%;
`;

export const ButtonSet = styled(Button)`
	font-size: 150%;
`;
