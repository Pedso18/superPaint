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
					<div className='makingColorsRound'>
						<ColorCell
							selectedColor={selectedColor}
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={0}
							defaultColor={"#d1313d"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={1}
							selectedColor={selectedColor}
							defaultColor={"#e6625d"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={2}
							selectedColor={selectedColor}
							defaultColor={"#f9bf76"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={3}
							selectedColor={selectedColor}
							defaultColor={"#8eb1c5"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={4}
							selectedColor={selectedColor}
							defaultColor={"#615376"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={5}
							selectedColor={selectedColor}
							defaultColor={"#101624"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={6}
							selectedColor={selectedColor}
							defaultColor={"#351930"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={7}
							selectedColor={selectedColor}
							defaultColor={"#571c3c"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={8}
							selectedColor={selectedColor}
							defaultColor={"#7a1d49"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={9}
							selectedColor={selectedColor}
							defaultColor={"#9c2052"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={10}
							selectedColor={selectedColor}
							defaultColor={"#73c8a7"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={11}
							selectedColor={selectedColor}
							defaultColor={"#dee1b6"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={12}
							selectedColor={selectedColor}
							defaultColor={"#e1b866"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={13}
							selectedColor={selectedColor}
							defaultColor={"#bd5530"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={14}
							selectedColor={selectedColor}
							defaultColor={"#373b44"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={15}
							selectedColor={selectedColor}
							defaultColor={"#a70268"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={16}
							selectedColor={selectedColor}
							defaultColor={"#f10d4a"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={17}
							selectedColor={selectedColor}
							defaultColor={"#fc6b3f"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={18}
							selectedColor={selectedColor}
							defaultColor={"#f7d96b"}
						/>
						<ColorCell
							stateSelectedColor={[stateSelectedColor, setStateSelectedColor]}
							selectedColorCellState={[selectedColorCell, setSelectedColorCell]}
							colorCellIndex={19}
							selectedColor={selectedColor}
							defaultColor={"#339193"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
