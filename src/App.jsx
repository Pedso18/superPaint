import { useState, useEffect } from "react";
import "./App.css";
import PixelBox from "./pixelBox";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([10, 10]);

	useEffect(() => {
		let newGrid = [];

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

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: "#fff" };
			}
		}

		setPixelGrid(newGrid);
	}, [gridSize]);

	return (
		<div className='App'>
			<div className='canvas'>
				{pixelGrid.map((item, key1) => {
					return (
						<div key={key1}>
							{item.map((pixelItem, key) => {
								return <PixelBox color={pixelItem.color} key={key} />;
							})}
							<br />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
