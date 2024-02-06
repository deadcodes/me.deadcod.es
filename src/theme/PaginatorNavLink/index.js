import React from "react";
import clsx from "clsx";
import { useRef, useLayoutEffect, useState } from "react";
import Link from "@docusaurus/Link";
export default function PaginatorNavLink(props) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);

  const maxRadius = 80;
  const radiusToSet = height > maxRadius ? maxRadius : height * 0.5;

  const stylesObj = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    color: "#1a8870",
    backgroundColor: "#201b23",
    padding: 12,
    height: "auto",
    // borderRadius: "var(--ifm-global-radius)",
    marginBottom: 24,
  };

  const left = {
    borderTopLeftRadius: radiusToSet,
    borderBottomLeftRadius: radiusToSet,
    paddingLeft: 8,
    ...stylesObj,
  };
  const right = {
    borderTopRightRadius: radiusToSet,
    borderBottomRightRadius: radiusToSet,
    paddingRight: 8,
    alignContent: "flex-end",
    ...stylesObj,
  };

  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      ref={ref}
      style={isNext ? right : left}
      className={clsx("shadow--tl")}
      to={permalink}
    >
      {subLabel && (
        <div
          style={
            isNext
              ? { alignSelf: "flex-end", paddingRight: 8 }
              : { paddingLeft: 8 }
          }
          className="pagination-nav__sublabel"
        >
          {subLabel}
        </div>
      )}
      <div
        style={
          isNext
            ? { alignSelf: "flex-end", paddingRight: 8 }
            : { paddingLeft: 8 }
        }
        className="pagination-nav__label"
      >
        {title}
      </div>
    </Link>
  );
}
