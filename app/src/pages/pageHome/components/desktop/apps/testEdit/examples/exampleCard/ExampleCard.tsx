import { Button } from "@src/components/button/Button";
import { Modal } from "@src/components/modal/Modal";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleCard = () => {
	const [isModalOpen1, setIsModalOpen1] = useState(false);

	return (
		<>
			<S.Col>
				<Text>Card</Text>

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
		</>
	);
};
