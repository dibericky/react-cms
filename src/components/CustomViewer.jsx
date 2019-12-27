import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import CategoryMenu from './CategoryMenu';
import Gallery from './Gallery/index';
import PanelContent from './PanelContent';

function getViewerByType(type, data, onItemChange, config) {
  if (type === 'gallery') {
    return (
      <Gallery
        items={data}
        onDataChange={onItemChange}
        collectionConfig={config}
      />
    );
  }
  return <div>{JSON.stringify(data)}</div>;
}

export default function CustomViewer({
  data, type, onItemChange, categories, onCategoryClick, config, isLoading,
}) {
  return (
    <>
      <CategoryMenu categories={categories} onCategoryClick={onCategoryClick} />
      <PanelContent>
        {
          !isLoading
            ? getViewerByType(type, data, onItemChange, config)
            : <Spin />
        }
      </PanelContent>
    </>
  );
}

CustomViewer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    primaryKey: PropTypes.string.isRequired,
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
  isLoading: PropTypes.bool,
  config: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    enum: PropTypes.arrayOf(PropTypes.string),
  })),
};
CustomViewer.defaultProps = {
  isLoading: false,
  data: [],
  type: 'none',
  categories: [],
  config: [],
};
