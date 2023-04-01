import { describe, it, expect } from "vitest";
import { XyzCoord, HslCoord } from "./index";

describe("coord", () => {
	describe("xyzからhslへの変換", () => {
		const deg2rad = Math.PI / 180;
		it("x0y0z0はh0s0l50になる", () => {
			const [h, s, l] = new XyzCoord(0, 0, 0).to_hsl().to_vec();
			expect(h).toBe(0);
			expect(s).toBe(0);
			expect(l).toBe(50);
		});
		it("x5y5z5はh45s70.7l75になる", () => {
			const [h, s, l] = new XyzCoord(5, 5, 5).to_hsl().to_vec();
			expect(h).toBeCloseTo(45.0, 3);
			expect(h).not.toBeCloseTo(45, 20);

			expect(s).toBeCloseTo(70.7, 1);
			expect(s).not.toBeCloseTo(70.7, 2);

			expect(l).toBe(75);
		});

		it("x-3y-3z-10はh225s42.4l0になる", () => {
			const [h, s, l] = new XyzCoord(-3, -3, -10).to_hsl().to_vec();
			expect(h).toBe(225);
			expect(s).toBeCloseTo(42.4, 1);
			expect(l).toBe(0);
		});
	});
});
