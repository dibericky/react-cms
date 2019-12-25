import { connect } from 'react-redux';

import ContentSettings from '../components/ContentSettings';

function mapStateToProps(state) {
  const { configs, views } = state;
  return {
    configs,
    views,
  };
}
function mapDispatchToProps() {
  return {};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { match: { params } } = ownProps;
  const { type, content } = params;
  const { views } = stateProps;
  if (type !== 'custom') {
    return ownProps;
  }
  const currentView = views.custom[content];
  return {
    type,
    content,
    view: currentView,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ContentSettings);
