import { useState } from "react";

export default function PixelBox(props) {
	const [color, setColor] = useState(props.color);

	return (
		<div
			onClick={() => {
				console.log("was clicked!");
				setColor(color === "#fff" ? "#000" : "#fff");
			}}
			className='pixelBox'
			style={{ backgroundColor: color }}></div>
	);
}
