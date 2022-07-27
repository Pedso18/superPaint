import { useState, useEffect, useRef } from "react";

export default function Canvas(props) {
	const showGrid = props.showGrid;
	const [pixelGrid, setPixelGrid] = props.pixelGridState || [];
	const [gridSize, setGridSize] = props.gridSizeState;
	const canvasRef = useRef();
	const isMousePressed = props.isMousePressed;

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = (window.screen.availWidth / 100) * 70;
		canvas.height = (window.screen.availHeight / 100) * 85;

		var pixelSize = 40;

		while (
			pixelSize * gridSize[0] > canvas.width ||
			pixelSize * gridSize[1] > canvas.height
		) {
			pixelSize -= 0.1;
		}

		canvas.width += 4;
		canvas.height += 4;

		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = "black";

		let newGrid = [];

		canvas.onmousemove = function (e) {
			const target = e.target;

			// Get the bounding rectangle of target
			const rect = target.getBoundingClientRect();

			// Mouse position
			const x = e.clientX - rect.left - pixelSize;
			const y = e.clientY - rect.top - pixelSize;

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "black";

			console.log("show grid is", props.showGrid);

			for (let i = 0; i < gridSize[1]; i++) {
				newGrid[i] = [];
				for (let a = 0; a < gridSize[0]; a++) {
					if (
						x > pixelSize * (a - 1) &&
						x < pixelSize * a &&
						y > pixelSize * (i - 1) &&
						y < pixelSize * i
					) {
						if (props.showGrid === true) {
							ctx.strokeRect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
						} else {
							ctx.fillRect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
							console.log("no grid");
						}
					} else {
						if (props.showGrid === true) {
							ctx.strokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						} else {
							console.log("no grid");
							ctx.fillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						}
					}
				}
			}
		};

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: "#fff" };
				ctx.strokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
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

		canvas.width += 4;
		canvas.height += 4;

		const ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = "black";

		canvas.onmousemove = function (e) {
			const target = e.target;

			// Get the bounding rectangle of target
			const rect = target.getBoundingClientRect();

			// Mouse position
			const x = e.clientX - rect.left - pixelSize;
			const y = e.clientY - rect.top - pixelSize;

			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.stokeStyle = "black";
			ctx.strokeRect(2, 2, pixelSize * gridSize[0], pixelSize * gridSize[1]);

			for (let i = 0; i < gridSize[1]; i++) {
				for (let a = 0; a < gridSize[0]; a++) {
					if (pixelGrid[i][a] && pixelGrid[i][a].color) {
						ctx.fillStyle = pixelGrid[i][a].color;
					}

					if (
						x > pixelSize * (a - 1) &&
						x < pixelSize * a &&
						y > pixelSize * (i - 1) &&
						y < pixelSize * i
					) {
						if (isMousePressed.current) {
							pixelGrid[i][a].color = pixelGrid[i][a].color == "#fff" ? "#000" : "#fff";
						}

						if (props.showGrid === true) {
							if (ctx.fillStyle != "#fff") {
								ctx.beginPath();
								ctx.rect(
									pixelSize * a - 1 + 2,
									pixelSize * i - 1 + 2,
									pixelSize + 2,
									pixelSize + 2
								);
								ctx.fill();
								ctx.closePath();
							}
							ctx.strokeRect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
						} else {
							ctx.beginPath();
							ctx.rect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
							ctx.fill();
							ctx.closePath();
						}
					} else {
						if (props.showGrid === true) {
							if (ctx.fillStyle != "#fff") {
								ctx.beginPath();
								ctx.rect(
									pixelSize * a - 1 + 2,
									pixelSize * i - 1 + 2,
									pixelSize + 2,
									pixelSize + 2
								);
								ctx.fill();
								ctx.closePath();
							}
							ctx.strokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						} else {
							ctx.beginPath();
							ctx.rect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
							ctx.fill();
							ctx.closePath();
						}
					}
				}
			}
		};

		for (let i = 0; i < gridSize[1]; i++) {
			for (let a = 0; a < gridSize[0]; a++) {
				ctx.strokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
			}
		}
	}, [showGrid, pixelGrid]);

	return <canvas className='canvas' ref={canvasRef}></canvas>;
}
