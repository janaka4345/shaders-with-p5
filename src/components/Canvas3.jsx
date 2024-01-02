import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import vs from "../shaders/vertex";
import fs from "../shaders/fragment"; //basic 01 y=x
import fs2 from "../shaders/fragment-2"; //y=x^n
import fs3 from "../shaders/fragment-3"; //any function ddraw
import fs4 from "../shaders/fragment-4"; //functions 02 -sine+cosine graph moving
import fs5 from "../shaders/fragment-5"; //functions 02 -
import fs6 from "../shaders/lygiya"; //lygiya library test -
import fs7 from "../shaders/fragment-7"; //colors+  - color gradients with functions
let cw = 400;
let ch = 400;
let screen;
let myShader;

export default function Canvas3(props) {
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
    p5.createCanvas(cw, ch);

    screen = p5.createGraphics(cw, ch, p5.WEBGL);
    // myShader = p5.createShader(vs, fs);
    // myShader = p5.createShader(vs, fs2);
    // myShader = p5.createShader(vs, fs3);
    // myShader = p5.createShader(vs, fs4);
    // myShader = p5.createShader(vs, fs5);
    // myShader = p5.createShader(vs, fs6);
    myShader = p5.createShader(vs, fs7);
    screen.shader(myShader);

    p5.background(120);

    myShader.setUniform("u_resolution", [cw, ch]);
    // shader.setUniform("texture", screen);
    // shader.setUniform("noise", 0.0);
  };
}
function preload(p5) {
  // shader1 = p5.loadShader("./vertexShader.vert", "./fragShader.frag");
  // myShader = p5.loadShader(
  //   "./shaders/vertexShader.vert",
  //   "./shaders/fragmentShader.frag"
  // );
}
function draw(p5) {
  return () => {
    myShader.setUniform("u_time", p5.millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    myShader.setUniform("u_mouse", [
      p5.mouseX,
      p5.map(p5.mouseY, 0, ch, ch, 0),
    ]); // we flip Y so it's oriented properly in our shader

    screen.rectMode(p5.CENTER);
    screen.rect(0, 0, 50, 50);
    // screen.circle(60, 60, 50);

    p5.imageMode(p5.CENTER);
    p5.image(screen, cw / 2, cw / 2, 200, 200, 0, 0, cw, ch);
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  // console.log(myShader);
}
