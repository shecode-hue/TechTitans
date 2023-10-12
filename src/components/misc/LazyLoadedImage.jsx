import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const LazyLoadedImage = ({
  imageSrc,
  alt,
  width = "100vw",
  height = "80vh",
}) => (
  <LazyLoadImage
    alt={alt}
    effect="blur"
    src={imageSrc}
    style={{ width: width, height: height, objectFit: "cover" }}
  />
);
