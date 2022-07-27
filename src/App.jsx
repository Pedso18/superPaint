import { useState, useRef, useEffect } from "react";
import Canvas from "./canvas";
import "./App.css";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([32, 32]);
	const [showGrid, setShowGrid] = useState(true);
	const isMousePressed = useRef(false);
	const colorInput = useRef();
	const selectedColor = useRef("#000");

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
				console.log("pressed = true");
				isMousePressed.current = true;
			}}
			onMouseUp={() => {
				console.log("pressed = false");
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
		</div>
	);
}

export default App;
