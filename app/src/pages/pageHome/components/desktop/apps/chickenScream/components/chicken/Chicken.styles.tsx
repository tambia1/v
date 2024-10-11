import styled, { css } from "styled-components";
import type { State } from "./Chicken.types";

export const Chicken = styled.div`
	width: 18rem;
	height: 25rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;

	position: relative;
`;

export const BodyGray = styled.div`
	width: 10rem;
	height: 15rem;
	position: absolute;
	left: 3rem;
	top: 5rem;
	background-color: #eee;
	border-radius:  2rem 2rem 2rem 1rem;
`;

export const BodyWhite = styled.div`
	width: 7rem;
	height: 13rem;
	position: absolute;
	left: 6rem;
	top: 6rem;
	background-color: #fff;
	border-radius: 2rem 2rem 2rem 0rem;
`;

export const TailGrey = styled.div`
    width: 3rem;
    height: 5rem;
    position: absolute;
    left: 1rem;
    top: 15rem;
    background-color: #eee;
    border-radius: 0 0 0 5rem;
`;

export const TailWhite = styled.div`
	width: 3rem;
    height: 3rem;
    position: absolute;
    left: 3rem;
    top: 16rem;
    background-color: #fff;
    border-radius: 0 0 0 5rem;
`;

export const Eye = styled.div<{ $state: State }>`
	width: 2rem;
	height: 3rem;
	position: absolute;
	left: 9rem;
	top: 7rem;
	background-color: #000;
	border-radius: 2rem;

    transform-origin: 1rem 1.5rem;
    ${(props) => props.$state === "idle" && css`scale: 1`};
    ${(props) => props.$state === "walk-1" && css`scale: 1.1`};
    ${(props) => props.$state === "walk-2" && css`scale: 1.1`};
    ${(props) => props.$state === "jump" && css`scale: 1.5`};

    transition: all 0.1s linear;
`;

export const WingContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const Wing = styled.div<{ $state: State }>`
	width: 5rem;
	height: 4.5rem;
	position: absolute;
	left: 4rem;
	top: 13rem;
    transform-origin: 4rem 2rem;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 10deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: 30deg`};
`;

export const WingTop = styled.div`
	width: 5rem;
	height: 2rem;
	position: absolute;
	left: 0rem;
	top: 0rem;
	background-color: #aaa;
	border-radius: 2rem;
`;

export const WingMiddle = styled.div`
	width: 3rem;
	height: 2rem;
	position: absolute;
	left: 2rem;
	top: 1.5rem;
	background-color: #aaa;
	border-radius: 2rem;
`;

export const WingBottom = styled.div`
	width: 2rem;
	height: 1.5rem;
	position: absolute;
	left: 3rem;
	top: 3rem;
	background-color: #aaa;
	border-radius: 2rem;
`;

export const BeakTop = styled.div<{ $state: State }>`
	position: absolute;
    left: 11rem;
    top: 8rem;
    border-top: 0rem solid transparent;
    border-left: 6rem solid #FD0;
    border-bottom: 2.5rem solid transparent;
    transform-origin: 1rem 0rem;
    ${(props) => props.$state === "idle" && css`rotate: 18deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: -18deg`};
`;

export const BeakBottom = styled.div<{ $state: State }>`
	position: absolute;
    left: 11rem;
    top: 9rem;
    border-top: 2.5rem solid transparent;
    border-left: 6rem solid #FD0;
    border-bottom: 0rem solid transparent;
    transform-origin: 1rem 2rem;
    ${(props) => props.$state === "idle" && css`rotate: -22deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: 22deg`};
`;

export const Leg = styled.div`
    width: 1.5rem;
    height: 3rem;
    position: absolute;
    left: 0rem;
    top: 0rem;
	background-color: #FD0;
	border-radius: 2rem;
`;

export const Foot = styled.div`
	width: 3rem;
    height: 1rem;
    position: absolute;
    left: 0rem;
    top: 2rem;
	background-color: #FD0;
	border-radius: 2rem;
`;

export const LegContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const LegLeft = styled.div<{ $state: State }>`
	width: 3rem;
    height: 3rem;
    position: absolute;
    left: 9rem;
    top: 20rem;
    transform-origin: 0.75rem -2rem;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: -25deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: -90deg`};
`;

export const LegRight = styled.div<{ $state: State }>`
	width: 3rem;	
    height: 3rem;
    position: absolute;
    left: 6rem;
    top: 20rem;
    rotate: 0deg;
    transform-origin: 0.75rem 0rem;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 45deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: 90deg`};
`;

export const CabbageTop = styled.div<{ $state: State }>`
	width: 2.5rem;
    height: 4rem;
    position: absolute;
    left: 8rem;
    top: 1rem;
    background-color: #f00;
    border-radius: 2rem;

    transform-origin: 1.75rem 4rem;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 10deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 10deg`};
    ${(props) => props.$state === "jump" && css`rotate: 20deg`};
`;

export const CabbageLeft = styled.div<{ $state: State }>`
	width: 2rem;
    height: 3rem;
    position: absolute;
    left: 7.5rem;
    top: 2rem;
    background-color: #f00;
    border-radius: 2rem;

    transform-origin: 1rem 3rem;
    ${(props) => props.$state === "idle" && css`rotate: -30deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: -35deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: -35deg`};
    ${(props) => props.$state === "jump" && css`rotate: -40deg`};
`;
