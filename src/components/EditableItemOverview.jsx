import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import styled from 'styled-components';

import Field from './Field';

export default function EditableItemOverview({ data, config, editCollectionItemById }) {
  return (
    <Descriptions layout="horizontal" bordered column={1}>
      {
          config
            .map((column) => (
              <Descriptions.Item
                label={column.name}
                key={column.name}
              >
                <FieldWrapper>
                  <Field
                    value={data[column.name]}
                    configColumn={column}
                    onValueChange={(value, name) => editCollectionItemById({ [name]: value })}
                  />
                </FieldWrapper>
              </Descriptions.Item>
            ))
          }
    </Descriptions>
  );
}

EditableItemOverview.propTypes = {
  data: PropTypes.shape({}),
  config: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    enum: PropTypes.arrayOf(PropTypes.string),
  })),
  editCollectionItemById: PropTypes.func.isRequired,
};

EditableItemOverview.defaultProps = {
  data: {},
  config: [],
};

const FieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: end;
`;
