import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import Sider from '../containers/Sider';
import Content from '../containers/Content';

export default function CollectionsSection({
  getCustomCategories,
  getCollections,
  fullPath,
  basePath,
  navigateToCollection,
  getConfigs,
  editCollectionItemById,
}) {
  useEffect(() => {
    getConfigs();
    getCollections();
    getCustomCategories();
  }, [getCollections, getConfigs, getCustomCategories]);

  return (
    <Layout>
      <Sider onCategoryClick={navigateToCollection} />
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
    </Layout>
  );
}

CollectionsSection.propTypes = {
  editCollectionItemById: PropTypes.func.isRequired,
  getCustomCategories: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired,
  getCollections: PropTypes.func.isRequired,
  fullPath: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  navigateToCollection: PropTypes.func.isRequired,
};
