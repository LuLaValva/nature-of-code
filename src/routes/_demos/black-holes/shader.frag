precision highp float;

#define BALLS 30

uniform float xs[BALLS];
uniform float ys[BALLS];
uniform float rs[BALLS];
uniform float width;
uniform float height;

varying highp vec2 vPos;

// Calculate wrapped distance in one dimension
float wrapDist(float a, float b, float size) {
  float diff = abs(a - b);
  return min(diff, size - diff);
}

void main() {
  float sum = 0.;

  // calculate the sum value for the current pixel (vPos.x, vPos.y)
  for (int i = 0; i < BALLS; i++) {
    if (rs[i] == 0.) break;
    float dx = wrapDist(xs[i], vPos.x, width);
    float dy = wrapDist(ys[i], vPos.y, height);
    float d = length(vec2(dx, dy));
    sum += rs[i] / pow(d, 1.25);
  }

  // Set the pixel color based on the sum of distances to the balls
  if (sum > 6.) {
    gl_FragColor = vec4(vec3(0.), 1.);
  } else {
    gl_FragColor = vec4(vec3(sum / 6.), 1.);
  }
}