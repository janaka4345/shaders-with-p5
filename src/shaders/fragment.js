const fs = `
#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// grab our textures coordinates from vert shader
varying vec2 vTexCoord;



void main() {

  //set our uv coordinates to our texture coordinates
  vec2 uv = vTexCoord;

  // vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 mouse=u_mouse.xy/u_resolution.xy;

    // Make a blue color. In shaders, the RGB color goes from 0 - 1 instead of 0 - 255
    vec3 color = vec3(mouse.x, mouse.y, 0.0);
    // vec3 color=vec3(st.x,st.y,0.0);

    gl_FragColor = vec4(color, 1.0);

}

`;
export default fs;
