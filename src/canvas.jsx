import { useState, useEffect, useRef } from "react";

export default function Canvas(props) {
	const showGrid = props.showGrid;
	const [pixelGrid, setPixelGrid] = props.pixelGridState || [[]];
	const [gridSize, setGridSize] = props.gridSizeState || [];
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
			fastFillRect(0, 0, canvas.width, canvas.height);
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
							fastStrokeRect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
						} else {
							fastFillRect(
								pixelSize * a - 1 + 2,
								pixelSize * i - 1 + 2,
								pixelSize + 2,
								pixelSize + 2
							);
							console.log("no grid");
						}
					} else {
						if (props.showGrid === true) {
							fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						} else {
							console.log("no grid");
							fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
						}
					}
				}
			}
		};

		for (let i = 0; i < gridSize[1]; i++) {
			newGrid[i] = [];
			for (let a = 0; a < gridSize[0]; a++) {
				newGrid[i][a] = { color: "#fff" };
				fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
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

			console.log(
				(x + pixelSize) / pixelSize - (((x + pixelSize) / pixelSize) % 1),
				(y + pixelSize) / pixelSize - (((y + pixelSize) / pixelSize) % 1)
			);

			let arrX = (x + pixelSize) / pixelSize - (((x + pixelSize) / pixelSize) % 1);
			let arrY = (y + pixelSize) / pixelSize - (((y + pixelSize) / pixelSize) % 1);

			ctx.fillStyle = "white";
			fastFillRect(arrX * pixelSize, arrY * pixelSize, pixelSize * 3, pixelSize * 3);

			ctx.stokeStyle = "black";
			fastStrokeRect(2, 2, pixelSize * gridSize[0], pixelSize * gridSize[1]);

			for (let a = arrX - 2; a < arrX + 3; a++) {
				for (let i = arrY - 2; i < arrY + 3; i++) {
					if (pixelGrid[i] && pixelGrid[i][a]) {
						ctx.fillStyle = pixelGrid[i][a].color;

						if (
							x > pixelSize * (a - 1) &&
							x < pixelSize * a &&
							y > pixelSize * (i - 1) &&
							y < pixelSize * i
						) {
							if (isMousePressed.current) {
								console.log(props.selectedColor.current);
								pixelGrid[i][a].color = props.selectedColor.current;
							}

							if (props.showGrid === true) {
								if (ctx.fillStyle != "#fff") {
									fastFillRect(
										pixelSize * a - 1 + 2,
										pixelSize * i - 1 + 2,
										pixelSize + 2,
										pixelSize + 2
									);
								}
								fastStrokeRect(
									pixelSize * a - 1 + 2,
									pixelSize * i - 1 + 2,
									pixelSize + 2,
									pixelSize + 2
								);
							} else {
								if (ctx.fillStyle != "#fff") {
									fastFillRect(
										pixelSize * a - 1 + 2,
										pixelSize * i - 1 + 2,
										pixelSize + 2,
										pixelSize + 2
									);
								}
							}
						} else {
							if (props.showGrid === true) {
								if (ctx.fillStyle != "#fff") {
									fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
								}

								fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
							} else {
								if (ctx.fillStyle != "#fff") {
									fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
								}
							}
						}
					}
				}
			}
		};

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

		ctx.fillStyle = "white";
		ctx.stokeStyle = "#000";

		while (
			pixelSize * gridSize[0] > canvas.width ||
			pixelSize * gridSize[1] > canvas.height
		) {
			pixelSize -= 1;
		}

		for (let i = 0; i < gridSize[1]; i++) {
			for (let a = 0; a < gridSize[0]; a++) {
				if (pixelGrid[i] && pixelGrid[i][a]) {
					ctx.fillStyle = pixelGrid[i][a].color;
				}
				if (props.showGrid === true) {
					fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
					fastStrokeRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
				} else {
					console.log("no grid");
					fastFillRect(pixelSize * a + 2, pixelSize * i + 2, pixelSize, pixelSize);
				}
			}
		}
	}, [showGrid]);

	return <canvas className='canvas' ref={canvasRef}></canvas>;

	function fastStrokeRect(x, y, width, height) {
		const canvas = canvasRef?.current;
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.stroke();
		ctx.closePath();
	}
	function fastFillRect(x, y, width, height) {
		const canvas = canvasRef?.current;
		const ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.fill();
		ctx.closePath();
	}
}
