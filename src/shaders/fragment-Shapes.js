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

  float x1=step(0.1,pixelCoord.x);
  float y1=step(0.2,pixelCoord.y);
  float x2=step(0.1,1.0-pixelCoord.x);
  float y2=step(0.1,1.0-pixelCoord.y);
//   vec2 c=vec2(x1*y1);


  vec3 color=vec3(x1*y1*x2*y2);

gl_FragColor = vec4(color, 1.0);

}

`;
export default fsShape;
