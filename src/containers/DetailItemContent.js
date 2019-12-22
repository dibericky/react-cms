/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */

import { connect } from 'react-redux';
import get from 'lodash.get';

import { editCollectionItemById } from '../actions';
import DetailItemComponent from '../components/DetaiItemContent';

function mapStateToProps(state) {
  const { collections } = state;
  return {
    collections,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editCollectionItemById: (name, id, newValue) => editCollectionItemById(dispatch)(name, id, newValue),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { content, id } = ownProps.match.params;
  const data = get(stateProps.collections, [content, id]);

  return {
    ...dispatchProps,
    data,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailItemComponent);
