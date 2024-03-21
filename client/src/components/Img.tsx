import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className, alt, onclick = false }) => {
  return src === "none" ? (
    ""
  ) : (
    <LazyLoadImage
      className={className || ""}
      alt={alt || ""}
      effect="blur"
      src={src}
      onClick={onclick}
    />
  );
};

export default Img;
