import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const ALL_KEY = '__all';

export default function CategoryMenu({ categories, onCategoryClick, category }) {
  if (categories.length === 0) {
    return null;
  }
  return (
    <Menu
      selectedKeys={[category || ALL_KEY]}
      mode="horizontal"
      style={{ marginBottom: 10 }}
      onClick={({ key }) => onCategoryClick(key !== ALL_KEY ? key : undefined)}
    >
      <Menu.Item key={ALL_KEY}>All</Menu.Item>
      {categories.map((categ) => (
        <Menu.Item
          key={categ}
        >
          {categ}
        </Menu.Item>
      ))}
    </Menu>
  );
}
CategoryMenu.propTypes = {
  category: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  onCategoryClick: PropTypes.func.isRequired,
};
CategoryMenu.defaultProps = {
  category: undefined,
  categories: [],
};
