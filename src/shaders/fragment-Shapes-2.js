const fsShape2 = `
#ifdef GL_ES

precision mediump float;

#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float fill(float x, float size) {
    return 1.0 - aastep(size, x);
}

float rect(vec2 st, vec2 size) {
    return fill(rectSDF(st, size), 1.0);
}


void main() {

 vec2 pixelCoord = gl_FragCoord.xy/u_resolution.xy;

  vec3 color=vec3(0);
  float t=rect(pixelCoord,vec2(10.0))

gl_FragColor = vec4(color, 1.0);

}

`;
export default fsShape2;
