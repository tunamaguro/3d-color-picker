export class XyzCoord {
	constructor(private x: number, private y: number, private z: number) {}
	to_hls(): HlsCoord {
		return new HlsCoord(0, 0, 0);
	}
}

export class HlsCoord {
	constructor(private h: number, l: number, s: number) {}
	to_xyz():XyzCoord {
        return new XyzCoord(0,0,0)
    }
}
