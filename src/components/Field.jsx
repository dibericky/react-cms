/* eslint-disable no-fallthrough */
import React from 'react';
import { Typography } from 'antd';

import EditableImage from './EditableImage';
import EditableText from './EditableText';
import EditableEnum from './EditableEnum';

export default function Field({ value, configColumn, onValueChange }) {
  const currentValue = value || configColumn.default;
  const isEditable = configColumn.editable;
  switch (configColumn.type) {
    case 'image': {
      if (configColumn.editable) {
        return (
          <EditableImage
            url={currentValue}
            onChange={(newValue) => onValueChange(newValue, configColumn.name)}
          />
        );
      }
      return <img src={currentValue} alt={currentValue} height={50} />;
    }
    case 'enum': {
      return (
        <EditableEnum
          disabled={!isEditable}
          enumValues={configColumn.enum}
          text={currentValue}
          onChange={(newValue) => onValueChange(newValue, configColumn.name)}
        />
      );
    }
    case 'string': {
      if (isEditable) {
        return (
          <EditableText
            text={currentValue}
            onChange={(newValue) => onValueChange(newValue, configColumn.name)}
          />
        );
      }
      return <Typography.Text>{currentValue}</Typography.Text>;
    }
    default: {
      return undefined;
    }
  }
}
