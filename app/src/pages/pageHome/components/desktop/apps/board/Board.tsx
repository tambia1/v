import { useRef, useState } from "react";
import * as S from "./Board.styles";

type BoardProps = {
	title: string;
	tasks: string[];
};

export const Board = () => {
	const [activeBoard, setActiveBoard] = useState("");
	const [activeTask, setActiveTask] = useState("");

	const taskRefs = useRef<Map<string, HTMLElement>>(new Map());

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

		setActiveBoard(board);
	};

	const handleOnDragLeaveBody = (e: React.DragEvent) => {
		e.preventDefault();

		setActiveBoard("");
		setActiveTask("");
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

		const targetElement = taskRefs.current.get(sourceTask);
		if (targetElement) {
			const initialX = Number(e.dataTransfer.getData("initialX"));
			const initialY = Number(e.dataTransfer.getData("initialY"));
			const finalRect = targetElement.getBoundingClientRect();

			const deltaX = initialX - finalRect.x;
			const deltaY = initialY - finalRect.y;

			// Apply the initial transform to set the task where it started from
			targetElement.style.transition = "none";
			targetElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

			requestAnimationFrame(() => {
				// Now apply the transition to animate to the new position
				targetElement.style.transition = "transform 10.3s ease";
				targetElement.style.transform = `translate(0, 0)`;

				// Clean up the transform after the animation is done
				targetElement.addEventListener(
					"transitionend",
					() => {
						targetElement.style.transition = "";
						targetElement.style.transform = "";
					},
					{ once: true }
				);
			});
		}

		setActiveBoard("");
		setActiveTask("");
	};

	const handleOnDragStartTask = (e: React.DragEvent, board: string, task: string) => {
		e.dataTransfer.setData("board", board);
		e.dataTransfer.setData("task", task);
	};

	const handleOnDragEndTask = (e: React.DragEvent) => {
		e.preventDefault();

		setActiveBoard("");
		setActiveTask("");
	};

	const handleOnDragOverTask = (e: React.DragEvent, board: string, task: string) => {
		e.preventDefault();

		setActiveBoard(board);
		setActiveTask(task);
	};

	const handleOnDragLeaveTask = (e: React.DragEvent) => {
		e.preventDefault();

		setActiveBoard("");
		setActiveTask("");
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

						return { ...board, tasks: updatedTasks.filter((task) => task != sourceTask) };
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

		setActiveBoard("");
		setActiveTask("");
	};

	return (
		<S.Board>
			<S.Columns>
				{boards.map((board) => (
					<S.Column key={board.title}>
						<S.ColumnHeader>{board.title}</S.ColumnHeader>
						<S.ColumnBody
							$isDragOn={activeBoard === board.title}
							onDragOver={(e) => {
								handleOnDragOverBody(e, board.title);
							}}
							onDragLeave={(e) => {
								handleOnDragLeaveBody(e);
							}}
							onDrop={(e) => {
								handleOnDropToBody(e, board.title);
							}}
						>
							{board.tasks.map((task) => (
								<S.Task
									key={task}
									ref={(el) => el && taskRefs.current.set(task, el)}
									draggable
									$isDragOn={activeTask === task}
									onDragStart={(e) => {
										handleOnDragStartTask(e, board.title, task);
									}}
									onDragEnd={(e) => {
										handleOnDragEndTask(e);
									}}
									onDragOver={(e) => {
										handleOnDragOverTask(e, board.title, task);
									}}
									onDragLeave={(e) => {
										handleOnDragLeaveTask(e);
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
