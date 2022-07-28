import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Canvas(props) {
	const showGrid = props.showGrid;
	const [pixelGrid, setPixelGrid] = props.pixelGridState || [[]];
	const [gridSize, setGridSize] = props.gridSizeState || [];
	const canvasRef = useRef();
	const globalPixelSize = useRef();
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
			pixelSize -= 1;
		}

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
				newGrid[i][a] = { color: { r: 255, g: 255, b: 255, a: 1 } };
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
					ctx.fillStyle = rgbaToHex(
						pixelColor.r,
						pixelColor.g,
						pixelColor.b,
						pixelColor.a
					);
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
			onMouseDown={e => {
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

				let currentColor = props.selectedColor.current;
				pixelGrid[arrY][arrX].color = {
					r: currentColor.r,
					g: currentColor.g,
					b: currentColor.b,
					a: currentColor.a,
				};

				const canvas = canvasRef.current;
				const ctx = canvas.getContext("2d");
				ctx.fillStyle = rgbaToHex(
					currentColor.r,
					currentColor.g,
					currentColor.b,
					currentColor.a
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
			}}
			className='canvas'
			ref={canvasRef}></canvas>
	);

	function handleMouseMove(e, pixelSize, ctx) {
		const target = e.target;

		// Get the bounding rectangle of target
		const rect = target.getBoundingClientRect();

		// Mouse position
		const x = e.clientX - rect.left - pixelSize;
		const y = e.clientY - rect.top - pixelSize;

		let arrX = (x + pixelSize) / pixelSize - (((x + pixelSize) / pixelSize) % 1);
		let arrY = (y + pixelSize) / pixelSize - (((y + pixelSize) / pixelSize) % 1);

		ctx.fillStyle = "white";
		fastFillRect(
			(arrX - 2) * pixelSize + 2,
			(arrY - 2) * pixelSize + 2,
			pixelSize * 5,
			pixelSize * 5
		);

		ctx.stokeStyle = "black";
		fastStrokeRect(2, 2, pixelSize * gridSize[0], pixelSize * gridSize[1]);

		for (let a = arrX - 2; a < arrX + 3; a++) {
			for (let i = arrY - 2; i < arrY + 3; i++) {
				if (pixelGrid[i] && pixelGrid[i][a]) {
					if (!(arrX === a && arrY === i)) {
						let pixelColor = pixelGrid[i][a].color;
						ctx.fillStyle = rgbaToHex(
							pixelColor.r,
							pixelColor.g,
							pixelColor.b,
							pixelColor.a
						);

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
			ctx.fillStyle = rgbaToHex(
				pixelColor.r,
				pixelColor.g,
				pixelColor.b,
				pixelColor.a
			);

			if (isMousePressed.current) {
				let currentColor = props.selectedColor.current;
				pixelGrid[arrY][arrX].color = {
					r: currentColor.r,
					g: currentColor.g,
					b: currentColor.b,
					a: currentColor.a,
				};
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

	function rgbaToHex(r, g, b, a) {
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
