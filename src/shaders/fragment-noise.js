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
  
    vec4 color1=texture2D(u_noiseimage,uv);
    vec4 color2=texture2D(u_image,uv);
    
    gl_FragColor = color1*color2;

}

`;
export default fsNoise;
