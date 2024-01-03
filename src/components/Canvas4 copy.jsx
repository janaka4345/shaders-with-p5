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
    p5.createCanvas(cw, ch, p5.WEBGL);

    // screen = p5.createGraphics(cw, ch);
    // screen.background(255, 120, 50);
    // screen.image(img, 0, 0);
    myShader = p5.createShader(vs, fsimage);
    p5.shader(myShader);
    p5.textureMode(p5.NORMAL);

    p5.background(255, 0, 0);

    myShader.setUniform("u_resolution", [cw, ch]);
  };
}
function preload(p5) {
  img = p5.loadImage("./colorgrid.png");
}
function draw(p5) {
  return () => {
    // console.log(p5.mouseX, p5.mouseY);
    myShader.setUniform("u_time", p5.millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    myShader.setUniform("u_mouse", [
      p5.mouseX,
      p5.map(p5.mouseY, 0, ch, ch, 0),
    ]); // we flip Y so it's oriented properly in our shader

    // screen.rect(-100, -100, 200, 200);
    myShader.setUniform("u_image", img);
    // screen.circle(50, 50, 50);
    p5.push();
    // p5.texture(img);
    p5.beginShape();
    p5.vertex(-cw / 2, -ch / 2, 0, 0);
    p5.vertex(cw / 2, -ch / 2, 1, 0);
    p5.vertex(cw / 2, ch / 2, 1, 1);
    p5.vertex(-cw / 2, ch / 2, 0, 1);
    p5.endShape(p5.CLOSE);
    p5.pop();
    // p5.imageMode(p5.CENTER);
    // p5.image(screen, cw / 2, cw / 2);
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5);
  console.log(myShader);
}
