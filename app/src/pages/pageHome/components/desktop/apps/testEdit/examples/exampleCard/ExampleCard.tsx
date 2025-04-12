import { Card } from "@src/components/card/Card";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleCard = () => {
	const [isCardOpen1, setIsCardOpen1] = useState(false);
	const [isCardOpen2, setIsCardOpen2] = useState(false);
	const [isCardOpen3, setIsCardOpen3] = useState(false);

	return (
		<>
			<S.Col>
				<Text>Card</Text>

				<Card
					collapsed={isCardOpen1}
					onClickCollapse={() => setIsCardOpen1(!isCardOpen1)}
					headerContent={
						<div>
							<Text>Header</Text>
						</div>
					}
					bodyContent={
						<div>
							<Text>Body</Text>
						</div>
					}
					footerContent={
						<div>
							<Text>Footer</Text>
						</div>
					}
				/>

				<Text>Card - no footer</Text>

				<Card
					collapsed={isCardOpen2}
					onClickCollapse={() => setIsCardOpen2(!isCardOpen2)}
					headerContent={
						<div>
							<Text>Header</Text>
						</div>
					}
					bodyContent={
						<div>
							<Text>Body</Text>
						</div>
					}
				/>

				<Text>Card Composition - header and arrow switched</Text>

				<Card
					collapsed={isCardOpen3}
					onClickCollapse={() => setIsCardOpen3(!isCardOpen3)}
					headerContent={
						<div>
							<Text>Header</Text>
						</div>
					}
					bodyContent={
						<div>
							<Text>Body</Text>
						</div>
					}
				/>
			</S.Col>
		</>
	);
};
