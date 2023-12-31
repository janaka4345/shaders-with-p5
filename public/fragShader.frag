// #ifdef GL_ES
// precision mediump float;
// #endif

varying vec2 vTextCoord;

uniform sampler2D texture;
uniform float noise;
void main() {
	gl_FragColor = vec4(0.0,0.0,1.0,1.0);
}