import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { GameEngine } from "@src/utils/GameEngine";
import { useEffect, useRef } from "react";
import * as S from "./Snake.styles";

export const Snake = () => {
	const refCanvas = useRef<HTMLDivElement>(null);
	const refCtx = useRef<CanvasRenderingContext2D>(null);

	const board: number[][] = Array(10)
		.fill(0)
		.map(() => Array(10).fill(0));

	useEffect(() => {
		if (refCanvas.current === null) {
			return;
		}

		const canvas = document.createElement("canvas");
		refCanvas.current.appendChild(canvas);

		const dpr = window.devicePixelRatio || 1;
		canvas.width = refCanvas.current.offsetWidth * dpr;
		canvas.height = refCanvas.current.offsetHeight * dpr;

		const ctx = canvas.getContext("2d");
		refCtx.current = ctx;

		const gameEngine = new GameEngine({
			onUpdate() {
				if (ctx) {
					draw(ctx);
				}
			},
		});

		gameEngine.start();
	}, []);

	const draw = (ctx: CanvasRenderingContext2D) => {
		drawBorder(ctx);
		drawBoard(ctx);
	};

	const drawBorder = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, ctx.canvas.width - 1, ctx.canvas.height - 1);
	};

	const drawBoard = (ctx: CanvasRenderingContext2D) => {
		const w = ctx.canvas.width / board[0].length;
		const h = ctx.canvas.height / board.length;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0, c = i; j < board[i].length; j++, c++) {
				const x = j * w;
				const y = i * h;

				if (board[i][j] === 0) {
					if (c % 2 === 0) {
						ctx.fillStyle = "#ddddff";
					} else {
						ctx.fillStyle = "#aaaaff";
					}
				} else {
					ctx.fillStyle = "#ff0000";
				}

				ctx.fillRect(x, y, w, h);
			}
		}
	};

	const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (refCtx.current === null) {
			return;
		}

		const canvas = e.currentTarget;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const w = refCtx.current.canvas.width / board[0].length;
		const h = refCtx.current.canvas.height / board.length;

		const i = Math.floor(y / h);
		const j = Math.floor(x / w);

		if (board[i][j] === 1) {
			board[i][j] = 0;
		} else {
			board[i][j] = 1;
		}
	};

	return (
		<S.Snake>
			<Text variant="header">
				<T>{lang.test.title}</T>
			</Text>

			<S.Container>
				<S.Board ref={refCanvas} onClick={handleOnClick} />
			</S.Container>
		</S.Snake>
	);
};
