type StateParams = {
	isSelected: boolean;
	isHovered: boolean;
};

export class State {
	public isSelected: boolean;
	public isHovered: boolean;

	constructor(params: StateParams) {
		this.isSelected = params.isSelected;
		this.isHovered = params.isHovered;
	}
}
