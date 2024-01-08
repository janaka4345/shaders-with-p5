const fsNoise2
  = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_noiseimage;

varying vec2 vTexCoord;


float circle(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv=st;
  uv.y=1.0-st.y;
  
    vec4 noise=texture2D(u_noiseimage,uv);
    float circleshape=circle(uv-vec2(noise.r*u_time*0.1,noise.g*u_time*0.1),0.1);
   
    gl_FragColor = vec4(circleshape,0.0,0.0,1.0);

}

`;
export default fsNoise2
  ;
