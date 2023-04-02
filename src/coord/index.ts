import { turn3d, Matrix3, Vec3 } from "./matrix";

type Coord = {
	to_vec(): unknown;
};

const deg2rad = Math.PI / 180;
const rad2deg = 180 / Math.PI;

export class XyzCoord implements Coord {
	#x: number;
	#y: number;
	#z: number;
	constructor(x: number, y: number, z: number) {
		this.#x = x;
		this.#y = y;
		this.#z = z;
	}
	to_vec(): [number, number, number] {
		return [this.#x, this.#y, this.#z];
	}
	to_hsl(baseR = 10): HslCoord {
		// 円筒座標系へ移動
		const r = Math.sqrt(this.#x ** 2 + this.#y ** 2);
		const theta = Math.sign(this.#y) * Math.acos(this.#x / r);
		const z = this.#z;

		// z0に沿った系だと0求められないので回避
		const h1 = isNaN(theta) ? 0 : theta * rad2deg;
		// 負の値の時は正の値に直す
		const h2 = h1 < 0 ? 360 + h1 : h1;
		const s = (r / baseR) * 100;
		const l = z * 5 + 50;
		return new HslCoord(h2, s, l);
	}
	turn_Xaxis(theta: number): XyzCoord {
		const rad = deg2rad * theta;
		const matrix: Matrix3 = [
			[1, 0, 0],
			[0, Math.cos(rad), Math.sin(rad)],
			[0, -Math.sin(rad), Math.cos(rad)],
		];
		const [u, v, w] = turn3d(this.to_vec(), matrix);
		return new XyzCoord(u, v, w);
	}

	turn_Yaxis(theta: number): XyzCoord {
		const rad = deg2rad * theta;
		const matrix: Matrix3 = [
			[Math.cos(rad), 0, -Math.sin(rad)],
			[0, 1, 0],
			[Math.sin(rad), 0, Math.cos(rad)],
		];
		const [u, v, w] = turn3d(this.to_vec(), matrix);
		return new XyzCoord(u, v, w);
	}

	turn_Zaxis(theta: number): XyzCoord {
		const rad = deg2rad * theta;
		const matrix: Matrix3 = [
			[Math.cos(rad), Math.sin(rad), 0],
			[-Math.sin(rad), Math.cos(rad), 0],
			[0, 0, 1],
		];
		const [u, v, w] = turn3d(this.to_vec(), matrix);
		return new XyzCoord(u, v, w);
	}
}

export class HslCoord implements Coord {
	#h: number;
	#s: number;
	#l: number;
	constructor(h: number, s: number, l: number) {
		// 負の数や360を超える数を与えられたときに0<=h<=360へ補正
		const fixed_h = (360 + h) % 360;
		this.#h = fixed_h;
		this.#s = s % 101;
		this.#l = l % 101;
	}
	to_vec(): [number, number, number] {
		return [this.#h, this.#s, this.#l];
	}
	to_xyz(baseR = 10): XyzCoord {
		const coefficient = (this.#s / 100) * baseR;
		const x = Math.cos(deg2rad * this.#h) * coefficient;
		const y = Math.sin(deg2rad * this.#h) * coefficient;
		const z = ((this.#l * 2) / 100 - 1) * baseR;
		return new XyzCoord(x, y, z);
	}
}
