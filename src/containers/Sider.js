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
    menuItemsFromCustom: fromCustom,
    menuItemsFromDefault: fromDefault,
  };
}
function mapDispatchToProps() {
  return {};
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { menuItemsFromCustom, menuItemsFromDefault } = stateProps;
  return {
    ...dispatchProps,
    ...ownProps,
    defaultOpenKeys: ['default', 'custom'],
    menuItems: [{
      id: 'default',
      name: 'Collections',
      children: menuItemsFromDefault,
    }, {
      id: 'custom',
      name: 'Custom',
      children: menuItemsFromCustom,
      addButton: true,
    }],
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SiderComponent);
