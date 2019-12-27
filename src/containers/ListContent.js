/* eslint-disable max-len */
import { connect } from 'react-redux';
import get from 'lodash.get';
import { join } from 'path';
import { generatePath } from 'react-router';

import { editCollectionItemById, createCollectionItem, getCollections } from '../actions';
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
    createCollectionItem: createCollectionItem(dispatch),
    getCollections: getCollections(dispatch),
  };
}
function getNewCategoryUrl(path, params, newCategory) {
  const pathArray = path.split('/');
  if (!pathArray.find((item) => item === 'category')) {
    pathArray.push('category');
    pathArray.push(':category');
  }
  return generatePath(pathArray.join('/'), {
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

  let primaryKeyName;
  if (!isCustom) {
    config = get(stateProps.configs, currentContentName, []);
    if (config.length > 0) {
      primaryKeyName = (config.find((column) => column.primaryKey) || config[0]).name;
      data = Object.values(get(stateProps.collections, currentContentName, []));
    }
  }

  return {
    ...dispatchProps,
    ...ownProps,
    getCollections: () => dispatchProps.getCollections(stateProps.configs),
    navigateToItem: (id) => historyPush(join(ownProps.match.url, id)),
    name: currentContentName,
    data,
    config,
    primaryKeyName,
    isCustom,
    category: currentCategory,
    createCollectionItem: (values, onSuccess) => dispatchProps.createCollectionItem(currentContentName, values, onSuccess),
    navigateToCategory: (category) => historyPush(getNewCategoryUrl(currentPath, params, category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListContent);
