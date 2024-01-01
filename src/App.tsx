import "./App.css";
/*
*CONSIDER THE PIXEL DENSITY OF THE DEVICE  . NEED TO FIX FOR DIFFERENT DEVICES
*/
import Canvas from "./components/Canvas";//shaders with p5  first try-working basic shader
import Canvas1 from "./components/Canvas1";//shaders seperate graphics  with working basic shader
import Canvas2 from "./components/Canvas2";//shaders seperate graphics  with working basic shader
function App(){
  return (
    <>
       {/* <Canvas />   */}
       {/* <Canvas1/> */}
       <Canvas2/>
      
    </>
  );
}

export default App;
