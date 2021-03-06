/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

export default function EditableEnum({
  text, onChange, enumValues, disabled,
}) {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(text);
  }, [text]);

  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(newValue) => {
        setValue(newValue);
        onChange(newValue);
      }}
    >
      {
        enumValues.map((enumValue) => (
          <Select.Option
            key={enumValue}
            value={enumValue}
          >
            {enumValue}
          </Select.Option>
        ))
      }
    </Select>
  );
}

EditableEnum.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  enumValues: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  disabled: PropTypes.bool,
};
EditableEnum.defaultProps = {
  text: undefined,
  onChange: () => {},
  enumValues: [],
  disabled: false,
};
