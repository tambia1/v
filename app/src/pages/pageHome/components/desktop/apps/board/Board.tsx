import { useState } from "react";
import * as S from "./Board.styles";

type BoardProps = {
	title: string;
	tasks: string[];
};

export const Board = () => {
	const [activeBoard, setActiveBoard] = useState("");
	const [boards, setBoards] = useState<BoardProps[]>([
		{
			title: "Backlog",
			tasks: ["Task 0", "Task 1"],
		},
		{
			title: "Doing",
			tasks: [],
		},
		{
			title: "Review",
			tasks: ["Task 2"],
		},
		{
			title: "Done",
			tasks: [],
		},
	]);

	const handleOnDragStartTask = (e: React.DragEvent, board: string, task: string) => {
		e.dataTransfer.setData("board", board);
		e.dataTransfer.setData("task", task);

		setActiveBoard(board);
	};

	const handleOnDragEndTask = () => {
		setActiveBoard("");
	};

	const handleOnDragOverTask = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleOnDropToBody = (e: React.DragEvent, targetBoard: string) => {
		e.preventDefault();
		e.stopPropagation();

		const sourceBoard = e.dataTransfer.getData("board") as string;
		const sourceTask = e.dataTransfer.getData("task") as string;

		setBoards(
			boards.map((board) => {
				if (board.title === sourceBoard) {
					return { ...board, tasks: board.tasks.filter((task) => task !== sourceTask) };
				}

				if (board.title === targetBoard) {
					return { ...board, tasks: [...board.tasks, sourceTask] };
				}

				return board;
			})
		);

		setActiveBoard("");
	};

	const handleOnDragOverBody = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleOnDragEnterBody = (e: React.DragEvent, board: string) => {
		e.preventDefault();
		setActiveBoard(board);
	};

	const handleOnDragLeaveBody = (e: React.DragEvent) => {
		e.preventDefault();
		setActiveBoard("");
	};

	return (
		<S.Board>
			<S.Columns>
				{boards.map((board) => (
					<S.Column key={board.title}>
						<S.ColumnHeader>{board.title}</S.ColumnHeader>
						<S.ColumnBody
							$isDragging={activeBoard === board.title}
							onDrop={(e) => {
								handleOnDropToBody(e, board.title);
							}}
							onDragOver={(e) => {
								handleOnDragOverBody(e);
							}}
							onDragEnter={(e) => {
								handleOnDragEnterBody(e, board.title);
							}}
							onDragLeave={(e) => {
								handleOnDragLeaveBody(e);
							}}
						>
							{board.tasks.map((task) => (
								<S.Task
									key={task}
									draggable
									onDragStart={(e) => {
										handleOnDragStartTask(e, board.title, task);
									}}
									onDragEnd={() => {
										handleOnDragEndTask();
									}}
									onDragOver={(e) => {
										handleOnDragOverTask(e);
									}}
								>
									{task}
								</S.Task>
							))}
						</S.ColumnBody>
					</S.Column>
				))}
			</S.Columns>
		</S.Board>
	);
};
