import styled, { keyframes } from "styled-components";

const shadow = keyframes`
    0% { box-shadow: 0px 0px 40px 15px rgb(255, 235, 145); }
    50% { box-shadow: 0px 10px 50px 25px rgb(255, 235, 145); }
    100% { box-shadow: 10px 0px 40px 10px rgb(255, 235, 145); }
`;

export const Sun = styled.div`
    font-size: 100%;

    width: 5em;
	height: 5em;

    border-radius:50%;
    background:rgb(255, 239, 96);
    box-shadow: 0px 0px 40px 15px rgb(255, 235, 145);

    animation: ${shadow} 10s linear infinite alternate;
`;
