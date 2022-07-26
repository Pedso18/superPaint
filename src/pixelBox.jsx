import { useState } from "react";

export default function PixelBox(props) {
	const [color, setColor] = useState(props.color);

	return (
		<div
			onMouseDown={() => {
				setColor(color === "#fff" ? "#000" : "#fff");
			}}
			onMouseEnter={() => {
				if (props.isMousePressed.current === true) {
					setColor(color === "#fff" ? "#000" : "#fff");
				}
			}}
			className='pixelBox'
			style={{ backgroundColor: color }}></div>
	);
}
