import styled, { css } from "styled-components";
import type { State } from "./Chicken.types";

export const Chicken = styled.div`
    font-size: 100%;

    width: 18em;
	height: 25em;
	overflow: hidden;

	display: flex;
	flex-direction: column;

	position: relative;
`;

export const BodyGray = styled.div`
	width: 10em;
	height: 15em;
	position: absolute;
	left: 3em;
	top: 5em;
	background-color: #eee;
	border-radius:  2em 2em 2em 1em;
`;

export const BodyWhite = styled.div`
	width: 7em;
	height: 13em;
	position: absolute;
	left: 6em;
	top: 6em;
	background-color: #fff;
	border-radius: 2em 2em 2em 0em;
`;

export const TailGrey = styled.div`
    width: 3em;
    height: 5em;
    position: absolute;
    left: 1em;
    top: 15em;
    background-color: #eee;
    border-radius: 0 0 0 5em;
`;

export const TailWhite = styled.div`
	width: 3em;
    height: 3em;
    position: absolute;
    left: 3em;
    top: 16em;
    background-color: #fff;
    border-radius: 0 0 0 5em;
`;

export const Eye = styled.div<{ $state: State }>`
	width: 2em;
	height: 3em;
	position: absolute;
	left: 9em;
	top: 7em;
	background-color: #000;
	border-radius: 2em;

    transform-origin: 1em 1.5em;
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
	width: 5em;
	height: 4.5em;
	position: absolute;
	left: 4em;
	top: 13em;
    transform-origin: 4em 2em;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 10deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) =>
			props.$state === "jump" &&
			css`
                @keyframes fly {
                    0% {
                        rotate: 0deg
                    },
                    100% {
                        rotate: 30deg
                    }
                }

                animation: fly 0.05s infinite alternate;
    `};
`;

export const WingTop = styled.div`
	width: 5em;
	height: 2em;
	position: absolute;
	left: 0em;
	top: 0em;
	background-color: #aaa;
	border-radius: 2em;
`;

export const WingMiddle = styled.div`
	width: 3em;
	height: 2em;
	position: absolute;
	left: 2em;
	top: 1.5em;
	background-color: #aaa;
	border-radius: 2em;
`;

export const WingBottom = styled.div`
	width: 2em;
	height: 1.5em;
	position: absolute;
	left: 3em;
	top: 3em;
	background-color: #aaa;
	border-radius: 2em;
`;

export const BeakTop = styled.div<{ $state: State }>`
	position: absolute;
    left: 11em;
    top: 8em;
    border-top: 0em solid transparent;
    border-left: 6em solid #FD0;
    border-bottom: 2.5em solid transparent;
    transform-origin: 1em 0em;
    ${(props) => props.$state === "idle" && css`rotate: 18deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: -18deg`};
`;

export const BeakBottom = styled.div<{ $state: State }>`
	position: absolute;
    left: 11em;
    top: 9em;
    border-top: 2.5em solid transparent;
    border-left: 6em solid #FD0;
    border-bottom: 0em solid transparent;
    transform-origin: 1em 2em;
    ${(props) => props.$state === "idle" && css`rotate: -22deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: 22deg`};
`;

export const Leg = styled.div`
    width: 1.5em;
    height: 3em;
    position: absolute;
    left: 0em;
    top: 0em;
	background-color: #FD0;
	border-radius: 2em;
`;

export const Foot = styled.div`
	width: 3em;
    height: 1em;
    position: absolute;
    left: 0em;
    top: 2em;
	background-color: #FD0;
	border-radius: 2em;
`;

export const LegContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const LegLeft = styled.div<{ $state: State }>`
	width: 3em;
    height: 3em;
    position: absolute;
    left: 9em;
    top: 20em;
    transform-origin: 0.75em -2em;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: -25deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: -90deg`};
`;

export const LegRight = styled.div<{ $state: State }>`
	width: 3em;	
    height: 3em;
    position: absolute;
    left: 6em;
    top: 20em;
    rotate: 0deg;
    transform-origin: 0.75em 0em;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 45deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 0deg`};
    ${(props) => props.$state === "jump" && css`rotate: 90deg`};
`;

export const CabbageTop = styled.div<{ $state: State }>`
	width: 2.5em;
    height: 4em;
    position: absolute;
    left: 8em;
    top: 1em;
    background-color: #f00;
    border-radius: 2em;

    transform-origin: 1.75em 4em;
    ${(props) => props.$state === "idle" && css`rotate: 0deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: 10deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: 10deg`};
    ${(props) => props.$state === "jump" && css`rotate: 20deg`};
`;

export const CabbageLeft = styled.div<{ $state: State }>`
	width: 2em;
    height: 3em;
    position: absolute;
    left: 7.5em;
    top: 2em;
    background-color: #f00;
    border-radius: 2em;

    transform-origin: 1em 3em;
    ${(props) => props.$state === "idle" && css`rotate: -30deg`};
    ${(props) => props.$state === "walk-1" && css`rotate: -35deg`};
    ${(props) => props.$state === "walk-2" && css`rotate: -35deg`};
    ${(props) => props.$state === "jump" && css`rotate: -40deg`};
`;
