const fs7 = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

//refer to functin formla.png
float plot(vec2 pixelCoord){
  float x=1.0-pow(abs(pixelCoord.x*2.0-1.0),0.5); // control variable
  
  float y=pixelCoord.y;

  // reduce two reigons to get the remainig reigon as a line
  return  
    smoothstep( x-0.02, x, y) -
    smoothstep( x, x+0.02, y);
}
void main() {

  vec2 pixelCoord = gl_FragCoord.xy/u_resolution.xy;
  // float x=1.0-pow(abs(pixelCoord.x*2.0-1.0),0.5);
  float x=pow(cos(3.14*(pixelCoord.x*2.0-1.0)/2.0),2.0);
  float y=pow(cos(3.14*(pixelCoord.y*2.0-1.0)/2.0),2.0);

// float pixelVal=plot(pixelCoord);//each pixel value 0 or 1 or  between 0-1
// vec3 color=pixelVal*vec3(0.0,0.0,1.0);
vec3 color=vec3(y,0.0,1.0-y);
gl_FragColor = vec4(color, 1.0);

}

`;
export default fs7;
