import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let cw = 400;
let ch = 400;
let screen;
let shader1;
let shader2;
let vs = `
#ifdef GL_ES

precision mediump float;

#endif



attribute vec3 aPosition;



void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);

  // scale the rect by two, and move it to the center of the screen
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;

}
 `;
let fs = `
#ifdef GL_ES

precision mediump float;

#endif



void main() {

    // Make a blue color. In shaders, the RGB color goes from 0 - 1 instead of 0 - 255
    vec3 color = vec3(0.0, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);

}
`;

export default function Canvas(props) {
  const [t, setT] = useState(0);

  return (
    <div>
      <div>
        <ReactP5Wrapper sketch={sketch} />
      </div>
      <button onClick={() => setT((prev) => (prev += 1))}>click</button>
      <h1>{t}</h1>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.pixelDensity(1);
    p5.createCanvas(cw, ch, p5.WEBGL);
    screen = p5.createGraphics(cw, ch);
    // p5.background(255, 0, 0);
    shader2 = p5.createShader(vs, fs);
    // p5.shader(shader1);
    p5.shader(shader2);
    // shader2.setUniform("texture", screen);
    // shader2.setUniform("noise", 0.0);
  };
}
function preload(p5) {
  // shader1 = p5.loadShader("./vertexShader.vert", "./fragShader.frag");
}
function draw(p5) {
  return () => {
    // if (p5.mouseIsPressed) {
    //   screen.stroke(0, 255, 0);
    //   screen.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    // }

    // p5.noStroke();
    p5.rect(10, 10, 50, 50);
    // p5.image(screen, 0, 0);
    // screen.fill(120);
    // shader1.setUniform("texture", screen);
    // shader1.setUniform("noise", 0);
    // shader1.setUniform("u_time", p5.frameCount);
    // p5.square(50, 50, 50);

    // p5.noLoop();
  };
}
function mousePressed(p5) {
  // console.log(p5.frameRate());
  // console.log(shader1);
  console.log(shader2);
}
