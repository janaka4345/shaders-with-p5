attribute vec3 aPosition;
attribute vec2 aTextCoord;

varying vec2 vTextCoord;


  void main() {
    vTextCoord = aTextCoord;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
 }