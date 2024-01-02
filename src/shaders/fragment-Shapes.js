const fsShape = `
#ifdef GL_ES

precision mediump float;

#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}


void main() {

  vec2 pixelCoord = gl_FragCoord.xy/u_resolution.xy;

  vec3 color=vec3(0);

  vec2 bl = step(vec2(0.05,0.1),pixelCoord);       // bottom-left
  vec2 tr = step(vec2(0.88,0.6),1.0-pixelCoord);   // top-right
  color = vec3(bl.x * bl.y * tr.x * tr.y);

gl_FragColor = vec4(color, 1.0);

}

`;
export default fsShape;
