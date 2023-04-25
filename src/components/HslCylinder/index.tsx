import { HslCoord } from "../../coord";
import { Sphere } from "../Sphere";
import range from "just-range";

const baseR = 10;
const hue = range(0, 360, 10);
const saturation = range(10, 101, 15);
const lightness = range(0, 101, 10);
/**
 * hue 円周上のどの角度に点を配置するか
 * saturation 同心円のRの大きさ
 * lightness z軸方向の数
 */
const concentricCircles = lightness.flatMap((l, light_idx) =>
	hue.flatMap((h) =>
		saturation.map((s) => new HslCoord((h + (light_idx % 2) * 10) % 360, s, l)),
	),
);

export function HslCylinder() {
	return (
		<>
			{concentricCircles.map((hsl) => {
				return (
					<Sphere
						position={hsl.to_xyz(baseR).to_vec()}
						color={hsl.to_rgb().to_hex()}
					/>
				);
			})}
		</>
	);
}
