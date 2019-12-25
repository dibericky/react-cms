/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import { connect } from 'react-redux';
import get from 'lodash.get';

import { editCollectionItemById } from '../actions';
import DetailItemComponent from '../components/DetaiItemContent';

function mapStateToProps(state) {
  const { collections, configs } = state;
  return {
    collections,
    configs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editById: editCollectionItemById(dispatch),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { editById } = dispatchProps;
  const { content: collectionName, id } = ownProps.match.params;
  const data = get(stateProps.collections, [collectionName, id]);
  const collectionConfig = get(stateProps.configs, collectionName);

  return {
    editCollectionItemById: (newValues) => editById(collectionName, data.id, newValues),
    data,
    config: collectionConfig,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailItemComponent);
