/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';

import TableViewContent from './TableViewContent';
import PanelContent from './PanelContent';
import AddCollectionItemModal from './AddCollectionItemModal';

export default class DefaultCollectionItemsView extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    primaryKeyName: PropTypes.string,
    config: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      default: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      enum: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ])),
    })),
    createCollectionItem: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    config: [],
    data: undefined,
    isLoading: undefined,
    primaryKeyName: undefined,
  };

  state = {
    isAddCollectionItemVisible: false,
  }

  render() {
    const {
      data, primaryKeyName, isLoading, config, onValueChange, createCollectionItem,
    } = this.props;
    const { isAddCollectionItemVisible } = this.state;
    return (
      <PanelContent>
        <TableButtonWrap>
          <div>
            <Button
              type="primary"
              icon="plus"
              size="small"
              onClick={() => this.setState({ isAddCollectionItemVisible: true })}
            >
Create new item
            </Button>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <TableViewContent
              data={data}
              primaryKeyName={primaryKeyName}
              isLoading={isLoading}
              config={config}
              onValueChange={onValueChange}
            />
          </div>
        </TableButtonWrap>
        <AddCollectionItemModal
          onCancel={() => this.setState({ isAddCollectionItemVisible: false })}
          isVisible={isAddCollectionItemVisible}
          config={config}
          onConfirm={(values, onSuccess) => createCollectionItem(values, () => {
            onSuccess();
            this.setState({
              isAddCollectionItemVisible: false,
            });
          })}
        />
      </PanelContent>
    );
  }
}

const TableButtonWrap = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: min-content 1fr;
  grid-gap: 10px;
`;
