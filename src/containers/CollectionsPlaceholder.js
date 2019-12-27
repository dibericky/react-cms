/* eslint-disable max-len */
import { connect } from 'react-redux';
import { join } from 'path';

import CollectionsPlaceholder from '../components/CollectionsPlaceholder';

function mapStateToProps(state) {
  return {
    default: state.views.default.map((item) => ({ name: item, key: item })),
    custom: Object.values(state.views.custom)
      .map((item) => ({ name: item.name, key: item.id })),
    views: state.views,
  };
}
function mapDispatchToProps() {
  return {
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const historyPush = ownProps.history.push;
  const baseUrl = ownProps.match.url;
  const { type } = ownProps.match.params;

  const items = type
    ? stateProps[type]
    : Object.keys(stateProps.views).map((item) => ({ name: item, key: item }));

  return {
    ...stateProps,
    items,
    basePath: ownProps.match.url,
    navigateTo: (target) => historyPush(join(baseUrl, target)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CollectionsPlaceholder);
