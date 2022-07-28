import { useState, useRef, useEffect } from "react";
import Canvas from "./canvas";
import "./App.css";
import { RgbaColorPicker } from "react-colorful";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([32, 32]);
	const [showGrid, setShowGrid] = useState(true);
	const isMousePressed = useRef(false);
	const colorInput = useRef();
	const selectedColor = useRef({ r: 255, g: 255, b: 255, a: 1 });

	useEffect(() => {
		colorInput.current.addEventListener("input", () => {
			selectedColor.current = colorInput.current.value;
			console.log("color is now:", selectedColor.current);
		});
	}, []);

	return (
		<div
			tabIndex={0}
			className='App'
			onMouseDown={() => {
				isMousePressed.current = true;
			}}
			onMouseUp={() => {
				isMousePressed.current = false;
			}}
			onKeyUp={e => {
				if (e.key.toLowerCase() === "g") {
					setShowGrid(!showGrid);
				}
			}}>
			<Canvas
				isMousePressed={isMousePressed}
				showGrid={showGrid}
				pixelGridState={[pixelGrid, setPixelGrid]}
				gridSizeState={[gridSize, setGridSize]}
				selectedColor={selectedColor}
			/>
			<input ref={colorInput} type='color' />
			<RgbaColorPicker
				onChange={e => {
					console.log(e);
					selectedColor.current = e;
				}}
			/>
		</div>
	);
}

export default App;
