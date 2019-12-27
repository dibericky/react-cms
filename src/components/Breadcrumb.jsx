import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';

export default function ({ fullPath, onItemClick, style }) {
  const [fullPathArray, setFullPathArray] = useState([]);

  useEffect(() => {
    setFullPathArray(fullPath.split('/'));
  }, [fullPath]);
  return (
    <Breadcrumb style={style}>
      {
            fullPathArray.map((part, index) => (
              <Breadcrumb.Item
                key={part}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const pathToNavigate = fullPathArray.slice(0, index + 1).join('/');
                  onItemClick(pathToNavigate);
                }}
              >
                {part}
              </Breadcrumb.Item>
            ))
          }
    </Breadcrumb>
  );
}
