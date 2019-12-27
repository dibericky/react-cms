import { connect } from 'react-redux';

import { editCustomView as editCustomViewAction, getCustomViews as getCustomViewsAction } from '../actions';
import ContentSettings from '../components/ContentSettings';

function mapStateToProps(state) {
  const { configs, views } = state;
  return {
    configs,
    views,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCustomViews: () => getCustomViewsAction(dispatch),
    editCustomView: editCustomViewAction(dispatch),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { match: { params } } = ownProps;
  const { type, content } = params;
  const { editCustomView, getCustomViews } = dispatchProps;
  const { views, configs } = stateProps;
  if (type !== 'custom') {
    return ownProps;
  }
  const id = type === 'custom' ? content : '';
  const currentView = views.custom[content];
  return {
    type,
    content,
    view: currentView,
    configs,
    editCustomView: (values, onSuccess) => editCustomView(id, values, () => {
      getCustomViews();
      onSuccess();
    }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ContentSettings);
