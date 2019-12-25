import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Modal as AntdModal, Empty as AntdEmpty, Tabs, Descriptions,
} from 'antd';

import EditableText from '../EditableText';
import DetailItemContent from '../DetaiItemContent';

const { TabPane } = Tabs;

export default function Modal({
  onCancel, onChange, isVisible, image, metadata, collectionConfig,
}) {
  const metadataKeys = Object.keys(metadata);
  const configOfMetadataColumn = collectionConfig
    .filter((conf) => metadataKeys.includes(conf.name));
  return (
    <AntdModal
      visible={isVisible}
      footer={(
        <EditableText
          text={image}
          ellipsis
          copyable
          onChange={(text) => onChange({ image: text })}
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
            Object.keys(metadata).length > 0
              ? (
                <TabPane tab="Metadata" key="metadataKey">
                  <DetailItemContent
                    data={metadata}
                    editCollectionItemById={onChange}
                    config={configOfMetadataColumn}
                  />
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
  collectionConfig: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    enum: PropTypes.arrayOf(PropTypes.string),
  })),
};

Modal.defaultProps = {
  metadata: {},
  image: '',
  isVisible: false,
  collectionConfig: [],
};

const Empty = styled(AntdEmpty)`
    cursor: pointer;
`;
