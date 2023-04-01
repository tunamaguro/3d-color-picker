export type Vec3 = [number, number, number];

export type Matrix3 = [Vec3, Vec3, Vec3];

export function turn3d(from: Vec3, matrix: Matrix3) {
	const u = matrix[0].reduce((pre, cur, idx) => {
		return pre + cur * from[idx];
	}, 0);
	const v = matrix[1].reduce((pre, cur, idx) => {
		return pre + cur * from[idx];
	}, 0);
	const w = matrix[2].reduce((pre, cur, idx) => {
		return pre + cur * from[idx];
	}, 0);
	return [u, v, w];
}
