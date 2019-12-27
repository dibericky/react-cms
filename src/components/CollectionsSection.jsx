/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import Sider from '../containers/Sider';
import Content from '../containers/Content';
import AddCustomViewModal from './AddCustomViewModal';

export default function CollectionsSection({
  createCustomView,
  getCustomViews,
  getCollections,
  fullPath,
  basePath,
  navigateToCollection,
  getConfigs,
  editCollectionItemById,
  collectionsConfig,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    getConfigs();
    getCustomViews();
  }, [getCollections, getConfigs, getCustomViews]);

  useEffect(() => {
    if (collectionsConfig && Object.keys(collectionsConfig).length > 0) {
      getCollections(collectionsConfig);
    }
  }, [getCollections, collectionsConfig]);

  return (
    <Layout>
      <Sider
        onItemViewClick={navigateToCollection}
        onEditViewClick={navigateToCollection}
        onClickAdd={(id) => {
          if (id !== 'custom') {
            return;
          }
          setIsModalVisible(true);
        }}
      />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {
            fullPath.split('/').map((part) => (
              <Breadcrumb.Item key={part}>{part}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
        <Content basePath={basePath} editCollectionItemById={editCollectionItemById} />
      </Layout>
      <AddCustomViewModal
        isVisible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={(values) => {
          createCustomView(values, () => {
            getCustomViews();
            setIsModalVisible(false);
          });
        }}
        collectionsConfig={collectionsConfig}
      />
    </Layout>
  );
}

CollectionsSection.propTypes = {
  createCustomView: PropTypes.func.isRequired,
  editCollectionItemById: PropTypes.func.isRequired,
  getCustomViews: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  fullPath: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  navigateToCollection: PropTypes.func.isRequired,
  collectionsConfig: PropTypes.object.isRequired,
};
