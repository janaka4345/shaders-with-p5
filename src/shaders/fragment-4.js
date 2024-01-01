const fs4 = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float plot1(vec2 pixelCoord){ //my solution function check it later
  // float x=step(0.5,pixelCoord.x); // control variable
  float x=smoothstep(0.4,0.6,pixelCoord.x);
   
  return smoothstep(0.02,0.0,abs(pixelCoord.y-x));
}


float plot2(vec2 pixelCoord){
  // float x=step(0.5,pixelCoord.x); // control variable
  // float x=smoothstep(0.4,0.6,pixelCoord.x);
  float x=sin((pixelCoord.x+u_time)*3.14*2.0)*0.5+0.5;
  float y=pixelCoord.y;


  // reduce two reigons to get the remainig reigon as a line
  return  
    smoothstep( x-0.02, x, y) -
    smoothstep( x, x+0.02, y);
}

void main() {
  vec2 pixelCoord = gl_FragCoord.xy/u_resolution.xy;

  // float x=step(0.5,pixelCoord.x); // control variable
  // float x=smoothstep(0.4,0.6,pixelCoord.x);
  
  float pixelVal=plot2(pixelCoord); //each pixel value 0 or 1 or  between 0-1

  
    vec3 color=pixelVal*vec3(0.0,0.0,1.0);

    gl_FragColor = vec4(color, 1.0);

}

`;
export default fs4;
