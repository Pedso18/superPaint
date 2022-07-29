import { useState, useRef, useEffect } from "react";
import Canvas from "./canvas";
import "./App.css";
import { RgbaColorPicker } from "react-colorful";
import ColorCell from "./colorCell";

function App() {
	const [pixelGrid, setPixelGrid] = useState([]);
	const [gridSize, setGridSize] = useState([32, 32]);
	const [showGrid, setShowGrid] = useState(true);
	const isMousePressed = useRef(false);
	const selectedColor = useRef({ r: 255, g: 255, b: 255, a: 1 });
	const [stateSelectedColor, setStateSelectedColor] = useState({
		r: 255,
		g: 255,
		b: 255,
		a: 1,
	});
	const [selectedColorCell, setSelectedColorCell] = useState(0);

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
			<div className='rightPanel'>
				<RgbaColorPicker
					className='colorPicker'
					tabIndex={-1}
					color={stateSelectedColor}
					onChange={e => {
						console.log(e);
						selectedColor.current = e;
						setStateSelectedColor(e);
					}}
				/>

				<div className='colorDiv'>
					<ColorCell
						selectedColor={selectedColor}
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={0}
						defaultColor={{ r: 255, g: 255, b: 255, a: 1 }}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={1}
						defaultColor={{ r: 252, g: 244, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={2}
						defaultColor={{ r: 255, g: 100, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={3}
						defaultColor={{ r: 221, g: 2, b: 2, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={4}
						defaultColor={{ r: 240, g: 2, b: 133, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={5}
						defaultColor={{ r: 70, g: 0, b: 165, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={6}
						defaultColor={{ r: 0, g: 0, b: 213, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={7}
						defaultColor={{ r: 0, g: 174, b: 233, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={8}
						defaultColor={{ r: 26, g: 185, b: 12, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={9}
						defaultColor={{ r: 0, g: 100, b: 7, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={10}
						defaultColor={{ r: 87, g: 40, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={11}
						defaultColor={{ r: 145, g: 113, b: 53, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={12}
						defaultColor={{ r: 252, g: 244, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={13}
						defaultColor={{ r: 252, g: 244, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={14}
						defaultColor={{ r: 252, g: 244, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={15}
						defaultColor={{ r: 255, g: 255, b: 255, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={16}
						defaultColor={{ r: 193, g: 193, b: 193, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={17}
						defaultColor={{ r: 129, g: 129, b: 129, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={18}
						defaultColor={{ r: 14, g: 14, b: 14, a: 1 }}
						selectedColor={selectedColor}
					/>
					<ColorCell
						stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
						selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
						colorCellIndex={19}
						defaultColor={{ r: 0, g: 0, b: 0, a: 1 }}
						selectedColor={selectedColor}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
