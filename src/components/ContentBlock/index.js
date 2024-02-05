import { useRef, useLayoutEffect, useState } from "react";
import "./styles.module.css";

export default function ContentBlock(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  const maxRadius = 80;
  const radiusToSet = height > maxRadius ? maxRadius : height * 0.5;
  const stylesObj = {
    color: "var(--ifm-color-primary-darker)",
    backgroundColor: "#201b23",
    padding: 12,
    height: "auto",
    borderRadius: "var(--ifm-global-radius)",
    borderTopRightRadius: radiusToSet,
    borderBottomRightRadius: radiusToSet,
    marginBottom: 24,
  };

  // You can fully customize this implementation
  // including changing the JSX, CSS and React hooks
  return (
    <>
      <div ref={ref} className="shadow--tl" style={stylesObj}>
        <h1
          style={{
            // fontSize: 64,
            fontFamily: "Monoton",
            fontWeight: 100,
            fontVariant: "small-caps",
            letterSpacing: 4,
            marginBottom: "unset",
            marginLeft: "unset",
          }}
        >
          {props.title}
        </h1>
        <div style={{marginLeft: 8, marginTop: 8}}>
        {props.children}
        </div>
      </div>
    </>
  );
}
