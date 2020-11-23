import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Html, Loader } from "drei";
import { Block } from "./blocks";
import { Shapes, Categories, Box } from "./Home";
import state from "./store";
import "./App.css";

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree();
  return (
    <Html
      portal={portal}
      style={{
        position: "absolute",
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height,
      }}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  );
}

function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("white");
          gl.toneMappingExposure = 2.5;
          // gl.toneMappingWhitePoint = 1;
          // Export canvas events, we will put them onto the scroll area
          setEvents(events);
        }}
      >
        <Suspense fallback={null}>
          <Block factor={1.5} offset={0}>
            <Shapes />
            <HtmlContent portal={domContent}>
              <div className="menu left" style={{ top: "2.55rem" }}>
                <h2 style={{ fontSize: "2em", top: "4rem" }}>Victor Scholz</h2>
              </div>
              <div className="menu right">
                {/* Add modal for pdf view of resume */}
                <span>Resume</span>
                {/* Add hyperlink onClick for each of these */}
                <span>LinkedIn</span>
                <span href="https://github.com/victorscholz">Github</span>
                <span>Medium</span>
              </div>
              <div className="jumbo">
                <h1>
                  Full
                  <br />
                  Stack
                  <br />
                  Developer
                </h1>
                <Categories />
              </div>
            </HtmlContent>
          </Block>

          <Block factor={1.5} offset={1}>
            <Box />
            <Html center portal={domContent}>
              <h2>District Build NYC</h2>
            </Html>
          </Block>

          <Block factor={1.5} offset={2}>
            <Box />
            <Html center portal={domContent}>
              <h2>Churn</h2>
            </Html>
          </Block>

          <Block factor={-2} offset={4}>
            <Box scale={[2, 2, 2]} />
            <Html center portal={domContent}>
              <h2>Aeropress Dice</h2>
            </Html>
          </Block>
        </Suspense>
      </Canvas>
      <Loader />

      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}

export default App;
