const fs = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float plot(vec2 st){
  return smoothstep(0.02,0.0,abs(st.x-st.y));
  // return smoothstep(0.0,0.02,abs(st.x-st.y));
  // return smoothstep(0.5,0.0,abs(st.x-st.y));
}


void main() {


  vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float pct=plot(st);
    vec3 color=vec3(st.x);

     color=pct*vec3(0.0,0.0,1.0);
    // color=(1.0-pct)*color;
    // color=(1.0-pct)*color+pct*vec3(0.0,0.0,1.0);
    // color=(1.0-pct)*color+pct*vec3(1.0,0.0,1.0);
    // color=(1.0-pct)*color+pct*vec3(0.0,0.0,1.0);

    gl_FragColor = vec4(color, 1.0);

}

`;
export default fs;
