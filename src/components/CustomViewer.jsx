import React from 'react';
import PropTypes from 'prop-types';

import CategoryMenu from './CategoryMenu';
import Gallery from './Gallery/index';
import PanelContent from './PanelContent';

function getViewerByType(type, data, onItemChange) {
  if (type === 'gallery') {
    return <Gallery items={data} onImageChange={onItemChange} />;
  }
  return <div>{JSON.stringify(data)}</div>;
}

export default function CustomViewer({
  data, type, onItemChange, categories, onCategoryClick,
}) {
  return (
    <>
      <CategoryMenu categories={categories} onCategoryClick={onCategoryClick} />
      <PanelContent>
        {getViewerByType(type, data, onItemChange)}
      </PanelContent>
    </>
  );
}

CustomViewer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
  })),
  type: PropTypes.oneOf(['gallery', 'none']),
  onItemChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  onCategoryClick: PropTypes.func.isRequired,
};
CustomViewer.defaultProps = {
  data: [],
  type: 'none',
  categories: [],
};
