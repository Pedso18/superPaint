import React, { createContext } from "react";
import { useState, useEffect, useRef } from "react";

export default function Canvas(props) {
	const showGrid = props.showGrid;
	const [pixelGrid, setPixelGrid] = props.pixelGridState || [[]];
	const [gridSize, setGridSize] = props.gridSizeState || [];
	const canvasRef = useRef();
	const globalPixelSize = useRef();
	const isMousePressed = props.isMousePressed;

	const [selectedTool, setSelectedTool] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = (window.screen.availWidth / 100) * 70;
		canvas.height = (window.screen.availHeight / 100) * 85;

		var pixelSize = 40;

		while (
			pixelSize * gridSize[0] > canvas.width ||
			pixelSize * gridSize[1] > canvas.height
		) {
			pixelSize -= 1;
		}

		document.documentElement.style.setProperty("--pixel-size", `${pixelSize}px`);
		globalPixelSize.current = pixelSize;
		canvas.width += 4;
		canvas.height += 4;

		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = "black";

		let newGrid = [];

		canvas.onmousemove = e => handleMouseMove(e);

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: { r: 255, g: 255, b: 255, a: 0 } };
			}
		}

		setPixelGrid(newGrid);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = (window.screen.availWidth / 100) * 70;
		canvas.height = (window.screen.availHeight / 100) * 85;

		var pixelSize = 40;

		while (
			pixelSize * gridSize[0] > canvas.width ||
			pixelSize * gridSize[1] > canvas.height
		) {
			pixelSize -= 1;
		}

		globalPixelSize.current = pixelSize;
		canvas.width = pixelSize * gridSize[0] + 4;
		canvas.height = pixelSize * gridSize[1] + 4;

		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = "black";

		canvas.onmousemove = e => handleMouseMove(e, pixelSize, ctx);

		for (let i = 0; i < gridSize[1]; i++) {
			for (let a = 0; a < gridSize[0]; a++) {
				fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
			}
		}
	}, [pixelGrid, showGrid]);

	useEffect(() => {
		var pixelSize = 40;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "white";
		ctx.stokeStyle = "#000";

		while (
			pixelSize * gridSize[0] > canvas.width ||
			pixelSize * gridSize[1] > canvas.height
		) {
			pixelSize -= 1;
		}

		globalPixelSize.current = pixelSize;

		for (let i = 0; i < gridSize[1]; i++) {
			for (let a = 0; a < gridSize[0]; a++) {
				if (pixelGrid[i] && pixelGrid[i][a]) {
					let pixelColor = pixelGrid[i][a].color;
					ctx.fillStyle = rgbaToHex(pixelColor);
					if (props.showGrid === true) {
						fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
					} else {
						fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
					}
				}
			}
		}
	}, [showGrid]);

	return (
		<canvas
			onMouseDown={selectedTool ? e => bucketPaint(e) : e => pencilPaint(e)}
			className='canvas'
			ref={canvasRef}
			tabIndex={0}
			onKeyUp={e => {
				console.log(e.key.toLowerCase());
				if (e.key.toLowerCase() == "p") {
					setSelectedTool(!selectedTool);
					console.log("changed tool");
				}
			}}></canvas>
	);

	function pencilPaint(e) {
		const target = e.target;

		// Get the bounding rectangle of target
		const rect = target.getBoundingClientRect();

		// Mouse position
		const x = e.clientX - rect.left - globalPixelSize.current;
		const y = e.clientY - rect.top - globalPixelSize.current;

		let arrX =
			(x + globalPixelSize.current) / globalPixelSize.current -
			(((x + globalPixelSize.current) / globalPixelSize.current) % 1);
		let arrY =
			(y + globalPixelSize.current) / globalPixelSize.current -
			(((y + globalPixelSize.current) / globalPixelSize.current) % 1);

		pixelGrid[arrY][arrX].color = props.selectedColor.current;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = rgbaToHex(props.selectedColor.current);

		ctx.clearRect(
			globalPixelSize.current * arrX - 1 + 2,
			globalPixelSize.current * arrY - 1 + 2,
			globalPixelSize.current + 2,
			globalPixelSize.current + 2
		);

		if (props.showGrid === true) {
			fastFillRect(
				globalPixelSize.current * arrX - 1 + 2,
				globalPixelSize.current * arrY - 1 + 2,
				globalPixelSize.current + 2,
				globalPixelSize.current + 2
			);
			fastStrokeRect(
				globalPixelSize.current * arrX - 1 + 2,
				globalPixelSize.current * arrY - 1 + 2,
				globalPixelSize.current + 2,
				globalPixelSize.current + 2
			);
		} else {
			fastFillRect(
				globalPixelSize.current * arrX - 1 + 2,
				globalPixelSize.current * arrY - 1 + 2,
				globalPixelSize.current + 2,
				globalPixelSize.current + 2
			);
		}
	}

	function bucketPaint(e) {
		const target = e.target;

		// Get the bounding rectangle of target
		const rect = target.getBoundingClientRect();

		// Mouse position
		const x = e.clientX - rect.left - globalPixelSize.current;
		const y = e.clientY - rect.top - globalPixelSize.current;

		let arrX =
			(x + globalPixelSize.current) / globalPixelSize.current -
			(((x + globalPixelSize.current) / globalPixelSize.current) % 1);
		let arrY =
			(y + globalPixelSize.current) / globalPixelSize.current -
			(((y + globalPixelSize.current) / globalPixelSize.current) % 1);

		const targetColor = pixelGrid[arrY][arrX].color;

		const paintFunc = (x, y) => {
			if (
				JSON.stringify(targetColor) !== JSON.stringify(props.selectedColor.current)
			) {
				pixelGrid[y][x].color = props.selectedColor.current;

				const canvas = canvasRef.current;
				const ctx = canvas.getContext("2d");
				ctx.fillStyle = rgbaToHex(props.selectedColor.current);

				ctx.clearRect(
					globalPixelSize.current * x + 2,
					globalPixelSize.current * y + 2,
					globalPixelSize.current,
					globalPixelSize.current
				);

				if (props.showGrid === true) {
					fastFillRect(
						globalPixelSize.current * x + 2,
						globalPixelSize.current * y + 2,
						globalPixelSize.current,
						globalPixelSize.current
					);
					fastStrokeRect(
						globalPixelSize.current * x + 2,
						globalPixelSize.current * y + 2,
						globalPixelSize.current,
						globalPixelSize.current
					);
				} else {
					fastFillRect(
						globalPixelSize.current * x + 2,
						globalPixelSize.current * y + 2,
						globalPixelSize.current,
						globalPixelSize.current
					);
				}

				if (
					pixelGrid[y - 1] &&
					pixelGrid[y - 1][x] &&
					JSON.stringify(pixelGrid[y - 1][x].color) === JSON.stringify(targetColor)
				) {
					paintFunc(x, y - 1);
				}
				if (
					pixelGrid[y + 1] &&
					pixelGrid[y + 1][x] &&
					JSON.stringify(pixelGrid[y + 1][x].color) === JSON.stringify(targetColor)
				) {
					paintFunc(x, y + 1);
				}
				if (
					pixelGrid[y] &&
					pixelGrid[y][x + 1] &&
					JSON.stringify(pixelGrid[y][x + 1].color) === JSON.stringify(targetColor)
				) {
					paintFunc(x + 1, y);
				}
				if (
					pixelGrid[y] &&
					pixelGrid[y][x - 1] &&
					JSON.stringify(pixelGrid[y][x - 1].color) === JSON.stringify(targetColor)
				) {
					paintFunc(x - 1, y);
				}
			}
		};

		paintFunc(arrX, arrY);
	}

	function handleMouseMove(e, pixelSize, ctx) {
		const target = e.target;

		// Get the bounding rectangle of target
		const rect = target.getBoundingClientRect();

		// Mouse position
		const x = e.clientX - rect.left - pixelSize;
		const y = e.clientY - rect.top - pixelSize;

		let arrX = (x + pixelSize) / pixelSize - (((x + pixelSize) / pixelSize) % 1);
		let arrY = (y + pixelSize) / pixelSize - (((y + pixelSize) / pixelSize) % 1);

		ctx.fillStyle = "#ffffff";
		ctx.clearRect(
			(arrX - 2) * pixelSize + 2,
			(arrY - 2) * pixelSize + 2,
			pixelSize * 5,
			pixelSize * 5
		);

		ctx.stokeStyle = "black";

		for (let a = arrX - 2; a < arrX + 3; a++) {
			for (let i = arrY - 2; i < arrY + 3; i++) {
				if (pixelGrid[i] && pixelGrid[i][a]) {
					if (!(arrX === a && arrY === i)) {
						let pixelColor = pixelGrid[i][a].color;
						ctx.fillStyle = rgbaToHex(pixelColor);

						if (props.showGrid === true) {
							fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
							fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						} else {
							fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						}
					}
				}
			}
		}

		if (pixelGrid[arrY] && pixelGrid[arrY][arrX]) {
			let pixelColor = pixelGrid[arrY][arrX].color;
			ctx.fillStyle = rgbaToHex(pixelColor);

			if (isMousePressed.current) {
				pixelGrid[arrY][arrX].color = props.selectedColor.current;
			}

			if (props.showGrid === true) {
				fastFillRect(
					pixelSize * arrX - 1 + 2,
					pixelSize * arrY - 1 + 2,
					pixelSize + 2,
					pixelSize + 2
				);
				fastStrokeRect(
					pixelSize * arrX - 1 + 2,
					pixelSize * arrY - 1 + 2,
					pixelSize + 2,
					pixelSize + 2
				);
			} else {
				fastFillRect(
					pixelSize * arrX - 1 + 2,
					pixelSize * arrY - 1 + 2,
					pixelSize + 2,
					pixelSize + 2
				);
			}
		}
	}

	function fastStrokeRect(x, y, width, height) {
		const canvas = canvasRef ? canvasRef.current : undefined;
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.stroke();
		ctx.closePath();
	}
	function fastFillRect(x, y, width, height) {
		const canvas = canvasRef ? canvasRef.current : undefined;
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.fill();
		ctx.closePath();
	}

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
}
