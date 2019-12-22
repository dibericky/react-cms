import React, { useState, useEffect } from 'react';
import { Typography, Icon } from 'antd';
import PropTypes from 'prop-types';

export default function EditableImage({ url, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(url);
  }, [url]);

  if (!isEditing) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr min-content',
        gridGap: 10,
        alignItems: 'center',
      }}
      >
        <img
          src={value}
          alt={value}
          height={50}
        />
        <Icon
          type="edit"
          theme="twoTone"
          onClick={() => setIsEditing(true)}
        />
      </div>
    );
  }
  return (
    <Typography.Text
      editable={{
        editing: true,
        onStart: () => setIsEditing(true),
        onChange: (newValue) => {
          setIsEditing(false);
          setValue(newValue);
          onChange(newValue);
        },
      }}
    >
      {value}
    </Typography.Text>
  );
}

EditableImage.propTypes = {
  url: PropTypes.string,
  onChange: PropTypes.func,
};
EditableImage.defaultProps = {
  url: '',
  onChange: () => {},
};
