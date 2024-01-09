const fsNoise2 = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_noiseimage;

varying vec2 vTexCoord;


float circle(vec2 position,vec2 center, float radius){
    return step(radius, length(position - center));
}

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv=st;
  uv.y=1.0-st.y;
  
    vec4 noise=texture2D(u_noiseimage,uv);
    // float circleshape=circle(uv-vec2(noise.r*u_time*0.1,noise.g*u_time*0.1),0.5);
    vec2 offset=vec2(0.3,abs(sin(u_time*0.2)));


    offset+=vec2(noise.r*0.5,noise.g*0.5);
    
  
    float circleshape=circle(uv,offset,0.01);
   
    gl_FragColor = vec4(circleshape,0.0,0.0,1.0)+noise;

}
`;
export default fsNoise2;
