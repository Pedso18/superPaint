import { useEffect, useState } from "react";

export default function ColorCell(props) {
	const [selected, setSelected] = useState(false);
	const [myColor, setMyColor] = useState(props.defaultColor);

	useEffect(() => {
		executeStuff();
	}, []);

	useEffect(() => {
		executeStuff();
	}, [props.stateSelectedColor[0], props.selectedColorCellState[0]]);

	return selected === true ? (
		<div
			style={{ backgroundColor: rgbaToHex(props.stateSelectedColor[0]) }}
			className='colorCell'>
			<div className='selectedColorCellRing'></div>
		</div>
	) : (
		<div
			style={{ backgroundColor: rgbaToHex(myColor) }}
			className='colorCell'
			onMouseDown={() => {
				props.selectedColorCellState[1](props.colorCellIndex);
			}}></div>
	);

	function rgbaToHex(clr) {
		if (typeof clr === "string" && clr[0] === "#") {
			return clr;
		}

		let r = clr.r;
		let g = clr.g;
		let b = clr.b;
		let a = clr.a;

		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);
		a = Math.round(a * 255).toString(16);

		if (r.length === 1) r = "0" + r;
		if (g.length === 1) g = "0" + g;
		if (b.length === 1) b = "0" + b;
		if (a.length === 1) a = "0" + a;

		return "#" + r + g + b + a;
	}

	function executeStuff() {
		if (
			props.selectedColorCellState[0] !== props.colorCellIndex &&
			selected === true
		) {
			setMyColor(props.stateSelectedColor[0]);
			setSelected(false);
		} else if (
			selected === false &&
			props.selectedColorCellState[0] === props.colorCellIndex
		) {
			props.stateSelectedColor[1](myColor);
			props.selectedColor.current = myColor;
			setSelected(true);
		}
	}
}
