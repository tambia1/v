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
			tasks: ["Task 0", "Task 1", "Task 2"],
		},
		{
			title: "Doing",
			tasks: [],
		},
		{
			title: "Review",
			tasks: ["Task 3"],
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

	const handleOnDropToTask = (e: React.DragEvent, targetBoard: string, targetTask: string) => {
		e.preventDefault();

		const sourceBoard = e.dataTransfer.getData("board") as string;
		const sourceTask = e.dataTransfer.getData("task") as string;

		if (targetBoard !== sourceBoard) {
			return;
		}

		if (sourceBoard === targetBoard) {
			setBoards(
				boards.map((board) => {
					if (board.title === sourceBoard) {
						const targetIndex = board.tasks.indexOf(targetTask);
						const sourceIndex = board.tasks.indexOf(sourceTask);

						const updatedTasks = [...board.tasks];

						[updatedTasks[sourceIndex], updatedTasks[targetIndex]] = [updatedTasks[targetIndex], updatedTasks[sourceIndex]];

						return { ...board, tasks: updatedTasks };
					}
					return board;
				})
			);
		}

		setActiveBoard("");
	};

	const handleOnDropToBody = (e: React.DragEvent, targetBoard: string) => {
		e.preventDefault();
		e.stopPropagation();

		const sourceBoard = e.dataTransfer.getData("board") as string;
		const sourceTask = e.dataTransfer.getData("task") as string;

		if (targetBoard === sourceBoard) {
			return;
		}

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
									onDrop={(e) => {
										handleOnDropToTask(e, board.title, task);
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
