import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PanelContent from './PanelContent';
import EditableItemOverview from './EditableItemOverview';

export default function DetailItemContent({ data, config, editCollectionItemById }) {
  return (
    <PanelContent>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <EditableItemOverview
          data={data}
          config={config}
          editCollectionItemById={editCollectionItemById}
        />
      </div>
    </PanelContent>
  );
}

DetailItemContent.propTypes = {
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
  data: {},
  config: [],
};

const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: end;
`;
