import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;

function Sider({ menuItems, onCategoryClick }) {
  return (
    <Layout.Sider
      width={200}
      style={{
        background: '#fff',
        maxHeight: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        onClick={(item) => onCategoryClick(item.key)}
      >
        {
          menuItems.map((menuItem) => {
            if (menuItem.children) {
              return (
                <SubMenu
                  key={menuItem.id}
                  title={(
                    <span>
                      <Icon type="user" />
                      {menuItem.name}
                    </span>
            )}
                >
                  {
            menuItem.children.map((child) => (
              <Menu.Item key={child.id}>{child.name}</Menu.Item>
            ))
          }
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={menuItem.id}>{menuItem.name}</Menu.Item>
            );
          })
        }
      </Menu>
    </Layout.Sider>
  );
}


const menuProps = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape()),
    }),
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  ]),
);
Sider.defaultProps = {
  menuItems: [],
};
Sider.propTypes = {
  menuItems: menuProps,
};


export default Sider;
