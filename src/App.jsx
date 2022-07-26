import { useState, useEffect, useRef } from "react";
import "./App.css";
import PixelBox from "./pixelBox";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([100, 100]);
	const isMousePressed = useRef(false);

	useEffect(() => {
		let newGrid = [];

		document.documentElement.style.setProperty("--amountOfChildrenX", gridSize[0]);
		document.documentElement.style.setProperty("--amountOfChildrenY", gridSize[1]);

		if (window.screen.availHeight > window.screen.availWidth) {
			document.documentElement.style.setProperty(
				"--sizeOfPixel",
				"calc(calc(70vw - 2px * var(--amountOfChildrenX)) / var(--amountOfChildrenX))"
			);
		} else {
			document.documentElement.style.setProperty(
				"--sizeOfPixel",
				"calc(calc(100vh - 2px * var(--amountOfChildrenY)) / var(--amountOfChildrenY))"
			);
		}

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: null };
			}
		}

		setPixelGrid(newGrid);
	}, []);

	useEffect(() => {
		let newGrid = [];

		document.documentElement.style.setProperty("--amountOfChildrenX", gridSize[0]);
		document.documentElement.style.setProperty("--amountOfChildrenY", gridSize[1]);

		if (window.screen.availHeight > window.screen.availWidth) {
			document.documentElement.style.setProperty(
				"--sizeOfPixel",
				"calc(calc(70vw - 2px * var(--amountOfChildrenX)) / var(--amountOfChildrenX))"
			);
		} else {
			document.documentElement.style.setProperty(
				"--sizeOfPixel",
				"calc(calc(100vh - 2px * var(--amountOfChildrenY)) / var(--amountOfChildrenY))"
			);
		}

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: "#fff" };
			}
		}

		setPixelGrid(newGrid);
	}, [gridSize]);

	return (
		<div
			className='App'
			onMouseDown={() => {
				console.log("pressed = true");
				isMousePressed.current = true;
			}}
			onMouseUp={() => {
				console.log("pressed = false");
				isMousePressed.current = false;
			}}>
			<div className='canvas'>
				<div className='pixelJacket'>
					{pixelGrid.map((item, key1) => {
						return (
							<>
								{item.map((pixelItem, key) => {
									return (
										<PixelBox isMousePressed={isMousePressed} color={pixelItem.color} key={key} />
									);
								})}
								<br />
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
