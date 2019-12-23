/* eslint-disable max-len */
import { connect } from 'react-redux';
import get from 'lodash.get';
import { join } from 'path';
import { generatePath } from 'react-router';

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
function getNewCategoryUrl(path, params, newCategory) {
  return generatePath(path, {
    ...params,
    category: newCategory,
  });
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { params } = ownProps.match;
  const currentContentName = params.content;
  const currentCategory = params.category;
  const historyPush = ownProps.history.push;
  const currentPath = ownProps.match.path;

  const isCustom = params.type === 'custom';
  let data;
  let config;

  if (!isCustom) {
    data = Object.values(get(stateProps.collections, currentContentName, []));
    config = get(stateProps.configs, currentContentName, []);
  }

  return {
    ...dispatchProps,
    ...ownProps,
    navigateToItem: (id) => historyPush(join(ownProps.match.url, id)),
    name: currentContentName,
    data,
    config,
    isCustom,
    category: currentCategory,
    navigateToCategory: (category) => historyPush(getNewCategoryUrl(currentPath, params, category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListContent);
