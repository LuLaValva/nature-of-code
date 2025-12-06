/**
 * For hexagonal grids; [axial coordinates](https://www.redblobgames.com/grids/hexagons/#coordinates-axial)
 * represent cube coordinates (`q + r + s = 0`) where `s` is implicit
 */
export type AxialCoord = [q: number, r: number];

export const AXIAL_STEPS: AxialCoord[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, -1],
  [-1, 1],
];

/**
 * Standard cartesian coordinate, typically aligned with pixels
 */
export type CartCoord = [x: number, y: number];

/**
 * Get the closest integer coordinate to a given axial coordinates, using [cube_round](https://www.redblobgames.com/grids/hexagons/#rounding)
 */
export function round([q, r]: AxialCoord): AxialCoord {
  const s = -q - r;

  let rq = Math.round(q);
  let rr = Math.round(r);
  let rs = Math.round(s);

  const dq = Math.abs(rq - q);
  const dr = Math.abs(rr - r);
  const ds = Math.abs(rs - s);

  if (dq > dr && dq > ds) {
    rq = -rr - rs;
  } else if (dr > ds) {
    rr = -rq - rs;
  }

  return [rq, rr];
}

/**
 * Equation from [red blob games](https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial)
 */
export function axialToCartesian([q, r]: AxialCoord, scale = 1): CartCoord {
  return [Math.sqrt(3) * (q + r / 2) * scale, 1.5 * r * scale];
}

/**
 * Equation from [red blob games](https://www.redblobgames.com/grids/hexagons/#pixel-to-hex-axial)
 */
export function cartesianToAxial([x, y]: CartCoord, scale = 1): AxialCoord {
  return [(Math.sqrt(3) * x - y) / (3 * scale), (2 * y) / (3 * scale)];
}
