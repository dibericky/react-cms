import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DefaultCollectionItemsView from './DefaultCollectionItemsView';
import CustomViewer from '../containers/CustomViewer';

export default function ListContent({
  name,
  data,
  config,
  editCollectionItemById,
  createCollectionItem,
  getCollections,
  isCustom,
  navigateToItem,
  category,
  navigateToCategory,
  primaryKeyName,
}) {
  const [configTable, setConfigTable] = useState(config);

  useEffect(() => {
    const configColumns = config.map((column) => ({
      ...column,
      action: column.primaryKey ? navigateToItem : null,
    }));
    setConfigTable(configColumns);
  }, [config, navigateToItem]);

  return (
    !isCustom
      ? (
        <DefaultCollectionItemsView
          createCollectionItem={(values, onSuccess) => createCollectionItem(values, () => {
            getCollections();
            onSuccess();
          })}
          isLoading={!primaryKeyName || !data}
          data={data}
          primaryKeyName={primaryKeyName}
          config={configTable}
          onValueChange={(id, newValue) => editCollectionItemById(name, id, newValue)}
        />
      )
      : (
        <CustomViewer name={name} category={category} onCategoryClick={navigateToCategory} />
      )

  );
}

ListContent.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  editCollectionItemById: PropTypes.func.isRequired,
  isCustom: PropTypes.bool,
  navigateToItem: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  navigateToCategory: PropTypes.func.isRequired,
  category: PropTypes.string,
  primaryKeyName: PropTypes.string,
  createCollectionItem: PropTypes.func.isRequired,
};

ListContent.defaultProps = {
  name: null,
  data: [],
  config: [],
  isCustom: false,
  category: undefined,
  primaryKeyName: undefined,
};
