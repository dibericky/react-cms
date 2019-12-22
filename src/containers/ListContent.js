/* eslint-disable max-len */
import { connect } from 'react-redux';
import get from 'lodash.get';
import { join } from 'path';

import { editCollectionItemById } from '../actions';
import ListContent from '../components/ListContent';

function mapStateToProps(state) {
  const { collections, configs } = state;
  return {
    collections,
    configs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editCollectionItemById: (name, id, newValue) => editCollectionItemById(dispatch)(name, id, newValue),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const currentContentName = ownProps.match.params.content;
  const isCustom = ownProps.match.params.type === 'custom';
  let data;
  let config;

  if (!isCustom) {
    data = Object.values(get(stateProps.collections, currentContentName, []));
    config = get(stateProps.configs, currentContentName, []);
  }
  return {
    ...dispatchProps,
    ...ownProps,
    navigateToItem: (id) => ownProps.history.push(join(ownProps.match.url, id)),
    name: currentContentName,
    data,
    config,
    isCustom,
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListContent);
