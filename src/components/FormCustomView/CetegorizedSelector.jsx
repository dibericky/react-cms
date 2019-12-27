import React, { useState, useEffect } from 'react';
import { Checkbox, Select } from 'antd';
import get from 'lodash.get';
import PropTypes from 'prop-types';

export default function CategorizedSelector({ categorizedBy, collectionConfig, onChange }) {
  const [collectionField, setCollectionField] = useState();
  const [isCategorized, setIsCategorized] = useState(!!categorizedBy);
  const [enumColumns, setEnumColumns] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    console.log('BEFORE ', collectionField, 'SET ', categorizedBy);
    setCollectionField(categorizedBy);
    const columnSelected = collectionConfig.find((col) => col.name === categorizedBy);
    setCategories(columnSelected ? get(columnSelected, 'enum', []) : []);
  }, [categorizedBy, collectionConfig]);

  useEffect(() => {
    const withEnums = collectionConfig.filter((config) => config.type === 'enum');
    setEnumColumns(withEnums);
  }, [collectionConfig]);

  useEffect(() => {
    const enumColumnsName = enumColumns.map((m) => m.name);

    if (collectionField && !enumColumnsName.includes(collectionField)) {
      onChange(undefined);
    }
  }, [enumColumns, collectionField, onChange]);

  if (enumColumns.length === 0) {
    return null;
  }
  return (
    <div style={{ display: 'grid', gridGap: 5, gridTemplateRows: 'min-content 1fr min-content' }}>
      <div>
        <Checkbox
          checked={isCategorized}
          onChange={(e) => {
            const { checked } = e.target;
            if (!checked) {
              setCollectionField(undefined);
              onChange(undefined);
            }
            setIsCategorized(checked);
          }}
        >
        Organize data in categories
        </Checkbox>
      </div>
      <Select
        disabled={!isCategorized}
        value={collectionField}
        placeholder="Select enum column to use for categories"
        onChange={(value) => {
          setCollectionField(value);
          onChange(value);
        }}
      >
        {enumColumns
          .map((config) => (
            <Select.Option key={config.name} value={config.name}>
              {config.name}
            </Select.Option>
          ))}
      </Select>
      <div>
        {
              collectionField
                ? `Categories: ${categories.join(', ')}`
                : null
          }
      </div>
    </div>
  );
}
CategorizedSelector.propTypes = {
  collectionConfig: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    enum: PropTypes.arrayOf(PropTypes.string),
  })),
  categorizedBy: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
CategorizedSelector.defaultProps = {
  collectionConfig: [],
  categorizedBy: undefined,
};
