import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import styled from 'styled-components';

export default function CollectionsPlaceholder({ items, navigateTo }) {
  return (
    <Container>
      {
              items.map((item) => (
                <Card
                  key={item.key}
                  cover={
                    item.image ? (
                      <img
                        alt="example"
                        src={item.image}
                      />
                    ) : null
                    }
                  actions={[
                    <Icon
                      type="arrow-right"
                      key="setting"
                      onClick={() => navigateTo(item.key)}
                    />,
                  ]}
                >
                  <Card.Meta
                    title={item.name}
                  />
                </Card>
              ))
          }
    </Container>
  );
}

CollectionsPlaceholder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  })),
  navigateTo: PropTypes.func.isRequired,
};
CollectionsPlaceholder.defaultProps = {
  items: [],
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: center;
    justify-content: center;
    grid-gap: 20px;
`;
