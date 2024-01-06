import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import vs from "../shaders/vertex";
// import fsimage3 from "../shaders/fragment-image-2"; //image processing with shaders working
// import fsimage3 from "../shaders/fragment-image-3"; //image processing with shaders working
import fs8 from "../shaders/fragment-8"; //multiple verteces with shaders attached
import fs from "../shaders/fragment";
let cw = 400;
let ch = 400;
let myShader;
let myShader2;
let img;
let screen1;
let screen2;
let x = 0;

export default function Canvas7(props) {
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
    screen1 = p5.createGraphics(cw, ch, p5.WEBGL);
    screen2 = p5.createGraphics(cw, ch, p5.WEBGL);
    myShader = p5.createShader(vs, fs8);
    myShader2 = p5.createShader(vs, fs);
    screen1.shader(myShader);
    screen2.shader(myShader2);

    myShader.setUniform("u_resolution", [cw, ch]);
    myShader2.setUniform("u_resolution", [cw, ch]);
  };
}
function preload(p5) {
  img = p5.loadImage("./colorgrid.png");
  // myShader = p5.loadShader(
  //   "./src/assets/shaders/vertexShader.vert",
  //   "./src/assets/shaders/fragment-image-3.frag"
  // );
}
function draw(p5) {
  return () => {
    p5.background(255, 0, 0);
    myShader.setUniform("u_time", p5.millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    myShader.setUniform("u_mouse", [
      p5.mouseX,
      p5.map(p5.mouseY, 0, ch, ch, 0),
    ]); // we flip Y so it's oriented properly in our shader

    p5.rect(0, 0, 100, 100);
    // screen1.fill(0,0,255);
    // screen1.noStroke();

    screen1.beginShape();
    screen1.vertex(0.5, 0);
    screen1.vertex(1, 0.5);
    screen1.vertex(0.5, 1);
    screen1.vertex(0, 0.5);
    screen1.endShape();

    screen2.beginShape();
    screen2.vertex(0.5, 0);
    screen2.vertex(1, 0.5);
    screen2.vertex(0.5, 1);
    screen2.vertex(0, 0.5);
    screen2.endShape();
    p5.push();
    // p5.rotate();
    p5.image(screen1, 100 + x, 100, 100, 100, 0, 0, cw, ch);
    p5.image(screen2, 200 + x, 200, 100, 100, 0, 0, cw, ch);
    p5.pop();
    // p5.image(screen1,50,50,)
    myShader.setUniform("u_image", img);
    x > cw ? (x = 0) : x++;
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  // console.log(p5);
  // console.log(myShader);
}
