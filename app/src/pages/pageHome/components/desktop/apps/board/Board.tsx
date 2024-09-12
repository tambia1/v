import { useState } from "react";
import * as S from "./Board.styles";

type BoardProps = {
	title: string;
	tasks: string[];
};

type ActiveState = {
	board: string;
	task: string;
};

export const Board = () => {
	const [activeItem, setActiveItem] = useState<ActiveState>({ board: "", task: "" });

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

	const handleOnDragOverBody = (e: React.DragEvent, board: string) => {
		e.preventDefault();
		setActiveItem((prev) => ({ ...prev, board }));
	};

	const handleOnDragLeaveBody = (e: React.DragEvent) => {
		e.preventDefault();
		setActiveItem({ ...activeItem, board: "", task: "" });
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

		setActiveItem({ board: "", task: "" });
	};

	const handleOnDragStartTask = (e: React.DragEvent, board: string, task: string) => {
		e.dataTransfer.setData("board", board);
		e.dataTransfer.setData("task", task);
		setActiveItem({ board, task });
	};

	const handleOnDragEndTask = (e: React.DragEvent) => {
		e.preventDefault();
		setActiveItem({ board: "", task: "" });
	};

	const handleOnDragOverTask = (e: React.DragEvent, board: string, task: string) => {
		e.preventDefault();
		setActiveItem({ board, task });
	};

	const handleOnDragLeaveTask = (e: React.DragEvent) => {
		e.preventDefault();
		setActiveItem((prev) => ({ ...prev, task: "" }));
	};

	const handleOnDropToTask = (e: React.DragEvent, targetBoard: string, targetTask: string) => {
		e.preventDefault();
		e.stopPropagation();

		const sourceBoard = e.dataTransfer.getData("board") as string;
		const sourceTask = e.dataTransfer.getData("task") as string;

		if (targetBoard !== sourceBoard) {
			setBoards(
				boards.map((board) => {
					if (board.title === sourceBoard) {
						const updatedTasks = [...board.tasks];
						return { ...board, tasks: updatedTasks.filter((task) => task !== sourceTask) };
					}

					if (board.title === targetBoard) {
						const targetIndex = board.tasks.indexOf(targetTask);
						const updatedTasks = [...board.tasks];
						updatedTasks.splice(targetIndex, 0, sourceTask);

						return { ...board, tasks: updatedTasks };
					}

					return board;
				})
			);
		} else {
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

		setActiveItem({ board: "", task: "" });
	};

	return (
		<S.Board>
			<S.Columns>
				{boards.map((board) => (
					<S.Column key={board.title}>
						<S.ColumnHeader>{board.title}</S.ColumnHeader>
						<S.ColumnBody
							$isDragOn={activeItem.board === board.title}
							onDragOver={(e) => handleOnDragOverBody(e, board.title)}
							onDragLeave={(e) => handleOnDragLeaveBody(e)}
							onDrop={(e) => handleOnDropToBody(e, board.title)}
						>
							{board.tasks.map((task) => (
								<S.Task
									key={task}
									draggable
									$isDragOn={activeItem.task === task}
									onDragStart={(e) => handleOnDragStartTask(e, board.title, task)}
									onDragEnd={(e) => handleOnDragEndTask(e)}
									onDragOver={(e) => handleOnDragOverTask(e, board.title, task)}
									onDragLeave={(e) => handleOnDragLeaveTask(e)}
									onDrop={(e) => handleOnDropToTask(e, board.title, task)}
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
