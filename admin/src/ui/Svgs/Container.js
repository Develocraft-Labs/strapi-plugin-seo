import React from "react";

const Container = ({
  height,
  width,
  children,
  className,
  viewBox,
  fill,
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    className={className}
    viewBox={viewBox}
    fill={fill}
    style={style}
  >
    {children}
  </svg>
);

export default Container;
