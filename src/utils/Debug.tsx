const showElmDetailsOnHoover = () => {
	document.onmousemove = function (e) {
		let target: HTMLDivElement = e.target as HTMLDivElement;
		let computerStyle = window.getComputedStyle(target);
		let rect = target.getBoundingClientRect();

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
				computerStyle.padding
		);
	};
};

export const Debug = {
	showElmDetailsOnHoover,
};
