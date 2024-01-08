const fsNoise = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;
uniform sampler2D u_noiseimage;

varying vec2 vTexCoord;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv=st;
  uv.y=1.0-st.y;
  
    vec4 noise=texture2D(u_noiseimage,uv);
    vec4 picture=texture2D(u_image,uv+noise.r*0.1);
    
    // gl_FragColor = noise*picture;
    gl_FragColor = picture;

}

`;
export default fsNoise;
