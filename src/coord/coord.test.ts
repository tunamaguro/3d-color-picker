import { describe, it, expect } from "vitest";
import { XyzCoord, HslCoord } from "./index";

describe("coord", () => {
	const deg2rad = Math.PI / 180;
	const rad2deg = 180 / Math.PI;
	describe("xyzからhslへの変換", () => {
		it("x0y0z0はh0s0l50になる", () => {
			const [h, s, l] = new XyzCoord(0, 0, 0).to_hsl().to_vec();
			expect(h).toBe(0);
			expect(s).toBe(0);
			expect(l).toBe(50);
		});
		it("x5y5z5はh45s70.7l75になる", () => {
			const [h, s, l] = new XyzCoord(5, 5, 5).to_hsl().to_vec();
			expect(h).toBeCloseTo(45.0, 3);

			expect(s).toBeCloseTo(70.7, 1);

			expect(l).toBe(75);
		});

		it("x-3y-3z-10はh225s42.4l0になる", () => {
			const [h, s, l] = new XyzCoord(-3, -3, -10).to_hsl().to_vec();
			expect(h).toBe(225);
			expect(s).toBeCloseTo(42.4, 1);
			expect(l).toBe(0);
		});
	});

	describe("hslからxyzへの変換", () => {
		it("h0s0l50はx0y0z0になる", () => {
			const [x, y, z] = new HslCoord(0, 0, 50).to_xyz().to_vec();
			expect(x).toBe(0);
			expect(y).toBe(0);
			expect(z).toBe(0);
		});

		it("h90s100l50はx0y10z0になる", () => {
			const [x, y, z] = new HslCoord(90, 100, 50).to_xyz().to_vec();
			expect(x).toBeCloseTo(0, 10);
			expect(y).toBe(10);
			expect(z).toBe(0);
		});

		it("h315s70l0はx4.9y-4.9z-10になる", () => {
			const [x, y, z] = new HslCoord(315, 70, 0).to_xyz().to_vec();
			expect(x).toBeCloseTo(4.9, 1);
			expect(y).toBeCloseTo(-4.9, 1);
			expect(z).toBe(-10);
		});

		it("h215s45l70はx-3.7y-2.6z4になる", () => {
			const [x, y, z] = new HslCoord(215, 45, 70).to_xyz().to_vec();
			expect(x).toBeCloseTo(-3.7, 1);
			expect(y).toBeCloseTo(-2.6, 1);
			expect(z).toBeCloseTo(4, 1);
		});
	});
});
