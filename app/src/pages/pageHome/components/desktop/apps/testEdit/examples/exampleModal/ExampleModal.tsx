import { Button } from "@src/components/button/Button";
import { Modal } from "@src/components/modal/Modal";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleModal = () => {
	const [isModalOpen1, setIsModalOpen1] = useState(false);
	const [isModalOpen2, setIsModalOpen2] = useState(false);
	const [isModalOpen3, setIsModalOpen3] = useState(false);
	const [isModalOpen4, setIsModalOpen4] = useState(false);

	return (
		<>
			<S.Col>
				<Text>Modal</Text>

				<S.Row>
					<S.Cell>
						<Button
							variant="styled"
							onClick={() => {
								setIsModalOpen1(true);
							}}
						>
							Show Modal
						</Button>
					</S.Cell>
				</S.Row>

				<Modal
					isVisible={isModalOpen1}
					iconName="info"
					title="Modal Title"
					description="Modal description text."
					onClickBackground={() => {
						setIsModalOpen1(false);
					}}
					buttons={[
						{
							content: "OK",
							onClick: () => {
								setIsModalOpen1(false);
							},
						},
						{
							content: "Cancel",
							onClick: () => {
								setIsModalOpen1(false);
							},
						},
					]}
				/>
			</S.Col>

			<S.Col>
				<Text>Modal Composition - no icon</Text>

				<S.Row>
					<S.Cell>
						<Button
							variant="styled"
							onClick={() => {
								setIsModalOpen2(true);
							}}
						>
							Show Modal
						</Button>
					</S.Cell>
				</S.Row>

				<Modal.Compose
					isVisible={isModalOpen2}
					onClickBackground={() => {
						setIsModalOpen2(false);
					}}
				>
					<Modal.Box.Compose>
						<Modal.Box.Content.Compose>
							<Modal.Box.Content.Header title="Modal Title" description="Modal description text." />
						</Modal.Box.Content.Compose>
						<Modal.Box.Buttons
							buttons={[
								{
									content: "OK",
									onClick: () => {
										setIsModalOpen2(false);
									},
								},
								{
									content: "Cancel",
									onClick: () => {
										setIsModalOpen2(false);
									},
								},
							]}
						/>
					</Modal.Box.Compose>
				</Modal.Compose>
			</S.Col>

			<S.Col>
				<Text>Modal Composition - no title</Text>

				<S.Row>
					<S.Cell>
						<Button
							variant="styled"
							onClick={() => {
								setIsModalOpen3(true);
							}}
						>
							Show Modal
						</Button>
					</S.Cell>
				</S.Row>

				<Modal.Compose
					isVisible={isModalOpen3}
					onClickBackground={() => {
						setIsModalOpen3(false);
					}}
				>
					<Modal.Box.Compose>
						<Modal.Box.Content.Compose>
							<Modal.Box.Content.Icon iconName="info" />
							<Modal.Box.Content.Header.Compose>
								<Modal.Box.Content.Header.Description>Modal description text.</Modal.Box.Content.Header.Description>
							</Modal.Box.Content.Header.Compose>
						</Modal.Box.Content.Compose>
						<Modal.Box.Buttons
							buttons={[
								{
									content: "OK",
									onClick: () => {
										setIsModalOpen3(false);
									},
								},
								{
									content: "Cancel",
									onClick: () => {
										setIsModalOpen3(false);
									},
								},
							]}
						/>
					</Modal.Box.Compose>
				</Modal.Compose>
			</S.Col>

			<S.Col>
				<Text>Modal Composition - line before buttons</Text>

				<S.Row>
					<S.Cell>
						<Button
							variant="styled"
							onClick={() => {
								setIsModalOpen4(true);
							}}
						>
							Show Modal
						</Button>
					</S.Cell>
				</S.Row>

				<Modal.Compose
					isVisible={isModalOpen4}
					onClickBackground={() => {
						setIsModalOpen4(false);
					}}
				>
					<Modal.Box.Compose>
						<Modal.Box.Content iconName="check" title="Modal Title" description="Modal description text." />
						<div>
							<hr />
						</div>
						<Modal.Box.Buttons
							buttons={[
								{
									content: "OK",
									onClick: () => {
										setIsModalOpen4(false);
									},
								},
								{
									content: "Cancel",
									onClick: () => {
										setIsModalOpen4(false);
									},
								},
							]}
						/>
					</Modal.Box.Compose>
				</Modal.Compose>
			</S.Col>
		</>
	);
};
