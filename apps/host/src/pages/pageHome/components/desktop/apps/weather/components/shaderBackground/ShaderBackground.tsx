import { useEffect, useRef } from "react";

import * as S from "./ShaderBackground.styles";
import FRAGMENT_SHADER from "./shaders/background.frag?raw";
import VERTEX_SHADER from "./shaders/background.vert?raw";

type RGB = [number, number, number];

type Props = {
	className?: string;
	colors?: [RGB, RGB, RGB, RGB];
	speed?: number;
	resolutionScale?: number;
	fps?: number;
};

const DEFAULT_COLORS: [RGB, RGB, RGB, RGB] = [
	[0.04, 0.02, 0.1],
	[0.05, 0.08, 0.18],
	[0.02, 0.16, 0.2],
	[1.0, 1.0, 1.0],
];

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);

	if (!shader) {
		return null;
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
};

export const ShaderBackground = ({ className, colors = DEFAULT_COLORS, speed = 0.025, resolutionScale = 0.5, fps = 30 }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const colorsRef = useRef(colors);

	useEffect(() => {
		colorsRef.current = colors;
	}, [colors]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const parent = canvas?.parentElement;
		const gl = canvas?.getContext("webgl");

		if (!canvas || !parent || !gl) {
			return;
		}

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
		const program = gl.createProgram();

		if (!vertexShader || !fragmentShader || !program) {
			return;
		}

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

		const positionLocation = gl.getAttribLocation(program, "a_position");
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		const timeLocation = gl.getUniformLocation(program, "u_time");
		const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
		const colorLocations = ["u_base0", "u_base1", "u_accent", "u_blob"].map((name) => gl.getUniformLocation(program, name));

		const render = (time: number) => {
			gl.uniform1f(timeLocation, time * 0.001 * speed);
			gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
			colorsRef.current.forEach((color, i) => gl.uniform3fv(colorLocations[i], color));
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		};

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const frameInterval = 1000 / fps;
		let frameId = 0;
		let lastFrame = 0;

		const loop = (time: number) => {
			frameId = requestAnimationFrame(loop);

			if (time - lastFrame >= frameInterval) {
				lastFrame = time;
				render(time);
			}
		};

		const stop = () => {
			cancelAnimationFrame(frameId);
			frameId = 0;
		};

		const start = () => {
			if (reducedMotion.matches) {
				stop();
				render(0);
			} else if (!frameId) {
				frameId = requestAnimationFrame(loop);
			}
		};

		const handleVisibilityChange = () => (document.hidden ? stop() : start());

		const handleResize = () => {
			canvas.width = Math.max(1, Math.round(parent.clientWidth * resolutionScale));
			canvas.height = Math.max(1, Math.round(parent.clientHeight * resolutionScale));
			gl.viewport(0, 0, canvas.width, canvas.height);
			render(lastFrame);
		};

		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(parent);
		handleResize();
		start();

		reducedMotion.addEventListener("change", start);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			stop();
			resizeObserver.disconnect();
			reducedMotion.removeEventListener("change", start);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			gl.deleteBuffer(buffer);
			gl.deleteProgram(program);
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);
		};
	}, [speed, resolutionScale, fps]);

	return <S.ShaderBackground ref={canvasRef} className={className} />;
};
