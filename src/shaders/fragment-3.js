const fs3 = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


// float plot(vec2 st, float pct){
//   return  smoothstep( pct-0.02, pct, st.y) -
//           smoothstep( pct, pct+0.02, st.y);
// }


float plot(vec2 st,float c){
   
  return smoothstep(0.02,0.0,abs(st.y-c));
}


void main() {


  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  //y+x^2-x-0.2=0
  // float c=-(pow(st.x,2.0))+st.x+0.2;
  // float c=step(0.5,st.x);
  float c=smoothstep(0.2,0.8,st.x);
  vec3 color=vec3(c);
  float pct=plot(st,c);

   
    color=(1.0-pct)*color+pct*vec3(0.0,0.0,1.0);

    gl_FragColor = vec4(color, 1.0);

}

`;
export default fs3;
