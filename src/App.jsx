import { useState, useRef } from "react";
import Canvas from "./canvas";
import "./App.css";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([32, 32]);
	const [showGrid, setShowGrid] = useState(true);
	const isMousePressed = useRef(false);

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
			/>
		</div>
	);
}

export default App;
