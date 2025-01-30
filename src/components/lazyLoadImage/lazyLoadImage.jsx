import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function LazyLoadImageComp({ src, alt, className}) {
  return (
    <>
        <LazyLoadImage
          src={src}
          alt={alt}
          className={className}
          effect="opacity"
          wrapperProps={{
            style: { transitionDelay: "0.5s" },
          }}
        />
      
    </>
  );
}
