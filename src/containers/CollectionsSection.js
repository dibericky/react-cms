/* eslint-disable max-len */
import { connect } from 'react-redux';
import { join } from 'path';

import {
  getCollections, getConfigs, editCollectionItemById, getCustomCategories,
} from '../actions';
import CollectionsSectionComponent from '../components/CollectionsSection';

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    getCollections: () => getCollections(dispatch),
    getConfigs: () => getConfigs(dispatch),
    getCustomCategories: () => getCustomCategories(dispatch),
    editCollectionItemById: (name, id, newValue) => editCollectionItemById(dispatch)(name, id, newValue),
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectionsSectionComponent);
