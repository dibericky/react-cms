import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin } from 'antd';

import PanelContent from './PanelContent';
import EditableItemOverview from './EditableItemOverview';

export default function DetailItemContent({
  data, config, editCollectionItemById, isLoading,
}) {
  return (
    <PanelContent>
      <div style={{ height: '100%', overflow: 'auto' }}>
        {
          !isLoading
            ? (
              <EditableItemOverview
                data={data}
                config={config}
                editCollectionItemById={editCollectionItemById}
              />
            )
            : (
              <Center>
                <Spin />
              </Center>
            )
        }

      </div>
    </PanelContent>
  );
}

DetailItemContent.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({}),
  config: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    enum: PropTypes.arrayOf(PropTypes.string),
  })),
  editCollectionItemById: PropTypes.func.isRequired,
};

DetailItemContent.defaultProps = {
  isLoading: false,
  data: {},
  config: [],
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
