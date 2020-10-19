import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ResponsiveImage = ({ src, thumbSrc, visible, className }) => {
  const [imageSrc, setImageSrc] = useState(thumbSrc);

  React.useEffect(() => {
    let mounted = true;
    if (visible) {
      const fullSizeImage = new Image();
      fullSizeImage.src = src;
      fullSizeImage.onload = () => {
        if (mounted) {
          setImageSrc(src);
        }
      };
    }
    return () => {
      mounted = false;
    };
  }, [visible, src]);

  return (
    <div
      style={{ backgroundImage: `url(${imageSrc})` }}
      className={className} />
  );
};

ResponsiveImage.defaultProps = {
  visible: true
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  thumbSrc: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  className: PropTypes.string.isRequired
};

export default React.memo(ResponsiveImage);
