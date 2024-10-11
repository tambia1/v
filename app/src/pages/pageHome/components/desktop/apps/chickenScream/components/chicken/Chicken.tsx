import * as S from "./Chicken.styles";
import type { State } from "./Chicken.types";

type Props = {
	state: State;
};

export const Chicken = ({ state }: Props) => {
	return (
		<S.Chicken>
			<S.BeakTop $state={state} />
			<S.BeakBottom $state={state} />

			<S.LegLeft $state={state}>
				<S.LegContainer>
					<S.Leg />
					<S.Foot />
				</S.LegContainer>
			</S.LegLeft>

			<S.LegRight $state={state}>
				<S.LegContainer>
					<S.Leg />
					<S.Foot />
				</S.LegContainer>
			</S.LegRight>

			<S.BodyGray />
			<S.BodyWhite />
			<S.TailGrey />
			<S.TailWhite />

			<S.Eye />

			<S.Wing $state={state}>
				<S.WingContainer>
					<S.WingTop />
					<S.WingMiddle />
					<S.WingBottom />
				</S.WingContainer>
			</S.Wing>

			<S.CabbageTop />
			<S.CabbageLeft />
		</S.Chicken>
	);
};
