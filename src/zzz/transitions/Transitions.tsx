import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import * as S from "./Transitions.styles";
import { getElementPosition } from "./Transitions.uitls";

interface Props {
	children: ReactNode;
}

interface TransitionsContextProps {
	setElementSrc: (key: string, elementId: string) => void;
	setElementTrg: (key: string, elementId: string) => void;
	startTransition: () => void;
}

export const TransitionsContext = createContext<TransitionsContextProps>({ setElementSrc: () => {}, setElementTrg: () => {}, startTransition: () => {} });

export const TransitionsProvider = ({ children }: Props) => {
	const [elmA, setElmA] = useState<{ [key: string]: HTMLDivElement }>({});
	const [elmB, setElmB] = useState<{ [key: string]: HTMLDivElement }>({});
	const [counter, setCounter] = useState<number>(0);
	const refA = useRef<HTMLDivElement>(null);
	const refB = useRef<HTMLDivElement>(null);

	const TRANSITION_TIME = 3000;

	useEffect(() => {
		performTransition();
	}, [counter]);

	const cloneElement = (element: HTMLDivElement) => {
		const elm = element.cloneNode(true) as HTMLDivElement;

		const rect = getElementPosition(element, document.body);
		elm.style.transitionProperty = "all";
		elm.style.transitionDuration = TRANSITION_TIME + "ms";
		elm.style.transitionDelay = "0ms";
		elm.style.transitionTimingFunction = "ease";

		elm.style.position = "absolute";
		elm.style.left = rect.left + "px";
		elm.style.top = rect.top + "px";
		elm.style.width = rect.width + "px";
		elm.style.height = rect.height + "px";

		return elm;
	};

	const setElementSrc = (key: string, elementId: string) => {
		const element = document.querySelector(elementId) as HTMLDivElement;
		const elm = cloneElement(element);
		setElmA({ ...elmA, [key]: elm });

		const ref = refA.current!;
		ref.innerHTML = "";
		ref.appendChild(elm);
	};

	const setElementTrg = (key: string, elementId: string) => {
		const element = document.querySelector(elementId) as HTMLDivElement;
		const elm = cloneElement(element);
		setElmB({ ...elmB, [key]: elm });

		const ref = refB.current!;
		ref.innerHTML = "";
		ref.appendChild(elm);
	};

	const startTransition = () => {
		setCounter(counter + 1);
	};

	const performTransition = () => {
		if (!elmA || !elmB) {
			return;
		}

		setTimeout(() => {
			for (const key in elmA) {
				elmA[key].style.left = elmB[key].style.left;
				elmA[key].style.top = elmB[key].style.top;
				elmA[key].style.width = elmB[key].style.width;
				elmA[key].style.height = elmB[key].style.height;
			}

			setTimeout(() => {
				if (refA.current) {
					refA.current.innerHTML = "";
				}

				if (refB.current) {
					refB.current.innerHTML = "";
				}
			}, TRANSITION_TIME + 100);
		}, 10);
	};

	return (
		<TransitionsContext.Provider value={{ setElementSrc, setElementTrg, startTransition }}>
			<S.Container>
				<S.ElmA ref={refA} />
				<S.ElmB ref={refB} />
				<S.Children>{children}</S.Children>
			</S.Container>
		</TransitionsContext.Provider>
	);
};
