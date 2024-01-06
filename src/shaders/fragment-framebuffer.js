const fsframeBuffer = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
    vec4 color=vec4(st,0.0,1.0);
    
    gl_FragColor = color;

}

`;
export default fsframeBuffer;
