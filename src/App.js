import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { HTML } from "drei";
import { Block } from "./blocks";
import { Shapes, Categories, Box } from "./Home";
import Pdf from "./Resume.pdf";
import Logo from "./logo.png"
import state from "./store";
import "./App.css";

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree();
  return (
    <HTML
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
    </HTML>
  );
}

function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const handleClick = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/victor-scholz/");
  };
  const clickHandler = (e) => {
    e.preventDefault();
    window.open("https://github.com/victorscholz");
  };
  const mediumClick = (e) => {
    e.preventDefault();
    window.open("https://victorscholz.medium.com/");
  };
  const resumeClick = (e) => {
    e.preventDefault();
    window.open(Pdf);
  };
  const districtBuild = (e) => {
    e.preventDefault();
    window.open("https://streamable.com/ivizzx");
  };
  const aeropressDice = (e) => {
    e.preventDefault();
    window.open("https://streamable.com/8sg1on");
  };
  const ccTracker = (e) => {
    e.preventDefault();
    window.open("https://github.com/kevkevxd/cc-tracker-client");
  };
  const [hovered, setHover] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);
  return (
    <>
      <Canvas
        colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor("white");
          gl.toneMappingExposure = 2.5;
          gl.toneMappingWhitePoint = 1;
          // Export canvas events, we will put them onto the scroll area
          setEvents(events);
        }}
      >
        <Suspense fallback={null}>
          <Block factor={1.5} offset={0}>
            <Shapes />
            <HtmlContent portal={domContent}>
              <div className="menu left" style={{ top: "2.55rem" }}>
                <img src={Logo} alt="Portfolio Logo" width="80" height="80"></img>
                <h2 style={{ fontSize: "2em", top: "4rem" }}>Victor Scholz</h2>
              </div>
              <div className="menu right">
                <span
                  // href={Pdf}
                  target="_blank"
                  onPointerOver={(e) => {
                    setHover(true);
                  }}
                  onPointerOut={(e) => {
                    setHover(false);
                  }}
                  onClick={resumeClick}
                >
                  Resume
                </span>
                <span
                  onPointerOver={(e) => {
                    setHover(true);
                  }}
                  onPointerOut={(e) => {
                    setHover(false);
                  }}
                  onClick={handleClick}
                >
                  LinkedIn
                </span>
                <span
                  onPointerOver={(e) => {
                    setHover(true);
                  }}
                  onPointerOut={(e) => {
                    setHover(false);
                  }}
                  onClick={clickHandler}
                >
                  Github
                </span>
                <span
                  onPointerOver={(e) => {
                    setHover(true);
                  }}
                  onPointerOut={(e) => {
                    setHover(false);
                  }}
                  onClick={mediumClick}
                >
                  Medium
                </span>
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
            <HTML center portal={domContent}>
              <h2
                className="cube"
                onPointerOver={(e) => {
                  setHover(true);
                }}
                onPointerOut={(e) => {
                  setHover(false);
                }}
                onClick={districtBuild}
              >
                District Build NYC
              </h2>
              {/* <button className="cube" onClick={districtBuild}>
                View on Github
              </button> */}
            </HTML>
          </Block>

          <Block factor={1.5} offset={2}>
            <Box />
            <HTML center portal={domContent}>
              <h2
                className="cube"
                onPointerOver={(e) => {
                  setHover(true);
                }}
                onPointerOut={(e) => {
                  setHover(false);
                }}
                onClick={ccTracker}
              >
                Churn
              </h2>
            </HTML>
          </Block>

          <Block factor={-2} offset={4}>
            <Box scale={[2, 2, 2]} />
            <HTML center portal={domContent}>
              <h2
                className="cube"
                onPointerOver={(e) => {
                  setHover(true);
                }}
                onPointerOut={(e) => {
                  setHover(false);
                }}
                onClick={aeropressDice}
              >
                Aeropress Dice
              </h2>
            </HTML>
          </Block>
        </Suspense>
      </Canvas>

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
