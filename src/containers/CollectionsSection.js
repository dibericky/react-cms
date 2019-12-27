/* eslint-disable max-len */
import { connect } from 'react-redux';
import { join } from 'path';

import {
  getCollections, editCollectionItemById,
  getConfigs,
  getCustomViews, createCustomView,
} from '../actions';
import CollectionsSectionComponent from '../components/CollectionsSection';

function mapStateToProps(state) {
  return {
    collectionsConfig: state.configs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCollections: (configs) => getCollections(dispatch)(configs),
    getConfigs: () => getConfigs(dispatch),
    getCustomViews: () => getCustomViews(dispatch),
    editCollectionItemById: (name, id, newValue) => editCollectionItemById(dispatch)(name, id, newValue),
    createCustomView: (values, onSuccess) => createCustomView(dispatch)(values, onSuccess),
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const historyPush = ownProps.history.push;
  const collectionsUrl = ownProps.match.url;
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    fullPath: ownProps.location.pathname,
    basePath: ownProps.match.url,
    navigateToCollection: (collectionName) => historyPush(join(collectionsUrl, collectionName)),
    navigateTo: historyPush,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectionsSectionComponent);
