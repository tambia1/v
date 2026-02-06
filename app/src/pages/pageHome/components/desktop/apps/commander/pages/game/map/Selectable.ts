export class Selectable {
	private isSelected: boolean;

	constructor() {
		this.isSelected = false;
	}

	public setIsSelected(isSelected: boolean): void {
		this.isSelected = isSelected;
	}

	public getIsSelected(): boolean {
		return this.isSelected;
	}

	public toggle(): void {
		this.isSelected = !this.isSelected;
	}
}
