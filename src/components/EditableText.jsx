/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

export default function EditableText({ text, onChange, ...props }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(text);
  }, [text]);
  return (
    <Typography.Text
      editable={{
        editing: isEditing,
        onStart: () => setIsEditing(true),
        onChange: (newValue) => {
          setIsEditing(false);
          setValue(newValue);
          onChange(newValue);
        },
      }}
      {...props}
    >
      {value}
    </Typography.Text>
  );
}

EditableText.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
};
EditableText.defaultProps = {
  text: '',
  onChange: () => {},
};
