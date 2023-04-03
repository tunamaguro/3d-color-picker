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

	/**
	 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
	 */
	to_rgb(): RgbCoord {
		const s = this.#s / 100;
		const l = this.#l / 100;

		const c = (1 - Math.abs(2 * l - 1)) * s;

		const hDash = this.#h / 60;
		const x = c * (1 - Math.abs((hDash % 2) - 1));
		const m = l - c / 2;

		let r1 = 0;
		let g1 = 0;
		let b1 = 0;

		if (0 <= hDash && hDash < 1) {
			r1 = c;
			g1 = x;
			b1 = 0;
		} else if (1 <= hDash && hDash < 2) {
			r1 = x;
			g1 = c;
			b1 = 0;
		} else if (2 <= hDash && hDash < 3) {
			r1 = 0;
			g1 = c;
			b1 = x;
		} else if (3 <= hDash && hDash < 4) {
			r1 = 0;
			g1 = x;
			b1 = c;
		} else if (4 <= hDash && hDash < 5) {
			r1 = x;
			g1 = 0;
			b1 = c;
		} else if (5 <= hDash && hDash < 6) {
			r1 = c;
			g1 = 0;
			b1 = x;
		}
		const [r, g, b] = [r1, g1, b1].map((v) => Math.round((v + m) * 255));
		return new RgbCoord(r, g, b);
	}
}

export class RgbCoord implements Coord {
	#r: number;
	#g: number;
	#b: number;
	static mult = 0x100;
	constructor(r: number, g: number, b: number) {
		this.#r = r;
		this.#g = g;
		this.#b = b;
	}

	to_vec(): Vec3 {
		return [this.#r, this.#g, this.#b];
	}

	to_hex(): number {
		const r = this.#r * RgbCoord.mult ** 2;
		const g = this.#g * RgbCoord.mult;
		const b = this.#b;
		const rgb = r + g + b;
		return rgb;
	}

	to_str(): string {
		const hex = this.to_hex().toString(16);

		return `#${hex}`;
	}
	/**
	 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
	 */
	to_hsl(): HslCoord {
		const [r, g, b] = [this.#r, this.#g, this.#b].map((v) => v / 255);
		const x_max = Math.max(r, g, b);
		const x_min = Math.min(r, g, b);
		const c = x_max - x_min;

		console.log(x_max, x_min, c);

		const l = (x_max + x_min) / 2;

		let h: number = 60;
		if (c === 0) {
			h *= 0;
		} else if (x_max === r) {
			console.log((g - b) / c);
			h *= ((g - b) / c) % 6;
		} else if (x_max === g) {
			h *= (b - r) / c + 2;
		} else if (x_max === b) {
			h *= (r - g) / c + 4;
		}

		const s = l === 0 || l === 1 ? 0 : (x_max - l) / Math.min(l, 1 - l);

		return new HslCoord(h, s * 100, l * 100);
	}
}
