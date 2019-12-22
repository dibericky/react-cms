import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Modal as AntdModal, Empty as AntdEmpty, Tabs, Descriptions,
} from 'antd';

import EditableText from '../EditableText';

const { TabPane } = Tabs;

export default function Modal({
  onCancel, onChange, isVisible, image, metadata,
}) {
  return (
    <AntdModal
      visible={isVisible}
      footer={(
        <EditableText
          text={image}
          ellipsis
          copyable
          onChange={onChange}
        />
          )}
      onCancel={onCancel}
    >
      <Tabs type="card">
        <TabPane tab="Preview" key="previewKey">
          {
            image
              ? <img alt="example" style={{ width: '100%' }} src={image} />
              : <Empty />
            }
        </TabPane>
        {
            metadata && Object.keys(metadata).length > 0
              ? (
                <TabPane tab="Metadata" key="metadataKey">
                  <Descriptions layout="horizontal" bordered column={1}>
                    {
                Object.keys(metadata)
                  .map((key) => (
                    <Descriptions.Item label={key} key={key}>{metadata[key]}</Descriptions.Item>
                  ))
            }
                  </Descriptions>
                </TabPane>
              )
              : null
        }

      </Tabs>
    </AntdModal>
  );
}

Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  image: PropTypes.string,
  metadata: PropTypes.shape({}),
};

Modal.defaultProps = {
  metadata: null,
  image: '',
  isVisible: false,
};

const Empty = styled(AntdEmpty)`
    cursor: pointer;
`;
