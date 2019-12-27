/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import EditableItemOverview from './EditableItemOverview';

export default function AddCollectionItemModal({
 config, isVisible, onConfirm, onCancel 
}) {
  const [configForCreation, setConfigForCreation] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const withoutPrimaryKey = config.filter((col) => !col.primaryKey);
    setConfigForCreation(withoutPrimaryKey);
  }, [config]);
  return (
    <Modal
      title="Create new item"
      visible={isVisible}
      okButtonProps={{
        loading: isLoading,
      }}
      onCancel={onCancel}
      onOk={() => {
        setIsLoading(true);
        onConfirm(data, () => {
          setIsLoading(false);
        });
      }}
    >
      <EditableItemOverview
        data={data}
        config={configForCreation}
        editCollectionItemById={(values) => {
          setData({
            ...data,
            ...values,
          });
        }}
      />
    </Modal>
  );
}

AddCollectionItemModal.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  isVisible: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
AddCollectionItemModal.defaultProps = {
  isVisible: false,
};
