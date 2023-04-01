type Coord = {
	to_vec(): unknown;
};

const deg2rad = Math.PI / 180;
const rad2deg = 180 / Math.PI;

export class XyzCoord implements Coord {
	#x: number;
	#y: number;
	#z: number;
	#baseR: number;
	constructor(x: number, y: number, z: number, baseR = 10) {
		this.#x = x;
		this.#y = y;
		this.#z = z;
		this.#baseR = baseR;
	}
	to_vec(): [number, number, number] {
		return [this.#x, this.#y, this.#z];
	}
	to_hsl(): HslCoord {
		// 円筒座標系へ移動
		const r = Math.sqrt(this.#x ** 2 + this.#y ** 2);
		const theta = Math.sign(this.#y) * Math.acos(this.#x / r);
		const z = this.#z;

		// z0に沿った系だと0求められないので回避
		const h1 = isNaN(theta) ? 0 : theta * rad2deg;
		// 負の値の時は正の値に直す
		const h2 = h1 < 0 ? 360 + h1 : h1;
		const s = (r / this.#baseR) * 100;
		const l = z * 5 + 50;
		return new HslCoord(h2, s, l);
	}
}

export class HslCoord implements Coord {
	#h: number;
	#s: number;
	#l: number;
	constructor(h: number, s: number, l: number) {
		this.#h = h;
		this.#s = s;
		this.#l = l;
	}
	to_vec(): [number, number, number] {
		return [this.#h, this.#s, this.#l];
	}
	to_xyz(): XyzCoord {
		return new XyzCoord(0, 0, 0);
	}
}
