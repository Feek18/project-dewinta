import React from "react";

const Image = ({ src, alt, c }) => {
  return (
    <img
      src={src}
      alt={alt || "Image"}
      className={c}
    />
  );
};

export default Image;
