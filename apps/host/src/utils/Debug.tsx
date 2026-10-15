const showElmDetailsOnHoover = () => {
	document.onmousemove = (e) => {
		const target: HTMLDivElement = e.target as HTMLDivElement;
		const computerStyle = window.getComputedStyle(target);
		const rect = target.getBoundingClientRect();

		console.log(
			"elm:  " +
				e.pageX +
				"," +
				e.pageY +
				"  " +
				rect.left +
				"," +
				rect.top +
				":" +
				target.offsetWidth +
				"," +
				target.offsetHeight +
				"  margin:" +
				computerStyle.margin +
				"  border:" +
				computerStyle.borderWidth +
				"  pading:" +
				computerStyle.padding,
		);
	};
};

export const Debug = {
	showElmDetailsOnHoover,
};
