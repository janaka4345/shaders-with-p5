const fs8 = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;

varying vec2 vTexCoord;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv=st;
  uv.y=1.0-st.y;
  
    vec4 color=texture2D(u_image,uv);
    
    gl_FragColor = color;

}

`;
export default fs8;
