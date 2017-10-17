import React from "react";
import PropTypes from "prop-types";

function getImageSize(src) {
  const image = new Image();
  image.src = src;
  return {
    height: image.height,
    width: image.width,
  };
}

class Magnifier extends React.Component {
  render() {
    const props = this.props;
    const halfSize = props.size / 2;
    const imageSize = props.zoomImage
      ? props.zoomImage
      : getImageSize(props.src);
    const magX = imageSize.width / props.smallImage.width;
    const magY = imageSize.height / props.smallImage.height;
    const bgX = -(props.offsetX * magX - halfSize);
    const bgY = -(props.offsetY * magY - halfSize);
    const isVisible =
      props.offsetY < props.smallImage.height &&
      props.offsetX < props.smallImage.width &&
      props.offsetY > 0 &&
      props.offsetX > 0;
    return (
      <div
        style={{
          position: "absolute",
          display: isVisible ? "block" : "none",
          top: props.y,
          left: props.x,
          width: props.size,
          height: props.size,
          marginLeft: -halfSize + props.cursorOffset.x,
          marginTop: -halfSize + props.cursorOffset.y,
          backgroundColor: "white",
          borderRadius: props.size,
          boxShadow: "1px 1px 6px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: props.size,
            height: props.size,
            backgroundImage: `url(${props.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${bgX}px ${bgY}px`,
            borderRadius: props.size,
          }}
        />
      </div>
    );
  }
}

Magnifier.propTypes = {
  size: PropTypes.number.isRequired, // size of the magnifier window
  x: PropTypes.number.isRequired, // x position on screen
  y: PropTypes.number.isRequired, // y position on screen
  offsetX: PropTypes.number.isRequired, // x position relative to the image
  offsetY: PropTypes.number.isRequired, // y position relative to the image
  cursorOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired, // offset of the zoom bubble from the cursor
  src: PropTypes.string.isRequired, // URL of the image
  smallImage: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired, // size of the non-zoomed-in image
  zoomImage: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }), // size of the zoomed-in image
};

export default Magnifier;
