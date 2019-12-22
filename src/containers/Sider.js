import { connect } from 'react-redux';

import SiderComponent from '../components/Sider';

function mapStateToProps(state) {
  const { categories } = state;
  const fromDefault = categories.default.map((menuItem) => ({
    id: `default/${menuItem}`,
    name: menuItem,
  }));
  const fromCustom = Object.keys(categories.custom).map((key) => ({
    id: `custom/${key}`,
    name: categories.custom[key].name,
  }));
  return {
    menuItems: fromDefault.concat(fromCustom),
  };
}
function mapDispatchToProps() {
  return {};
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SiderComponent);
