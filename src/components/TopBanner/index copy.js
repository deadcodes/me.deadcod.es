import { useRef, useLayoutEffect, useEffect, useState } from "react";
import WebFont from "webfontloader";
import "./styles.module.css";

export default function TopBanner(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Encode Sans", "Lato", "Epilogue"],
      },
    });
  }, []);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  const maxRadius = 80;
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
      <div ref={ref} className="shadow--tl" style={stylesObj}>
        <div class="col">
          <div
            class="row"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <img
              src={require("@site/static/img/logo-min.png").default}
              className="topBannerLogo"
            />
            <h1
              style={{
                fontSize: 84,
                fontFamily: "Monton",
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
            class="row"
            style={{
              fontSize: 24,
              fontFamily: "Monton",
              fontWeight: 100,
              letterSpacing: 4,
              marginLeft: -14,
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
