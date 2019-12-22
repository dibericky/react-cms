import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import TableViewContent from './TableViewContent';
import CustomViewer from '../containers/CustomViewer';

export default function Content({
  name, data, config, editCollectionItemById, isCustom, navigateToItem,
}) {
  const [configTable, setConfigTable] = useState(config);

  useEffect(() => {
    const configColumns = config.map((column) => ({
      name: column.name,
      type: column.primaryKey ? 'action' : column.type,
      editable: !column.primaryKey,
      action: column.primaryKey ? navigateToItem : null,
    }));
    setConfigTable(configColumns);
  }, [config]);

  return (
    !isCustom
      ? (
        <TableViewContent
          data={data}
          config={configTable}
          onValueChange={(id, newValue) => editCollectionItemById(name, id, newValue)}
          navigateToItem={navigateToItem}
        />
      )
      : (
        <CustomViewer name={name} />
      )

  );
}

Content.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
  editCollectionItemById: PropTypes.func.isRequired,
  isCustom: PropTypes.bool,
  navigateToItem: PropTypes.func.isRequired,
};

Content.defaultProps = {
  name: null,
  data: [],
  config: [],
  isCustom: false,
};
