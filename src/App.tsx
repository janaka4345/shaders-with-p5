import "./App.css";
/*
 *CONSIDER THE PIXEL DENSITY OF THE DEVICE  . NEED TO FIX FOR DIFFERENT DEVICES
 */
import Canvas from "./components/Canvas"; //shaders with p5  first try-working basic shader
import Canvas1 from "./components/Canvas1"; //shaders seperate graphics  with working basic shader
import Canvas2 from "./components/Canvas2"; //shaders seperate graphics  with working basic shader
import Canvas3 from "./components/Canvas3"; //book of shaders - functions 01
import Canvas4 from "./components/Canvas4"; //book of shaders - image pixel processing with shaders working
import Canvas5Pixel from "./components/Canvas5Pixel"; //pixel shader blue print
import Canvas6Pixel from "./components/Canvas6Pixel"; //pixel shader play01
import Canvas7 from "./components/Canvas7"; //pixel shader play01
function App() {
  return (
    <>
      {/* <Canvas />   */}
      {/* <Canvas1/> */}
      {/* <Canvas2/> */}
      {/* <Canvas3/> */}
      {/* <Canvas4/> */}
      {/* <Canvas5Pixel/> */}
      {/* <Canvas6Pixel /> */}
      <Canvas7 />
    </>
  );
}

export default App;
