import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import vs from "../shaders/vertex";
// import fsimage3 from "../shaders/fragment-image-2"; //image processing with shaders working
// import fsimage3 from "../shaders/fragment-image-3"; //image processing with shaders working
// import fs8 from "../shaders/fragment-8"; //multiple verteces with shaders attached
// import fs from "../shaders/fragment";
import fsNoise from "../shaders/fragment-noise"; // shaders with noise test

let cw = 400;
let ch = 400;
let myShader;
let img;
let noiseImage;
let x = 0;

export default function CanvasNoise(props) {
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
    myShader = p5.createShader(vs, fsNoise);
    p5.shader(myShader);

    myShader.setUniform("u_resolution", [cw, ch]);
  };
}
function preload(p5) {
  img = p5.loadImage("./colorgrid.png");
  noiseImage = p5.loadImage("./patternNoise.jpg");
  // noiseImage = p5.loadImage("./perlinNoise.jpg");
  // myShader = p5.loadShader(
  //   "./src/assets/shaders/vertexShader.vert",
  //   "./src/assets/shaders/fragment-image-3.frag"
  // );
}
function draw(p5) {
  return () => {
    p5.background(255, 0, 0);
    myShader.setUniform("u_image", img);
    myShader.setUniform("u_noiseimage", noiseImage);
    // myShader.setUniform("u_noiseimage", noiseImage);
    myShader.setUniform("u_time", p5.millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
    // myShader.setUniform("u_mouse", [
    //   p5.mouseX,
    //   p5.map(p5.mouseY, 0, ch, ch, 0),
    // ]); // we flip Y so it's oriented properly in our shader

    p5.rect(0, 0, 100, 100);
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  // console.log(p5);
  // console.log(myShader);
}
