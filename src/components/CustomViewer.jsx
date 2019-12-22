import React from 'react';
import PropTypes from 'prop-types';

import Gallery from './Gallery/index';

export default function CustomViewer({ data, type, onItemChange }) {
  if (type === 'gallery') {
    return <Gallery items={data} onImageChange={onItemChange} />;
  }
  return <div>{JSON.stringify(data)}</div>;
}

CustomViewer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
  })),
  type: PropTypes.oneOf(['gallery', 'none']),
  onItemChange: PropTypes.func.isRequired,
};
CustomViewer.defaultProps = {
  data: [],
  type: 'none',
};
