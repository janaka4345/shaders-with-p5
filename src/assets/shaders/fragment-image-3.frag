#ifdef GL_ES

precision mediump float;

#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_image;

varying vec2 vTexCoord;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}



void main() {
  

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv=vTexCoord;
  uv.y=1.0-vTexCoord.y;
  

// float scale = 2.0;
//     float offset = 0.5;

//     float angle = noise( st + u_time * 0.1 )*3.14;
//     float radius = offset;

//     st *= scale;
//     st += radius * vec2(cos(angle),sin(angle));
  // uv+=mod(u_time,u_resolution.x)*vec2(0.1);
    vec4 color=texture2D(u_image,uv);
    // color=vec4(color.r,0.0,0.0,color.a);
    // color.r=abs(sin(u_time*0.5))*color.r;
    // color.g=abs(cos(u_time*0.5))*color.g;
    // color.b=0.0;
    gl_FragColor = color;

}

