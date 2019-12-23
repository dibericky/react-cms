import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import PanelContent from './PanelContent';

export default function DetailItemContent({ data }) {
  return (
    <PanelContent>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Descriptions layout="horizontal" bordered column={1}>
          {
          Object.keys(data)
            .map((key) => (
              <Descriptions.Item label={key} key={key}>{data[key]}</Descriptions.Item>
            ))
          }
        </Descriptions>
      </div>
    </PanelContent>
  );
}

DetailItemContent.propTypes = {
  data: PropTypes.shape({}),
};

DetailItemContent.defaultProps = {
  data: {},
};
