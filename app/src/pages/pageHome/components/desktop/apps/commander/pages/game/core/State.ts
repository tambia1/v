type StateParams = {
	isSelected: boolean;
};

export class State {
	public isSelected: boolean;

	constructor(params: StateParams) {
		this.isSelected = params.isSelected;
	}
}
