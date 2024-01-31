import { useRef, useLayoutEffect, useState } from "react";
import "./styles.module.css";

export default function TopBanner(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  const maxRadius = 80;
  const image = props.skill;
  const radiusToSet = height > maxRadius ? maxRadius : height * 0.5;
  const stylesObj = {
    color: "#1a8870",
    backgroundColor: "#201b23",
    padding: 12,
    height: "auto",
    borderRadius: 8,
    borderTopRightRadius: radiusToSet,
    borderBottomRightRadius: radiusToSet,
    marginBottom: 24,
  };

  // You can fully customize this implementation
  // including changing the JSX, CSS and React hooks
  return (
    <>
      <div ref={ref} className="shadow--tl container" style={stylesObj}>
        <div className="everything">
          <div className="logo">
            {" "}
            {image !== undefined &&
            <img
              src={require(`@site/static/img/${image}.png`).default}
              className="logo"
            />}
          </div>
          <div className="banner">
            <h1
              style={{
                fontSize: 84,
                fontFamily: "Regular",
                fontWeight: 100,
                fontVariant: "small-caps",
                letterSpacing: 4,
                marginBottom: "unset",
              }}
            >
              {props.title}
              <span style={{ fontSize: 24, verticalAlign: "top" }}>™</span>
            </h1>
          </div>
          <div
          className="revision"
            style={{
              fontSize: 24,
              fontFamily: "Regular",
              fontWeight: 100,
              letterSpacing: 4,
            }}
          >
            {props.version}
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
}
