import { Card } from "@src/components/card/Card";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleCard = () => {
	const [isCardOpen1, setIsCardOpen1] = useState(false);
	const [isCardOpen2, setIsCardOpen2] = useState(false);
	const [isCardOpen3, setIsCardOpen3] = useState(false);
	const [isCardOpen4, setIsCardOpen4] = useState(false);

	return (
		<>
			<S.Col>
				<S.Title>Card</S.Title>

				<Card width="size900" bodyContent={"Body"} />

				<Text>Card - with width and height</Text>

				<Card width="size900" height="size500" bodyContent={"Body"} />

				<Text>Card - with content</Text>

				<Card
					$collapsed={isCardOpen1}
					onClickCollapse={() => setIsCardOpen1(!isCardOpen1)}
					headerContent={"Header"}
					bodyContent={"Body"}
					footerContent={"Footer"}
				/>

				<Text>Card - no footer</Text>

				<Card $collapsed={isCardOpen2} onClickCollapse={() => setIsCardOpen2(!isCardOpen2)} headerContent={"Header"} bodyContent={"Body"} />

				<Text>Card Composition - body and footer switched</Text>

				<Card.Compose>
					<Card.Header $collapsed={isCardOpen3} iconName="iconChevronsDown" content={"Header"} onClickCollapse={() => setIsCardOpen3(!isCardOpen3)} />
					<Card.Footer content="Footer" />
					<Card.Body $collapsed={isCardOpen3} content="Body" />
				</Card.Compose>

				<Text>Card Composition - header content and arrow switched and no footer</Text>

				<Card.Compose>
					<Card.Header.Compose onClick={() => setIsCardOpen4(!isCardOpen4)} $clickable>
						<Card.Header.Icon iconName="iconArrowDown" $collapsed={isCardOpen4} />
						<Card.Header.Content content="Header" />
					</Card.Header.Compose>

					<Card.Body $collapsed={isCardOpen4} content="Body" />
				</Card.Compose>

				<Text>Card Composition - header with no arrow and no collapse</Text>

				<Card.Compose>
					<Card.Header content={"Header"} />
					<Card.Body content="Body" />
				</Card.Compose>
			</S.Col>
		</>
	);
};
