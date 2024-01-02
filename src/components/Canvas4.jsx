import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import vs from "../shaders/vertex";
import fsimage from "../shaders/fragment-image"; //image processing
let cw = 400;
let ch = 400;
let screen;
let myShader;
let img;

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
    // screen.background(255, 0, 0);
    screen.image(img, -cw / 2, -ch / 2, cw, ch, 0, 0, cw, ch);
    myShader = p5.createShader(vs, fsimage);
    screen.shader(myShader);

    p5.background(0, 0, 0);

    myShader.setUniform("u_resolution", [cw, ch]);
  };
}
function preload(p5) {
  img = p5.loadImage("./colorgrid.png");
}
function draw(p5) {
  return () => {
    myShader.setUniform("image", screen);
    // console.log(p5.mouseX, p5.mouseY);
    myShader.setUniform("u_time", p5.millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    myShader.setUniform("u_mouse", [
      p5.mouseX,
      p5.map(p5.mouseY, 0, ch, ch, 0),
    ]); // we flip Y so it's oriented properly in our shader

    screen.rect(0, 0, 10, 10);

    p5.imageMode(p5.CENTER);
    p5.image(screen, cw / 2, cw / 2);
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  console.log(myShader);
}
