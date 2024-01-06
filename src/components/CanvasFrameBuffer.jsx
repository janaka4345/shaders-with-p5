import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import vs from "../shaders/vertex";
import fsframeBuffer from "../shaders/fragment-framebuffer"; //framebuffer test 01
let cw = 400;
let ch = 400;
let myShader;
let img;
let prev, next, cam;

export default function CanvasFrameBuffer(props) {
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

    prev = p5.createFramebuffer({ format: p5.FLOAT });
    next = p5.createFramebuffer({ format: p5.FLOAT });
    cam = p5.createCamera();

    // myShader = p5.createShader(vs, fsframeBuffer);
    // p5.shader(myShader);

    // myShader.setUniform("u_resolution", [cw, ch]);
  };
}
function preload(p5) {
  // img = p5.loadImage("./colorgrid.png");
  // myShader = p5.loadShader(
  //   "./src/assets/shaders/vertexShader.vert",
  //   "./src/assets/shaders/fragment-image-3.frag"
  // );
}
function draw(p5) {
  return () => {
    // Swap prev and next so that we can use the previous
    // frame as a texture when drawing the current frame
    [prev, next] = [next, prev];
    // Draw to the framebuffer
    next.begin();
    p5.background(255);

    p5.push();
    // Draw the previous texture farther away, but scaled
    // up to fill the screen, plus a bit extra scale so it grows
    p5.translate(0, 0, -200);
    // p5.scale((1.001 * (200 + cam.eyeZ)) / cam.eyeZ);
    // p5.tint(255, 253);
    // p5.image(prev, -cw / 2, -ch / 2);
    p5.pop();
    for (let index = 0; index < 100; index++) {
      p5.push();
      // p5.fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
      p5.translate(
        25 * Math.sin(p5.frameCount * 0.014),
        25 * Math.sin(p5.frameCount * 0.02)
      );
      p5.rotate(p5.frameCount * 0.01);
      // p5.rotateY(p5.frameCount * 0.01);
      p5.fill(255, 0, 0);
      p5.rect(Math.random() * cw, Math.random() * ch, 50, 50);

      p5.pop();
    }

    next.end();

    p5.image(next, -cw / 2, -ch / 2);

    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  // console.log(next);
  // console.log(myShader);
}
