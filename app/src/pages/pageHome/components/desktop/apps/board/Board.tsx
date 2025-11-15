import { Input } from "@src/components/input/Input";
import { Modal } from "@src/components/modal/Modal";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useRef, useState } from "react";
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
	const refTasks = useRef<Map<string, HTMLElement>>(new Map());

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalText, setModalText] = useState("");

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

	const setTaskRef = (task: string, element: HTMLElement | null) => {
		if (element) {
			refTasks.current.set(task, element);
		} else {
			refTasks.current.delete(task);
		}
	};

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

		const sourceBoardTitle = e.dataTransfer.getData("board");
		const sourceTaskTitle = e.dataTransfer.getData("task");

		if (targetBoard === sourceBoardTitle) {
			return;
		}

		setBoards(
			boards.map((board) => {
				if (board.title === sourceBoardTitle) {
					return { ...board, tasks: board.tasks.filter((task) => task !== sourceTaskTitle) };
				}

				if (board.title === targetBoard) {
					return { ...board, tasks: [...board.tasks, sourceTaskTitle] };
				}

				return board;
			}),
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

		const sourceBoardTitle = e.dataTransfer.getData("board");
		const sourceTaskTitle = e.dataTransfer.getData("task");

		if (targetBoard !== sourceBoardTitle) {
			setBoards(
				boards.map((board) => {
					if (board.title === sourceBoardTitle) {
						const updatedTasks = [...board.tasks];
						return { ...board, tasks: updatedTasks.filter((task) => task !== sourceTaskTitle) };
					}

					if (board.title === targetBoard) {
						const targetIndex = board.tasks.indexOf(targetTask);
						const updatedTasks = [...board.tasks];
						updatedTasks.splice(targetIndex, 0, sourceTaskTitle);

						return { ...board, tasks: updatedTasks };
					}

					return board;
				}),
			);
		} else {
			setBoards(
				boards.map((board) => {
					if (board.title === sourceBoardTitle) {
						const targetIndex = board.tasks.indexOf(targetTask);
						const sourceIndex = board.tasks.indexOf(sourceTaskTitle);

						const updatedTasks = [...board.tasks];
						[updatedTasks[sourceIndex], updatedTasks[targetIndex]] = [updatedTasks[targetIndex], updatedTasks[sourceIndex]];

						return { ...board, tasks: updatedTasks };
					}

					return board;
				}),
			);
		}

		setActiveItem({ board: "", task: "" });
	};

	const handleOnClickBacklogPlus = () => {
		setIsModalVisible(true);
	};

	const handleOnClickModalOk = () => {
		setBoards([...boards.map((board, index) => (index === 0 ? { ...board, tasks: [...board.tasks, modalText] } : board))]);
		setModalText("");
		setIsModalVisible(false);
	};

	const handleOnClickModalCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<S.Board>
			<S.Columns>
				{boards.map((board) => (
					<S.Column key={board.title}>
						<S.ColumnHeader>
							<S.HeaderText>{board.title}</S.HeaderText>
							{board.title === "Backlog" && <S.HeaderIcon iconName="iconPlusCircle" onClick={handleOnClickBacklogPlus} />}
						</S.ColumnHeader>
						<S.ColumnBody
							$isDragOn={activeItem.board === board.title}
							onDragOver={(e) => handleOnDragOverBody(e, board.title)}
							onDragLeave={(e) => handleOnDragLeaveBody(e)}
							onDrop={(e) => handleOnDropToBody(e, board.title)}
						>
							{board.tasks.map((task) => (
								<S.Task
									ref={(element) => setTaskRef(task, element)}
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

			<Modal
				isVisible={isModalVisible}
				description={
					<S.ModalContent>
						<Text variant="body">Please enter task name</Text>
						<Input
							value={modalText}
							onTextChange={(value) => {
								setModalText(value);
							}}
						/>
					</S.ModalContent>
				}
				buttons={[
					{
						content: <T>{lang.all.cancel}</T>,
						onClick: handleOnClickModalCancel,
					},
					{
						content: <T>{lang.all.ok}</T>,
						onClick: handleOnClickModalOk,
					},
				]}
			/>
		</S.Board>
	);
};
